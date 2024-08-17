import './assets/css/common.scss';
import authController from './serveses/controllers/AuthController';
import router from './serveses/router/Router';
import store from './serveses/store/Store';

document.addEventListener('DOMContentLoaded', () => {
  const state = store.getState();
  const user = state?.user;

  router.start();

  if (!user) {
    authController.getUserInfo();
  }
});
