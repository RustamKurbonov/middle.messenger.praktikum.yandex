import HTTPTransport from 'src/serveses/api/HTTPTransport';
import { baseApiPath } from './constants';

const authPath = '/auth';
const chatAPIInstance = new HTTPTransport(baseApiPath + authPath);

export interface RegistrationFields {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
}

export interface SigninFields {
  login: string;
  password: string;
}

const isSuccess = (data: XMLHttpRequest): boolean =>
  data.readyState === XMLHttpRequest.DONE && data.status === 200;

class UserAPI {
  async createUser(fields: RegistrationFields): Promise<string> {
    const data = await chatAPIInstance.post('/signup', {
      data: { ...fields },
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async getUserInfo(): Promise<string> {
    const data = await chatAPIInstance.get('/user', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async signin(fields: SigninFields): Promise<string> {
    const data = await chatAPIInstance.post('/signin', {
      data: { ...fields },
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }

  async logout(): Promise<string> {
    const data = await chatAPIInstance.post('/logout', {
      headers: { 'Content-Type': 'application/json' },
    });

    if (isSuccess(data)) {
      return data.responseText;
    }
    throw new Error(`${data.responseText}`);
  }
}

const userAPI = new UserAPI();

export default userAPI;
