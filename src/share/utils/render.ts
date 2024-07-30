import { Component } from '../classes/Component';

export const render = (query: string, component: Component) => {
  const root = document.querySelector(query);
  const content = component.getContent();

  if (root && content) {
    root.appendChild(content);
    component.dispatchComponentDidMount();
  }

  return root;
};
