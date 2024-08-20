import { Component } from 'src/share/classes/Component';
import tpl from './tpl';
import ProfileSidebar from 'src/components/ProfileSidebar';
import router from 'src/serveses/router/Router';
import styles from './chatSetting.module.scss';
import store from 'src/serveses/store/Store';
import { connect } from 'src/serveses/store/connect';
import { getFieldValue, Indexed } from 'src/share/utils';
import FormItem from 'src/components/FormItem';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { Paths } from 'src/share/constants/routes';
import chatsController from 'src/serveses/controllers/ChatsController';
import UserItem from 'src/components/UserItem';
import { UserFields } from '../../api/userApi';

interface ChatSettingProps {
  avatar: string;
  id: string;
  title: string;
  token: string;
}

const handleUserAdd = (): void => {
  const activeChat: ChatSettingProps | undefined = store.getState()?.activeChat;
  const userId = getFieldValue('#userId');
  const field = document.querySelector('#userId') as HTMLInputElement;

  if (activeChat?.id && userId) {
    chatsController.addUsersChat(userId, activeChat.id);

    if (field) {
      field.value = '';
    }
  }
};

class ChatSetting extends Component {
  constructor() {
    const chatInfo: ChatSettingProps = store.getState()?.activeChat;

    super({
      propsAndChildren: {
        avatar: chatInfo?.avatar,
        title: chatInfo?.title,
        profileSidebar: new ProfileSidebar({
          propsAndChildren: {
            events: {
              click() {
                router.back();
              },
            },
          },
        }),
        idUserAdded: new FormItem({
          tagName: 'div',
          propsAndChildren: {
            label: 'ID нового пользователя',
            id: 'userId',
            input: new Input({
              tagName: 'input',
              propsAndChildren: {
                attr: {
                  id: 'userId',
                  name: 'userId',
                  type: 'text',
                },
              },
            }),
          },
        }),
        buttons: [
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Добавить пользователя',
              type: 'primary',
              events: {
                click(e) {
                  e.preventDefault();
                  handleUserAdd();
                },
              },
            },
          }),
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Отмена',
              events: {
                click(e) {
                  e.preventDefault();
                  router.go(Paths.Chat);
                },
              },
            },
          }),
        ],
        attr: {
          class: styles['editing-profile'],
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

const mapChatSettingToProps = (state: Indexed): Indexed => {
  const activeChat: ChatSettingProps | undefined = state?.activeChat;
  const chatUsers: UserFields[] | undefined = state?.chatUsers || [];

  return {
    avatar: activeChat?.avatar,
    title: activeChat?.title,
    users: chatUsers?.map(
      ({ id, role }) =>
        new UserItem({
          propsAndChildren: { id: id?.toString() || '', chatId: activeChat?.id || '', role },
        })
    ),
  };
};

const chatSettingClass = connect(ChatSetting, mapChatSettingToProps);

const chatSetting = new chatSettingClass({});

export default chatSetting;
