import { Component } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './editingProfile.module.scss';
import Button from '../../components/Button';
import ProfileSidebar from '../../components/ProfileSidebar';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';

class EditingProfile extends Component {
  constructor() {
    super({
      tagName: 'main',
      propsAndChildren: {
        username: 'Иван',
        buttons: [
          new Button({
            tagName: 'a',
            propsAndChildren: {
              label: 'Сохранить',
              type: 'primary',
              events: {
                click: () => {
                  const firstName = (
                    document.querySelector('#first_name') as HTMLInputElement
                  )?.value;
                  const secondName = (
                    document.querySelector('#second_name') as HTMLInputElement
                  )?.value;
                  const displayName = (
                    document.querySelector('#display_name') as HTMLInputElement
                  )?.value;
                  const login = (
                    document.querySelector('#login') as HTMLInputElement
                  )?.value;
                  const email = (
                    document.querySelector('#email') as HTMLInputElement
                  )?.value;
                  const phone = (
                    document.querySelector('#phone') as HTMLInputElement
                  )?.value;
                  const oldPassword = (
                    document.querySelector('#oldPassword') as HTMLInputElement
                  )?.value;
                  const newPassword = (
                    document.querySelector('#newPassword') as HTMLInputElement
                  )?.value;

                  console.log({
                    firstName,
                    secondName,
                    displayName,
                    login,
                    email,
                    phone,
                    oldPassword,
                    newPassword,
                  });
                },
              },
            },
          }),
          new Button({
            tagName: 'a',
            propsAndChildren: {
              label: 'Отмена',
            },
          }),
        ],
        profileFields: [
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Имя',
              id: 'first_name',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'first_name',
                    name: 'first_name',
                    type: 'text',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Фамилия',
              id: 'second_name',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'second_name',
                    name: 'second_name',
                    type: 'text',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Никнейм',
              id: 'display_name',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'display_name',
                    name: 'display_name',
                    type: 'text',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Логин',
              id: 'login',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'login',
                    name: 'login',
                    type: 'text',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Почта',
              id: 'email',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'email',
                    name: 'email',
                    type: 'email',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Телефон',
              id: 'phone',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'phone',
                    name: 'phone',
                    type: 'text',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Старый пароль',
              id: 'oldPassword',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'oldPassword',
                    name: 'oldPassword',
                    type: 'password',
                  },
                },
              }),
            },
          }),
          new FormItem({
            tagName: 'div',
            propsAndChildren: {
              label: 'Новый пароль',
              id: 'newPassword',
              input: new Input({
                tagName: 'input',
                propsAndChildren: {
                  attr: {
                    id: 'newPassword',
                    name: 'newPassword',
                    type: 'password',
                  },
                },
              }),
            },
          }),
        ],
        profileSidebar: new ProfileSidebar({
          propsAndChildren: { attr: { href: './chat' } },
        }),
        attr: {
          class: styles.editingProfile,
        },
      },
    });
  }

  render() {
    return this.compile(tpl, this._props);
  }
}

export default () => {
  return new EditingProfile();
};
