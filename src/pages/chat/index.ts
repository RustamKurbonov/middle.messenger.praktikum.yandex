import router from 'src/serveses/router/Router';
import Button from '../../components/Button';
import ChatItem from '../../components/ChatItem';
import Search from '../../components/Search';
import { Component } from '../../share/classes/Component';
import { getFieldValue, Indexed, validator } from '../../share/utils';
import styles from './chat.module.scss';
import tpl from './tpl';
import { Paths } from 'src/share/constants/routes';
import Input from 'src/components/Input';
import chatsController, { Chat as ChatType } from 'src/serveses/controllers/ChatsController';
import { connect } from 'src/serveses/store/connect';
import Message from 'src/components/Message';
import messageSocket, { Message as MessageType } from 'src/serveses/socket/messageSocket';
import MessageItem from 'src/components/MessageItem';
import moment from 'moment';
import { MouseEvent } from '../../share/types/index';

const handleAddChat = (): void => {
  const title = (document.querySelector('#chatName') as HTMLInputElement)?.value;
  const idUserAdded = (document.querySelector('#idUserAdded') as HTMLInputElement)?.value;

  if (title.trim() && idUserAdded.trim()) {
    chatsController.createChat({ title, idUserAdded });
  }
};

class ButtonSubmit extends Component {
  constructor() {
    super({
      tagName: 'button',
      propsAndChildren: {
        attr: {
          class: styles['button-submit'],
        },
        events: {
          click: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            e.preventDefault();
            const message = getFieldValue('#message');
            const field = document.querySelector('#message') as HTMLInputElement;

            if (validator(message, 'message', 'message')) {
              messageSocket.sendMessage(message);
              chatsController.getChats({});
              field.value = '';
            }
          },
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('', {
      ...this._props,
    });
  }
}

class MessageField extends Component {
  constructor() {
    super({
      tagName: 'input',
      propsAndChildren: {
        attr: {
          placeholder: 'Введите сообщение',
          name: 'message',
          id: 'message',
          class: styles['message-field'],
        },
        events: {
          blur: (e: FocusEvent) => {
            const { value } = <HTMLInputElement>e.target;
            e.target && validator(value, 'message', 'message');
          },
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('', {
      ...this._props,
    });
  }
}

class Chat extends Component {
  constructor() {
    super({
      propsAndChildren: {
        search: new Search({
          tagName: 'input',
          propsAndChildren: { attr: { placeholder: 'Поиск' } },
        }),
        profileButton: new Button({
          tagName: 'button',
          propsAndChildren: {
            label: 'Профиль',
            events: {
              click(e) {
                e.preventDefault();
                router.go(Paths.Profile);
              },
            },
          },
        }),
        chats: [],
        buttonSubmit: new ButtonSubmit(),
        chatName: new Input({
          tagName: 'input',
          propsAndChildren: {
            attr: {
              id: 'chatName',
              name: 'chatName',
              type: 'text',
              placeholder: 'Введите название чата',
            },
          },
        }),
        idUserAdded: new Input({
          tagName: 'input',
          propsAndChildren: {
            attr: {
              id: 'idUserAdded',
              name: 'idUserAdded',
              type: 'text',
              placeholder: 'Id добавляемого пользователя',
            },
          },
        }),
        addChat: new Button({
          tagName: 'button',
          propsAndChildren: {
            label: '+ Создать чат',
            events: {
              click(e) {
                e.preventDefault();
                handleAddChat();
              },
            },
          },
        }),
        messageField: new MessageField(),
        attr: {
          class: styles.chat,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this._props,
    });
  }
}

const mapChatToProps = (state: Indexed): Indexed => {
  const chats = state?.chats || [];
  const userId = state?.user?.id;
  const messages: MessageType[] = state?.messages || [];

  return {
    messages:
      state.activeChat &&
      new Message({
        ...state.activeChat,
        messages: messages
          .reverse()
          .map(({ content, time, user_id }) => {
            return new MessageItem({
              tagName: 'div',
              propsAndChildren: {
                text: content,
                type: userId === user_id ? 'outgoing' : 'incoming',
                time: moment(time).format('DD.MM.YYYY HH:mm:ss'),
              },
            });
          })
          .reverse(),
      }),
    chats: chats.map(({ avatar, created_by, id, last_message, title, unread_count }: ChatType) => {
      console.log(last_message, 'last_message');

      return new ChatItem({
        tagName: 'button',
        propsAndChildren: {
          id: id.toString(),
          icon: avatar,
          name: title,
          date: created_by.toString(),
          count: unread_count,
          lastMessage: last_message,
          events: {
            click(e) {
              e.preventDefault();
              messageSocket.closeWebSocket();
              const data = chatsController.getChatUsers(id.toString(), title, avatar);

              data.then((response) => {
                if (response) {
                  messageSocket.createWebSocket(response.userId, response.chatId, response.token);
                }
              });
            },
          },
        },
      });
    }),
  };
};

const chatClass = connect(Chat, mapChatToProps);

const chat = new chatClass({});

export default chat;
