import { Component } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './profile.module.scss';
import Button from '../../components/Button';
import ProfileParam from '../../components/ProfileParam';
import ProfileSidebar from '../../components/ProfileSidebar';

class Profile extends Component {
  constructor() {
    super({
      tagName: 'main',
      propsAndChildren: {
        username: 'Иван',
        buttons: [
          new Button({
            tagName: 'a',
            propsAndChildren: {
              label: 'Изменить данные',
              attr: {
                href: '../editingProfile',
              },
            },
          }),
          new Button({
            tagName: 'a',
            propsAndChildren: {
              label: 'Изменить пароль',
            },
          }),
          new Button({
            tagName: 'a',
            propsAndChildren: {
              label: 'Выйти',
              type: 'warning',
              attr: {
                href: '../login',
              },
            },
          }),
        ],
        profileParams: [
          new ProfileParam({
            tagName: 'li',
            propsAndChildren: { title: 'Логин', value: 'ivanivanov' },
          }),
          new ProfileParam({
            tagName: 'li',
            propsAndChildren: { title: 'Имя', value: 'Иван' },
          }),
          new ProfileParam({
            tagName: 'li',
            propsAndChildren: { title: 'Фамилия', value: 'Иванов' },
          }),
          new ProfileParam({
            tagName: 'li',
            propsAndChildren: { title: 'Телефон', value: '+7999999999' },
          }),
          new ProfileParam({
            tagName: 'li',
            propsAndChildren: { title: 'Почта', value: 'ivanivanov@mail.com' },
          }),
        ],
        profileSidebar: new ProfileSidebar({
          propsAndChildren: { attr: { href: './chat' } },
        }),
        attr: {
          class: styles.profile,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

const profile = (): Profile => new Profile();
export default profile;
