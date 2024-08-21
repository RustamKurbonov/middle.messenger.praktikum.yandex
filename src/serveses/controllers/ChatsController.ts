import api, { CreateChatFields, GetChatFields } from 'src/api/chatsAPI';
import store from '../store/Store';
import { resourcesApiPath } from 'src/api/constants';
import { UserFields } from 'src/api/userApi';

export interface LastMessage {
  user: {
    first_name: string;
    second_name: string;
    avatar: string;
    email: string;
    login: string;
    phone: string;
  };
  time: string;
  content: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message?: LastMessage;
}

class ChatsController {
  public createChat(
    data: CreateChatFields & { idUserAdded: string },
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .createChat({ title: data.title })
      .then((response) => {
        try {
          const responseObj: { id?: string } = JSON.parse(response);

          if (responseObj?.id) {
            this.getChats({});
            this.addUsersChat(data.idUserAdded, responseObj.id);
            onOk && onOk();
          }
        } catch (error) {
          onError && onError(error);
        }
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public getChats(data: GetChatFields, onOk?: () => void, onError?: (error: Error) => void): void {
    api
      .getChats(data)
      .then((response) => {
        try {
          const data: Chat[] = JSON.parse(response);

          if (data) {
            store.set(
              'chats',
              data.map((chat) => ({
                ...chat,
                avatar: chat.avatar
                  ? encodeURI(`${resourcesApiPath}/${chat.avatar}`)
                  : '../../assets/icons/Ellipse.svg',
                last_message: chat.last_message || { content: '', time: '', user: '' },
              }))
            );
            onOk && onOk();
          }
        } catch (error) {
          onError && onError(error);
        }
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public addUsersChat(userId: string, chatId: string, onOk?: () => void): void {
    api.addUsersChat(userId, chatId).then(() => {
      onOk && onOk();
      this.getChatUsers(chatId);
    });
  }

  public deleteUsersChat(userId: string, chatId: string, onOk?: () => void): void {
    api.deleteUsersChat(userId, chatId).then(() => {
      onOk && onOk();
      this.getChatUsers(chatId);
    });
  }

  public getChatUsers(chatId: string, onOk?: () => void): void {
    api.getChatUsers(chatId).then((response) => {
      try {
        const data: UserFields[] = JSON.parse(response);

        if (data) {
          store.set('chatUsers', data);
          onOk && onOk();
        }
      } catch (error) {}
    });
  }

  public getChatTocken(
    chatId: string,
    title: string,
    avatar: string
  ): Promise<{ userId: string; chatId: string; token: string } | undefined> {
    return api
      .getChatTocken(chatId)
      .then((response): { userId: string; chatId: string; token: string } | undefined => {
        try {
          const data: { token?: string } = JSON.parse(response);
          const userId = store.getState()?.user?.id || '';

          if (data?.token) {
            store.set('activeChat', { token: data.token, id: chatId, title, avatar });

            if (userId && chatId) {
              this.getChatUsers(chatId);
              return { userId, chatId, token: data.token };
            }
          }
          return;
        } catch (error) {
          return;
        }
      });
  }
}

const chatsController = new ChatsController();

export default chatsController;
