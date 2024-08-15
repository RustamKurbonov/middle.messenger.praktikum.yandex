import { Component, ComponentProps } from 'src/share/classes/Component';
import { Paths } from 'src/share/constants/routes';
import { isEqualPaths, unrender, render } from 'src/share/utils';

export class Route {
  private _pathname: Paths;
  private _blockClass: Component;
  private _block: Component | null;
  private _props: ComponentProps;

  constructor(pathname: Paths, view: Component, props: ComponentProps) {
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
    return isEqualPaths(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = this._blockClass;
      render(this._props.rootQuery || '', this._block);
    }
  }
}
