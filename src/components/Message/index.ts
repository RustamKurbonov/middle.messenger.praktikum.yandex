import styles from './message.module.scss';
import tpl from './tpl';
import { Component } from '../../share/classes/Component';
import { Message as MessageType } from 'src/serveses/socket/messageSocket';
import Button from '../Button';
import router from 'src/serveses/router/Router';
import { Paths } from 'src/share/constants/routes';

export interface MessageProps {
  title: string;
  messages: MessageType[];
  userId: string;
}

class Content extends Component {
  constructor(props: { messages: MessageType[] }) {
    super({
      propsAndChildren: {
        tagName: 'div',
        messages: props.messages as unknown as Component[],
        attr: {
          class: styles.content,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{{messages}}}', {
      ...this._props,
    });
  }
}

class Message extends Component {
  constructor(props: MessageProps) {
    super({
      propsAndChildren: {
        title: props.title,
        setting: new Button({
          tagName: 'button',
          propsAndChildren: {
            label: 'Настройки',
            events: {
              click(e) {
                e.preventDefault();
                router.go(Paths.ChatSetting);
              },
            },
          },
        }),
        content: new Content({ messages: props.messages }),
        attr: {
          class: styles.message,
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

export default Message;
