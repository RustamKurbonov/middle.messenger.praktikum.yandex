import { Component } from '../classes/Component';

export const unrender = (query: string, component: Component): Element | null => {
  const root = document.querySelector(query);
  const content = component.getContent();

  if (root && content) {
    root.removeChild(content);
    component.dispatchComponentWillUnmount();
  }

  return root;
};
