import { Component } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './profile.module.scss';
import Button from '../../components/Button';
import ProfileParam from '../../components/ProfileParam';
import ProfileSidebar from '../../components/ProfileSidebar';
import { Paths } from 'src/share/constants/routes';
import router from 'src/serveses/router/Router';
import userController from 'src/serveses/controllers/UserController';

class Profile extends Component {
  constructor() {
    super({
      tagName: 'main',
      propsAndChildren: {
        username: 'Иван',
        buttons: [
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Изменить данные',
              events: {
                click() {
                  router.go(Paths.EditingProfile);
                },
              },
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
              events: {
                click(e) {
                  e.preventDefault();
                  userController.logout(() => router.go(Paths.Login));
                },
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
          propsAndChildren: {
            events: {
              click() {
                router.back();
              },
            },
          },
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

const profile = new Profile();
export default profile;
