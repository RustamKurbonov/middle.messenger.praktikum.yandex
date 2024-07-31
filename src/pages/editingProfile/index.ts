import { Component, ComponentProps } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './editingProfile.module.scss';
import Button from '../../components/Button';
import ProfileSidebar from '../../components/ProfileSidebar';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import { validator } from '../../share/utils/validator';

interface EditingProfileFormProps extends ComponentProps {
  propsAndChildren: {
    formItems: Component[];
  };
}

class EditingProfileForm extends Component {
  constructor(props: EditingProfileFormProps) {
    super({
      ...props,
      tagName: 'form',
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles.editingProfileForm,
        },
      },
    });
  }

  render() {
    return this.compile(
      '{{{formItems}}}<div class="editingProfileform_error">Ошибка валидации</div>',
      this._props,
    );
  }
}

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
                  const firstName = document.querySelector('#first_name');
                  const firstNameValue = (firstName as HTMLInputElement)?.value;
                  const secondName = document.querySelector('#second_name');
                  const secondNameValue = (secondName as HTMLInputElement)
                    ?.value;
                  const displayName = document.querySelector('#display_name');
                  const displayNameValue = (displayName as HTMLInputElement)
                    ?.value;
                  const login = document.querySelector('#login');
                  const loginValue = (login as HTMLInputElement)?.value;
                  const email = document.querySelector('#email');
                  const emailValue = (email as HTMLInputElement)?.value;
                  const phone = document.querySelector('#phone');
                  const phoneValue = (phone as HTMLInputElement)?.value;
                  const oldPassword = document.querySelector('#oldPassword');
                  const oldPasswordValue = (oldPassword as HTMLInputElement)
                    ?.value;
                  const newPassword = document.querySelector('#newPassword');
                  const newPasswordValue = (newPassword as HTMLInputElement)
                    ?.value;
                  const form = document.querySelector('#editingProfile');

                  const isFirstNameValid = validator(
                    firstNameValue,
                    firstName,
                    'name',
                  );
                  const isSecondNameValid = validator(
                    secondNameValue,
                    secondName,
                    'name',
                  );
                  const isDisplayNameValid = validator(
                    displayNameValue,
                    displayName,
                    'displayName',
                  );
                  const isLoginValid = validator(loginValue, login, 'login');
                  const isEmailValid = validator(emailValue, email, 'email');
                  const isPhoneValid = validator(phoneValue, phone, 'phone');
                  const isOldPasswordValid = validator(
                    oldPasswordValue,
                    oldPassword,
                    'password',
                  );
                  const isNewPasswordValid = validator(
                    newPasswordValue,
                    newPassword,
                    'password',
                  );

                  if (
                    isFirstNameValid &&
                    isSecondNameValid &&
                    isDisplayNameValid &&
                    isLoginValid &&
                    isEmailValid &&
                    isPhoneValid &&
                    isOldPasswordValid &&
                    isNewPasswordValid
                  ) {
                    console.log({
                      firstName: firstNameValue,
                      secondName: secondNameValue,
                      displayName: displayNameValue,
                      login: loginValue,
                      email: emailValue,
                      phone: phoneValue,
                      oldPassword: oldPasswordValue,
                      newPassword: newPasswordValue,
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
              label: 'Отмена',
            },
          }),
        ],
        editingForm: new EditingProfileForm({
          propsAndChildren: {
            formItems: [
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
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(value, e.target as Element, 'name');
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
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(value, e.target as Element, 'name');
                        },
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
                      events: {
                        blur: (e) => {
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(
                              value,
                              e.target as Element,
                              'displayName',
                            );
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
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(value, e.target as Element, 'login');
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
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(value, e.target as Element, 'email');
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
                        type: 'text',
                      },
                      events: {
                        blur: (e) => {
                          const value = (<HTMLInputElement>e.target).value;
                          e.target &&
                            validator(value, e.target as Element, 'phone');
                        },
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
          },
        }),
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
