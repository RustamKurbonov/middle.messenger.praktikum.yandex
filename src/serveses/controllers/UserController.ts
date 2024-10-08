import api, { UserFields, ChangePasswordFields, ChangeAvatarFields } from 'src/api/userApi';
import store from '../store/Store';
import { resourcesApiPath } from 'src/api/constants';

class UserController {
  public changeProfile(
    data: UserFields,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .changeProfile(data)
      .then((response: string) => {
        try {
          const data = JSON.parse(response);
          store.set('user', data);
          onOk && onOk();
        } catch (error) {
          onError && onError(error);
        }
      })
      .catch((error: Error) => {
        onError && onError(error);
      });
  }

  public changePassword(
    data: ChangePasswordFields,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .changePassword(data)
      .then(() => {
        onOk && onOk();
      })
      .catch((error: Error) => {
        onError && onError(error);
      });
  }

  public changeAvatar(
    data: ChangeAvatarFields,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .changeAvatar(data)
      .then((response: string) => {
        try {
          const data = JSON.parse(response);

          const user = {
            ...data,
            avatar: data.avatar
              ? encodeURI(`${resourcesApiPath}${data.avatar}`)
              : '../../assets/icons/Ellipse.svg',
          };

          store.set('user', user);
          onOk && onOk();
        } catch (error) {
          onError && onError(error);
        }
      })
      .catch((error: Error) => {
        onError && onError(error);
      });
  }
}

const userController = new UserController();

export default userController;
