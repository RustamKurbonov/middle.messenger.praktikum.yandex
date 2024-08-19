import HTTPTransport from 'src/serveses/api/HTTPTransport';
import { baseApiPath } from './constants';
import { isSuccess } from 'src/share/utils';

export interface CreateChatFields {
  title: string;
}

export interface GetChatFields {
  title?: string;
}

const chatsPath = '/chats';
const chatAPIInstance = new HTTPTransport(baseApiPath);

class ChatsApi {
  async getChats(props: GetChatFields): Promise<string> {
    const data = await chatAPIInstance.get(chatsPath, {
      data: { ...props },
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async createChat(props: CreateChatFields): Promise<string> {
    const data = await chatAPIInstance.post(chatsPath, {
      data: { title: props.title },
      headers: { 'Content-Type': 'application/json' },
    });
    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async getChatUsers(id: string): Promise<string> {
    const data = await chatAPIInstance.post(`${chatsPath}/token/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async addChatUsers(userId: string, chatId: string): Promise<string> {
    const data = await chatAPIInstance.put(`${chatsPath}/users`, {
      data: {
        users: [Number(userId)],
        chatId: Number(chatId),
      },
      headers: { 'Content-Type': 'application/json' },
    });
    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }
}

const chatsApi = new ChatsApi();

export default chatsApi;
