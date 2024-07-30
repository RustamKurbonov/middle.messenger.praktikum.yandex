import Button from '../../components/Button';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';

export default () => {
  return new Form({
    tagName: 'main',
    propsAndChildren: {
      title: 'Регистрация',
      fields: [
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
                  type: 'phone',
                },
              },
            }),
          },
        }),
        new FormItem({
          tagName: 'div',
          propsAndChildren: {
            label: 'Пароль',
            id: 'password',
            input: new Input({
              tagName: 'input',
              propsAndChildren: {
                attr: {
                  id: 'password',
                  name: 'password',
                  type: 'password',
                },
              },
            }),
          },
        }),
      ],
      buttons: [
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Зарегистрироваться',
            type: 'primary',
            events: {
              click: () => {
                const firstName = (
                  document.querySelector('#first_name') as HTMLInputElement
                ).value;
                const secondName = (
                  document.querySelector('#second_name') as HTMLInputElement
                ).value;
                const login = (
                  document.querySelector('#login') as HTMLInputElement
                ).value;
                const email = (
                  document.querySelector('#email') as HTMLInputElement
                ).value;
                const phone = (
                  document.querySelector('#phone') as HTMLInputElement
                ).value;
                const password = (
                  document.querySelector('#password') as HTMLInputElement
                ).value;

                console.log({
                  firstName,
                  secondName,
                  login,
                  email,
                  phone,
                  password,
                });
              },
            },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Войти',
          },
        }),
      ],
    },
  });
};
