import { Pages, routs } from './routs';
import { Component } from './share/classes/Component';
import { render } from './share/utils/render';
import './assets/css/common.scss';

document.addEventListener('DOMContentLoaded', () => {
  const { pathname } = document.location;

  const page: Component = routs?.[pathname as Pages]();

  render('#app', page);
});
