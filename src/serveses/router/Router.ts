import { Paths, routes } from 'src/share/constants/routes';
import { Route } from './Route';
import { Component } from 'src/share/classes/Component';
import store from '../store/Store';
import authController from '../controllers/AuthController';

class Router {
  static __instance: Router;
  private routes: Route[];
  private history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery: string, routes: Record<Paths, Component>) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Object.entries(routes).forEach(([pathname, page]) => {
      this._use(pathname as Paths, page);
    });

    Router.__instance = this;
  }

  _use(pathname: Paths, block: Component): Router {
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
    const state = store.getState();
    const user = state?.user;
    const route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (!user) {
      authController.getUserInfo(
        (user) => {
          if (user) {
            if (pathname === Paths.Login || pathname === Paths.Registration) {
              this.go(Paths.Chat);
            }
          }
        },
        (error: Error) => {
          if (error.message === '401') {
            if (pathname !== Paths.Login && pathname !== Paths.Registration) {
              this.go(Paths.Login);
            }
          }
        }
      );
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

  back(history?: History): void {
    if (history) {
      history.back();
    }
    this.history.back();
  }

  forward(history?: History): void {
    if (history) {
      history.forward();
    }
    this.history.forward();
  }

  getRoute(pathname: Paths): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

const router = new Router('#app', routes);

export default router;
