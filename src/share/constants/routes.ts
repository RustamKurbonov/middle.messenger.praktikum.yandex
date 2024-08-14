import { Component } from '../classes/Component';
import main from '../../pages/main';
import login from '../../pages/login';
import registration from '../../pages/registration';
import profile from '../../pages/profile';
import editingProfile from '../../pages/editingProfile';
import error404 from '../../pages/error404';
import error500 from '../../pages/error500';
import chat from '../../pages/chat';

export enum Paths {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Profile = '/profile',
  EditingProfile = '/editingProfile',
  Error404 = '/error404',
  Error500 = '/error500',
  Chat = '/chat',
}

export const routes: Record<Paths, () => Component> = {
  '/': main,
  '/login': login,
  '/registration': registration,
  '/profile': profile,
  '/editingProfile': editingProfile,
  '/error404': error404,
  '/error500': error500,
  '/chat': chat,
};
