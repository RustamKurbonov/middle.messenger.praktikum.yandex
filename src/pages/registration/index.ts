import Button from '../../components/Button';
import Form from '../../components/Form';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import { validator, getFieldValue } from '../../share/utils';
import { Paths } from 'src/share/constants/routes';
import router from 'src/serveses/router/Router';
import authController from 'src/serveses/controllers/AuthController';

const handleRegister = (): void => {
  const first_name = getFieldValue('#first_name');
  const second_name = getFieldValue('#second_name');
  const login = getFieldValue('#login');
  const email = getFieldValue('#email');
  const phone = getFieldValue('#phone');
  const password = getFieldValue('#password');

  const validFields = [
    validator(first_name, 'name', 'first_name'),
    validator(second_name, 'name', 'second_name'),
    validator(login, 'login', 'login'),
    validator(email, 'email', 'email'),
    validator(phone, 'phone', 'phone'),
    validator(password, 'password', 'password'),
  ];

  if (!validFields.includes(false)) {
    authController.createUser(
      {
        first_name,
        second_name,
        login,
        email,
        phone,
        password,
      },
      () => {
        registrationForm.setProps({ errorText: undefined });
        router.go(Paths.Chat);
      },
      (error) => {
        registrationForm.setProps({ errorText: error.toString() });
      }
    );
  } else {
    registrationForm.setProps({ errorText: 'Ошибка валидации' });
  }
};

class RegistrationForm extends Form {
  constructor() {
    super({
      tagName: 'main',
      propsAndChildren: {
        title: 'Регистрация',
        id: 'registration',
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
                  events: {
                    blur: (e) => {
                      const { value } = <HTMLInputElement>e.target;
                      e.target && validator(value, 'name', 'first_name');
                    },
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
                  events: {
                    blur: (e) => {
                      const { value } = <HTMLInputElement>e.target;
                      e.target && validator(value, 'name', 'second_name');
                    },
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
                  events: {
                    blur: (e) => {
                      const { value } = <HTMLInputElement>e.target;
                      e.target && validator(value, 'email', 'email');
                    },
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
                  events: {
                    blur: (e) => {
                      const { value } = <HTMLInputElement>e.target;
                      e.target && validator(value, 'phone', 'phone');
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
              label: 'Зарегистрироваться',
              type: 'primary',
              events: {
                click: (e) => {
                  e.preventDefault();
                  handleRegister();
                },
              },
            },
          }),
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Войти',
              events: {
                click(e) {
                  e.preventDefault();
                  router.go(Paths.Login);
                },
              },
            },
          }),
        ],
      },
    });
  }
}

const registrationForm = new RegistrationForm();

export default registrationForm;
