import main from './pages/main';
import login from './pages/login';
import registration from './pages/registration';
import profile from './pages/profile';
import editingProfile from './pages/editingProfile';
import { Component } from './share/classes/Component';

export enum Pages {
  Main = '/',
  Login = '/login',
  Registration = '/registration',
  Profile = '/profile',
  EditingProfile = '/editingProfile',
}

export const routs: Record<Pages, () => Component> = {
  '/': main,
  '/login': login,
  '/registration': registration,
  '/profile': profile,
  '/editingProfile': editingProfile,
};
