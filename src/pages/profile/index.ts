import { Component, ComponentProps } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './profile.module.scss';
import Button from '../../components/Button';
import ProfileParam from '../../components/ProfileParam';
import ProfileSidebar from '../../components/ProfileSidebar';
import { Paths } from 'src/share/constants/routes';
import router from 'src/serveses/router/Router';
import userController from 'src/serveses/controllers/UserController';
import { connect } from 'src/serveses/store/connect';
import { Indexed } from 'src/share/utils';

export interface ProfileProps {
  first_name: string;
  second_name: string;
  login: string;
  avatar: string;
  email: string;
  phone: string;
}

const firstName = connect(ProfileParam, (state) => mapDataToProps(state, 'first_name'));
const secondName = connect(ProfileParam, (state) => mapDataToProps(state, 'second_name'));
const phone = connect(ProfileParam, (state) => mapDataToProps(state, 'phone'));
const email = connect(ProfileParam, (state) => mapDataToProps(state, 'email'));

class Profile extends Component {
  constructor(props: ComponentProps) {
    super({
      tagName: 'main',
      propsAndChildren: {
        first_name: props?.propsAndChildren?.login || '',
        avatar: '',
        profileParams: [
          new firstName({
            tagName: 'li',
            propsAndChildren: {
              title: 'Имя',
              value: props?.propsAndChildren?.first_name?.toString() || '',
            },
          }),
          new secondName({
            tagName: 'li',
            propsAndChildren: {
              title: 'Фамилия',
              value: props?.propsAndChildren?.second_name?.toString() || '',
            },
          }),
          new phone({
            tagName: 'li',
            propsAndChildren: {
              title: 'Телефон',
              value: props?.propsAndChildren?.phone?.toString() || '',
            },
          }),
          new email({
            tagName: 'li',
            propsAndChildren: {
              title: 'Почта',
              value: props?.propsAndChildren?.email?.toString() || '',
            },
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
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

export const mapChatToProps = (state: Indexed): Indexed => {
  return {
    first_name: state?.user?.login || '',
    avatar: state?.user?.avatar || '',
  };
};

export const mapDataToProps = (state: Indexed, fieldName: string): Indexed => {
  return {
    value: state?.user?.[fieldName] || '',
  };
};

const profile = connect(Profile, mapChatToProps);

const test = new profile({});

export default test;
