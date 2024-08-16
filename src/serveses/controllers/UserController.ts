import api, { ChangeProfileProps, ChangePasswordProps } from 'src/api/userApi';
import store from '../store/Store';

class UserController {
  public changeProfile(
    data: ChangeProfileProps,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .changeProfile(data)
      .then((response) => {
        const data = JSON.parse(response);
        store.set('user', data);
        onOk && onOk();
      })
      .catch((error) => {
        onError && onError(error);
      });
  }

  public changePassword(
    data: ChangePasswordProps,
    onOk?: () => void,
    onError?: (error: Error) => void
  ): void {
    api
      .changePassword(data)
      .then(() => {
        onOk && onOk();
      })
      .catch((error) => {
        onError && onError(error);
      });
  }
}

const userController = new UserController();

export default userController;
