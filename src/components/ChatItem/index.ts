import styles from './chatItem.module.scss';
import tpl from './tpl.ts';
import { Component, ComponentProps } from '../../share/classes/Component.ts';

interface ChatItemProps extends ComponentProps {
  propsAndChildren: {
    icon: string;
    name: string;
    text: string;
    date: string;
    count: string;
  };
}

class ChatItem extends Component {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles.chatItem,
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

export default ChatItem;
