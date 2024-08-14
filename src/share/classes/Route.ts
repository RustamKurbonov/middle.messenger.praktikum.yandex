import { Component, ComponentProps } from './Component';
import { render } from '../utils/render';
import { Paths } from '../constants/routes';
import { isEqual } from '../utils/isEqual';
import { unrender } from '../utils/unrender';

export class Route {
  private _pathname: Paths;
  private _blockClass: () => Component;
  private _block: Component | null;
  private _props: ComponentProps;

  constructor(pathname: Paths, view: () => Component, props: ComponentProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: Paths): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      unrender(this._props.rootQuery || '', this._block);
      this._block = null;
    }
  }

  match(pathname: Paths): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = this._blockClass();
      render(this._props.rootQuery || '', this._block);
    }
  }
}
