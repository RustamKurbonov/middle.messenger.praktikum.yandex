import styles from './userItem.module.scss';
import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component';
import Button from '../Button';
import chatsController from 'src/serveses/controllers/ChatsController';

interface UserItemProps extends ComponentProps {
  propsAndChildren?: {
    id: string;
    chatId: string;
    role?: string;
  };
}

class UserItem extends Component {
  constructor(props: UserItemProps) {
    console.log(props, 'props');

    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        deleteButton:
          props?.propsAndChildren?.role !== 'admin'
            ? new Button({
                tagName: 'button',
                propsAndChildren: {
                  label: 'Удалить из чата',
                  type: 'warning',
                  events: {
                    click(e) {
                      e.preventDefault();
                      const userId = props.propsAndChildren?.id;
                      const chatId = props.propsAndChildren?.chatId;

                      if (userId && chatId) {
                        chatsController.deleteUsersChat(userId, chatId);
                      }
                    },
                  },
                },
              })
            : '<p>Администратор</p>',
        attr: {
          class: styles['user-item'],
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

export default UserItem;
