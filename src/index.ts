import './assets/css/common.scss';
import authController from './serveses/controllers/AuthController';
import router from './serveses/router/Router';
import store from './serveses/store/Store';
import { getCookies } from './share/utils';

document.addEventListener('DOMContentLoaded', () => {
  const state = store.getState();
  const cookie = getCookies();
  const user = state?.user;

  router.start();

  if (cookie?.user && !user) {
    authController.getUserInfo();
  }
});
