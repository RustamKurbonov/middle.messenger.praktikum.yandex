import styles from './chatItem.module.scss';
import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component';

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

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this._props,
    });
  }
}

export default ChatItem;
