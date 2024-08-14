import { Pages, routes } from '../constants/routes';
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

  use(pathname: Pages, block: () => Component): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start(): void {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as EventTarget & { location: Location };

      if (target) {
        this._onRoute(target.location.pathname as Pages);
      }
    }).bind(this);

    this._onRoute(window.location.pathname as Pages);
  }

  _onRoute(pathname: Pages): void {
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

  go(pathname: Pages): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: Pages): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('#app');

Object.entries(routes).forEach(([pathname, page]) => {
  router.use(pathname as Pages, page);
});

export default router;
