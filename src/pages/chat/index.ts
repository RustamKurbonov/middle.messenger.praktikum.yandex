import Button from '../../components/Button';
import ChatItem from '../../components/ChatItem';
import MessageItem from '../../components/MessageItem';
import Search from '../../components/Search';
import { Component } from '../../share/classes/Component';
import { validator } from '../../share/utils/validator';
import styles from './chat.module.scss';
import tpl from './tpl';

class ButtonSubmit extends Component {
  constructor() {
    super({
      tagName: 'button',
      propsAndChildren: {
        attr: {
          class: styles['button-submit'],
        },
        events: {
          click: () => {
            const message = document.querySelector('#message');
            const messageValue = (message as HTMLInputElement)?.value;
            const isMessageValid = validator(
              messageValue,
              message as HTMLElement,
              'message',
              'message'
            );

            if (isMessageValid) {
              console.log(message);
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
            console.log(value, 'value');

            e.target && validator(value, e.target as HTMLElement, 'message', 'message');
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
        userName: 'Иван',
        search: new Search({
          tagName: 'input',
          propsAndChildren: { attr: { placeholder: 'Поиск' } },
        }),
        profileButton: new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Профиль',
          },
        }),
        buttonSubmit: new ButtonSubmit(),
        messageField: new MessageField(),
        chatItems: [
          new ChatItem({
            tagName: 'button',
            propsAndChildren: {
              icon: '../../assets/icons/Ellipse.svg',
              name: 'Андрей',
              text: 'Друзья, у меня для вас особенный выпуск новостей! Друзья, у меня для вас особенный',
              date: '10:49',
              count: '4',
            },
          }),
        ],
        messageItems: [
          new MessageItem({
            tagName: 'div',
            propsAndChildren: {
              text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
              type: 'incoming',
              time: '11:56',
            },
          }),
          new MessageItem({
            tagName: 'div',
            propsAndChildren: {
              text: 'Круто!',
              type: 'outgoing',
              time: '12:00',
            },
          }),
        ],
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

const chat = (): Chat => new Chat();

export default chat;
