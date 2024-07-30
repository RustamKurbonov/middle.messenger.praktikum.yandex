import main from './pages/main';
import login from './pages/login';
import registration from './pages/registration';
import { Component } from './share/classes/Component';

export enum Pages {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
}

export const routs: Record<Pages, () => Component> = {
  '/': main,
  '/login': login,
  '/registration': registration,
};
