import styles from './messageItem.module.scss';
import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component.ts';

interface MessageItemProps extends ComponentProps {
  propsAndChildren: {
    type: 'incoming' | 'outgoing';
    text: string;
    time: string;
  };
}

class MessageItem extends Component {
  constructor(props: MessageItemProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles.messageItem,
        },
      },
    });
  }

  render() {
    return this.compile(tpl, {
      ...this._props,
    });
  }
}

export default MessageItem;
