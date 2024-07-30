import Button from '../../components/Button';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';

export default () => {
  return new Form({
    tagName: 'main',
    propsAndChildren: {
      title: 'Авторизация',
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
            label: 'Войти',
            type: 'primary',
            events: {
              click: () => {
                const login = (
                  document.querySelector('#login') as HTMLInputElement
                )?.value;
                const password = (
                  document.querySelector('#password') as HTMLInputElement
                )?.value;

                console.log({ login, password });
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
    },
  });
};
