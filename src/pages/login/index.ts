import router from 'src/serveses/router/Router';
import Button from '../../components/Button';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import { getFieldValue, validator } from '../../share/utils';
import { Paths } from 'src/share/constants/routes';
import authController from 'src/serveses/controllers/AuthController';

const handleLogin = (): void => {
  const login = getFieldValue('#login');
  const password = getFieldValue('#password');

  const validFields = [
    validator(login, 'login', 'login'),
    validator(password, 'password', 'password'),
  ];

  if (!validFields.includes(false)) {
    authController.signin(
      { login, password },
      () => {
        loginForm.setProps({ errorText: undefined });
        router.go(Paths.Chat);
      },
      (error) => {
        loginForm.setProps({ errorText: error.toString() });
      }
    );
  } else {
    loginForm.setProps({ errorText: 'Ошибка валидации' });
  }
};

class LoginForm extends Form {
  constructor() {
    super({
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
                      const { value } = <HTMLInputElement>e.target;
                      e.target && validator(value, 'login', 'login');
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
                      const { value } = <HTMLInputElement>e.target;
                      validator(value, 'password', 'password');
                    },
                  },
                },
              }),
            },
          }),
        ],
        buttons: [
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Войти',
              type: 'primary',
              events: {
                click: (e) => {
                  e.preventDefault();
                  handleLogin();
                },
              },
            },
          }),
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Зарегистрироваться',
              events: {
                click(e) {
                  e.preventDefault();
                  router.go(Paths.Registration);
                },
              },
            },
          }),
        ],
        attr: {
          class: 'asdadasds',
        },
      },
    });
  }
}

const loginForm = new LoginForm();

export default loginForm;
