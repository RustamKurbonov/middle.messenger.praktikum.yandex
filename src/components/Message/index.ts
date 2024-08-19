import styles from './message.module.scss';
import tpl from './tpl';
import { Component } from '../../share/classes/Component';
import { Message as MessageType } from 'src/serveses/socket/messageSocket';

export interface MessageProps {
  title: string;
  messages: MessageType[];
  userId: string;
}

class Message extends Component {
  constructor(props: MessageProps) {
    super({
      propsAndChildren: {
        title: props.title,
        messages: props.messages as unknown as Component[],
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
