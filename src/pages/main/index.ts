import tpl from './tpl';
import { Component } from '../../share/classes/Component';
import styles from './main.module.scss';
import Button from '../../components/Button';

class Main extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.compile(tpl, this._props);
  }
}

export default () => {
  const main = new Main({
    tagName: 'nav',
    propsAndChildren: {
      list: [
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Авторизация',
            attr: { href: '/login' },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Регистрация',
            attr: { href: '/registration' },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: { label: 'Чат', attr: { href: '/chat' } },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: { label: 'Профиль', attr: { href: '/profile' } },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Редактирование профиля',
            attr: { href: '/editingProfile' },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Ошибка 404',
            attr: { href: '/error404' },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Ошибка 500',
            attr: { href: '/error500' },
          },
        }),
      ],
      title: 'Список страниц',
      attr: {
        class: styles.main,
      },
    },
  });
  return main;
};
