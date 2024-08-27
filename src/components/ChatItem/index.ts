import styles from './chatItem.module.scss';
import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component';
import { LastMessage } from 'src/serveses/controllers/ChatsController';
import { MouseEvent } from '../../share/types/index';

interface ChatItemProps extends ComponentProps {
  propsAndChildren: {
    id: string;
    icon: string;
    name: string;
    date: string;
    count: number;
    lastMessage?: {
      user: LastMessage['user'];
      time: LastMessage['time'];
      content: LastMessage['content'];
    };
    events?: {
      click: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    };
  };
}

class ChatItem extends Component {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        text: props.propsAndChildren.lastMessage?.content || 'Начните общение',
        attr: {
          class: styles['chat-item'],
          id: props.propsAndChildren.id,
        },
        events: {
          ...props.propsAndChildren.events,
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
