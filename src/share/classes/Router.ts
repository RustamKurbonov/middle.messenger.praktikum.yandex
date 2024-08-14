import { Paths, routes } from '../constants/routes';
import { Component } from './Component';
import { Route } from './Route';

class Router {
  static __instance: Router;
  routes: Route[];
  history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: Paths, block: () => Component): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as EventTarget & { location: Location };

      if (target) {
        this._onRoute(target.location.pathname as Paths);
      }
    }).bind(this);

    this._onRoute(window.location.pathname as Paths);
  }

  _onRoute(pathname: Paths): void {
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: Paths): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: Paths): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('#app');

Object.entries(routes).forEach(([pathname, page]) => {
  router.use(pathname as Paths, page);
});

export default router;
