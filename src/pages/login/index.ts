import Button from '../../components/Button';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import { validator } from '../../share/utils/validator';

export default () => {
  return new Form({
    tagName: 'main',
    propsAndChildren: {
      title: 'Авторизация',
      id: 'authorization',
      fields: [
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
                events: {
                  blur: (e) => {
                    const value = (<HTMLInputElement>e.target).value;
                    e.target && validator(value, e.target as Element, 'login');
                  },
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
                events: {
                  blur: (e) => {
                    const value = (<HTMLInputElement>e.target).value;
                    validator(value, e.target as Element, 'password');
                  },
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
            label: 'Войти',
            type: 'primary',
            events: {
              click: () => {
                const login = document.querySelector('#login');
                const password = document.querySelector('#password');
                const form = document.querySelector('#authorization');
                const loginValue = (login as HTMLInputElement).value;
                const passwordValue = (password as HTMLInputElement).value;

                const isLoginValid = validator(loginValue, login, 'login');
                const isPasswordValid = validator(
                  passwordValue,
                  password,
                  'password',
                );

                if (isLoginValid && isPasswordValid) {
                  console.log({
                    login: loginValue,
                    password: password,
                  });
                } else {
                  form?.classList.add('error');
                }
              },
            },
          },
        }),
        new Button({
          tagName: 'a',
          propsAndChildren: {
            label: 'Зарегистрироваться',
          },
        }),
      ],
      attr: {
        class: 'asdadasds',
      },
    },
  });
};
