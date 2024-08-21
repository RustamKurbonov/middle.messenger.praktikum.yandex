import api, { SigninFields, RegistrationFields } from 'src/api/authAPI';
import store from '../store/Store';
import { resourcesApiPath } from 'src/api/constants';
import chatsController from './ChatsController';

export interface User {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  id: number;
  login: string;
  phone: string;
  second_name: string;
}

class AuthController {
  public createUser(
    data: RegistrationFields,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .createUser(data)
      .then(() => {
        this.getUserInfo(onOk, onError);
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public signin(data: SigninFields, onOk?: () => void, onError?: (error: Error) => void): void {
    api
      .signin(data)
      .then(() => {
        this.getUserInfo(onOk, onError);
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public logout(onOk?: () => void): void {
    api.logout().then(() => {
      onOk && onOk();
      store.set('user', undefined);
    });
  }

  public getUserInfo(onOk?: (user: User) => void, onError?: (error: Error) => void): void {
    api
      .getUserInfo()
      .then((response) => {
        try {
          const data: User = JSON.parse(response);

          const user = {
            ...data,
            avatar: data.avatar
              ? encodeURI(`${resourcesApiPath}/${data.avatar}`)
              : '../../assets/icons/Ellipse.svg',
          };

          if (data.id) {
            store.set('user', user);
            chatsController.getChats({});
          }

          onOk && onOk(user);
        } catch (error) {
          onError && onError(error);
        }
      })
      .catch((error: Error) => {
        onError && onError(error);
      });
  }
}

const authController = new AuthController();

export default authController;
