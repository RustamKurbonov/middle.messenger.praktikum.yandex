import { Component } from '../classes/Component';
import login from '../../pages/login';
import registration from '../../pages/registration';
import profile from '../../pages/profile';
import editingProfile from '../../pages/editingProfile';
import error404 from '../../pages/error404';
import error500 from '../../pages/error500';
import chat from '../../pages/chat';
import chatSetting from '../../pages/chatSetting';

export enum Paths {
  Login = '/',
  Registration = '/sign-up',
  Profile = '/settings',
  EditingProfile = '/settings-change',
  Chat = '/messenger',
  Error404 = '/error404',
  Error500 = '/error500',
  ChatSetting = '/chatSetting',
}

export const routes: Record<Paths, Component> = {
  '/': login,
  '/sign-up': registration,
  '/settings': profile,
  '/settings-change': editingProfile,
  '/error404': error404,
  '/error500': error500,
  '/messenger': chat,
  '/chatSetting': chatSetting,
};
