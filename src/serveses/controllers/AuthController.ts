import api, { SigninFields, RegistrationFields } from 'src/api/authAPI';
import store from '../store/Store';
import { deleteCookie, setCookie } from 'src/share/utils';
import { resourcesApiPath } from 'src/api/constants';
import chatsController from './ChatsController';

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
      deleteCookie('user');
    });
  }

  public getUserInfo(onOk?: () => void, onError?: (error: Error) => void): void {
    api
      .getUserInfo()
      .then((response) => {
        const data = JSON.parse(response);

        if (data.id) {
          setCookie('user', data.id);
          store.set('user', {
            ...data,
            avatar: data.avatar
              ? encodeURI(`${resourcesApiPath}/${data.avatar}`)
              : '../../assets/icons/Ellipse.svg',
          });

          chatsController.getChats({});
        }

        onOk && onOk();
      })
      .catch((error) => {
        onError && onError(error);
      });
  }
}

const authController = new AuthController();

export default authController;
