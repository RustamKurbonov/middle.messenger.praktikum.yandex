import HTTPTransport from 'src/serveses/api/HTTPTransport';
import { baseApiPath } from './constants';
import { isSuccess } from 'src/share/utils';

export interface ChangeProfileFields {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface ChangePasswordFields {
  oldPassword: string;
  newPassword: string;
}

export type ChangeAvatarFields = FormData;

const authPath = '/user';
const chatAPIInstance = new HTTPTransport(baseApiPath + authPath);

class UserApi {
  async changeProfile(props: ChangeProfileFields): Promise<string> {
    const data = await chatAPIInstance.put('/profile', {
      data: { ...props },
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async changePassword(props: ChangePasswordFields): Promise<string> {
    const data = await chatAPIInstance.put('/password', {
      data: { ...props },
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async changeAvatar(props: ChangeAvatarFields): Promise<string> {
    const data = await chatAPIInstance.put('/profile/avatar', {
      data: props,
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }
}

const userApi = new UserApi();

export default userApi;
