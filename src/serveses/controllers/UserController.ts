import api, { SigninFields, RegistrationFields } from 'src/api/userAPI';
import store from '../store/Store';

class UserController {
  public createUser(
    data: RegistrationFields,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .createUser(data)
      .then(() => {
        api
          .getUserInfo()
          .then((response) => {
            store.set('user', response);
            onOk && onOk();
          })
          .catch((error) => {
            onError && onError(error);
          });
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public signin(data: SigninFields, onOk?: () => void, onError?: (error: Error) => void): void {
    api
      .signin(data)
      .then(() => {
        api
          .getUserInfo()
          .then((response) => {
            store.set('user', JSON.parse(response));
            onOk && onOk();
          })
          .catch((error) => {
            onError && onError(error);
          });
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public logout(onOk?: () => void): void {
    api.logout().then(() => {
      onOk && onOk();
    });
  }
}

const userController = new UserController();

export default userController;
