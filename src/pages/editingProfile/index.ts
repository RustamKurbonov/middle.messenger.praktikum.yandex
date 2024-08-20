import { Component, ComponentProps } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './editingProfile.module.scss';
import Button from '../../components/Button';
import ProfileSidebar from '../../components/ProfileSidebar';
import FormItem from '../../components/FormItem';
import Input from '../../components/Input';
import { getFieldValue, Indexed, validator } from '../../share/utils';
import { Paths } from 'src/share/constants/routes';
import router from 'src/serveses/router/Router';
import { connect } from 'src/serveses/store/connect';
import userController from 'src/serveses/controllers/UserController';
import { ChangePasswordFields, UserFields, ChangeAvatarFields } from 'src/api/userApi';
import InputImage from 'src/components/InputImage';

interface EditingProfileFormProps extends ComponentProps {
  propsAndChildren: {
    formItems: Component[];
  };
}

const inputFirstName = connect(Input, (state) => mapDataToProps(state, 'first_name'));
const inputSecondName = connect(Input, (state) => mapDataToProps(state, 'second_name'));
const inputDisplayName = connect(Input, (state) => mapDataToProps(state, 'display_name'));
const inputLogin = connect(Input, (state) => mapDataToProps(state, 'login'));
const inputEmail = connect(Input, (state) => mapDataToProps(state, 'email'));
const inputPhone = connect(Input, (state) => mapDataToProps(state, 'phone'));

const handleProfileChange = (): void => {
  const first_name = getFieldValue('#first_name');
  const second_name = getFieldValue('#second_name');
  const display_name = getFieldValue('#display_name');
  const login = getFieldValue('#login');
  const email = getFieldValue('#email');
  const phone = getFieldValue('#phone');

  const validFields = [
    validator(first_name, 'name', 'first_name'),
    validator(second_name, 'name', 'second_name'),
    validator(display_name, 'name', 'display_name'),
    validator(login, 'login', 'login'),
    validator(email, 'email', 'email'),
    validator(phone, 'phone', 'phone'),
  ];

  if (!validFields.includes(false)) {
    const profileData: UserFields = {
      display_name,
      email,
      first_name,
      login,
      phone,
      second_name,
    };

    userController.changeProfile(
      profileData,
      () => {
        router.go(Paths.Chat);
      },
      (error) => {
        editingProfile.setProps({ errorText: error.toString() });
      }
    );
  } else {
    editingProfile.setProps({ errorText: 'Ошибка валидации' });
  }
};

const handlePasswordChange = (): void => {
  const oldPassword = getFieldValue('#oldPassword');
  const newPassword = getFieldValue('#newPassword');

  const validFields = [
    validator(oldPassword, 'password', 'oldPassword'),
    validator(newPassword, 'password', 'newPassword'),
  ];

  if (!validFields.includes(false)) {
    const password: ChangePasswordFields = {
      oldPassword,
      newPassword,
    };

    userController.changePassword(
      password,
      () => {
        router.go(Paths.Chat);
      },
      (error) => {
        editingProfile.setProps({ errorText: error.toString() });
      }
    );
  } else {
    editingProfile.setProps({ errorText: 'Ошибка валидации' });
  }
};

const handleIconChange = (): void => {
  const fileInput = document.querySelector('#add-img');

  if (fileInput) {
    const file = (fileInput as HTMLInputElement)?.files?.[0];

    if (file) {
      const formData: ChangeAvatarFields = new FormData();
      formData.append('avatar', file);

      userController.changeAvatar(
        formData,
        () => {
          router.go(Paths.Chat);
        },
        (error) => {
          editingProfile.setProps({ errorText: error.toString() });
        }
      );
    }
  }
};

class EditingProfileForm extends Component {
  constructor(props: EditingProfileFormProps) {
    super({
      ...props,
      tagName: 'form',
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles['editing-profile-form'],
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{{formItems}}}', this._props);
  }
}

class EditingProfile extends Component {
  constructor() {
    super({
      tagName: 'main',
      propsAndChildren: {
        buttons: [
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Обновить данные',
              type: 'primary',
              events: {
                click(e) {
                  e.preventDefault();
                  handleProfileChange();
                },
              },
            },
          }),
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Обновить пароль',
              events: {
                click(e) {
                  e.preventDefault();
                  handlePasswordChange();
                },
              },
            },
          }),
          new Button({
            tagName: 'button',
            propsAndChildren: {
              label: 'Отмена',
              events: {
                click(e) {
                  e.preventDefault();
                  router.go(Paths.Chat);
                },
              },
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
                  input: new inputFirstName({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'first_name',
                        name: 'first_name',
                        type: 'text',
                      },
                      events: {
                        blur: (e: Event) => {
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
                  input: new inputSecondName({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'second_name',
                        name: 'second_name',
                        type: 'text',
                      },
                      events: {
                        blur: (e: Event) => {
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
                  label: 'Никнейм',
                  id: 'display_name',
                  input: new inputDisplayName({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'display_name',
                        name: 'display_name',
                        type: 'text',
                      },
                      events: {
                        blur: (e: Event) => {
                          const { value } = <HTMLInputElement>e.target;
                          e.target && validator(value, 'displayName', 'display_name');
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
                  input: new inputLogin({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'login',
                        name: 'login',
                        type: 'text',
                      },
                      events: {
                        blur: (e: Event) => {
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
                  input: new inputEmail({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'email',
                        name: 'email',
                        type: 'email',
                      },
                      events: {
                        blur: (e: Event) => {
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
                  input: new inputPhone({
                    tagName: 'input',
                    propsAndChildren: {
                      attr: {
                        id: 'phone',
                        name: 'phone',
                        type: 'text',
                      },
                      events: {
                        blur: (e: Event) => {
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
                          const { value } = <HTMLInputElement>e.target;
                          validator(value, 'password', 'oldPassword');
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
                          const { value } = <HTMLInputElement>e.target;
                          validator(value, 'password', 'newPassword');
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
          propsAndChildren: {
            events: {
              click() {
                router.back();
              },
            },
          },
        }),
        iconInput: new InputImage({ id: 'formImage', name: 'avatar' }),
        imagesButton: new Button({
          tagName: 'button',
          propsAndChildren: {
            label: 'Сохранить аватар',
            events: {
              click(e) {
                e.preventDefault();
                handleIconChange();
              },
            },
          },
        }),
        attr: {
          class: styles['editing-profile'],
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

const mapEditProfileToProps = (state: Indexed): Indexed => {
  return {
    first_name: state?.user?.login || '',
    avatar: state?.user?.avatar || '../../assets/icons/Ellipse.svg',
  };
};

const mapDataToProps = (state: Indexed, fieldName: string): Indexed => {
  return {
    attr: {
      value: state?.user?.[fieldName] || '',
    },
  };
};

const editingProfileClass = connect(EditingProfile, mapEditProfileToProps);

const editingProfile = new editingProfileClass({});

export default editingProfile;
