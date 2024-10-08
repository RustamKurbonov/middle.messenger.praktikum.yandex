import { v4 as makeUUID } from 'uuid';
import Handlebars from 'handlebars';
import EventBus from './EventBus';

export interface ComponentProps {
  tagName?: string;
  propsAndChildren?: PropsAndChildren;
  rootQuery?: string;
}

export interface ObjectType {
  [name: string]: string | ObjectType;
}

export type PropsAndChildren = {
  [name: string]:
    | Component
    | Array<Component>
    | string
    | number
    | ObjectType
    | { [name: string]: Function }
    | undefined;
};

export class Component {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };
  _props: PropsAndChildren;
  _id: string;
  _element: HTMLElement | null = null;
  _meta: { tagName: string; props?: PropsAndChildren } | null = null;
  _eventBus: EventBus;
  _setUpdate = false;
  _lists: PropsAndChildren;
  _children: PropsAndChildren;

  constructor({ tagName = 'div', propsAndChildren = {} }: ComponentProps) {
    const { props, lists, children } = this.getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._id = makeUUID();
    this._meta = {
      tagName,
      props,
    };
    this._props = props || ({} as PropsAndChildren);
    this._children = children || {};
    this._lists = lists || [];
    this._eventBus = eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  getChildren(propsAndChildren: PropsAndChildren): {
    props?: PropsAndChildren;
    lists: PropsAndChildren;
    children: PropsAndChildren;
  } {
    const props = {} as PropsAndChildren;
    const children = {} as PropsAndChildren;
    const lists = {} as PropsAndChildren;

    Object.keys(propsAndChildren).forEach((key) => {
      const index = key as keyof PropsAndChildren;

      if (propsAndChildren[key] instanceof Component) {
        children[index] = propsAndChildren[index] as Component;
      } else if (Array.isArray(propsAndChildren[index])) {
        lists[index] = propsAndChildren[index];
      } else {
        props[index] = propsAndChildren[index] as string;
      }
    });

    return { props, lists, children };
  }

  compile(template: string, props?: PropsAndChildren): DocumentFragment {
    if (typeof props === 'undefined') {
      props = this._props;
    }

    const propsAndStubs = { ...props };

    this._children &&
      Object.entries(this._children).forEach(([key, child]) => {
        propsAndStubs[key] = `<div data-id="${(child as Component)._id}"></div>`;
      });

    this._lists &&
      Object.entries(this._lists).forEach(([key]) => {
        propsAndStubs[key] = `<div data-id="__1_${key}" class='test'></div>`;
      });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;

    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.values(this._children).forEach((child) => {
      const stub = fragment.content?.querySelector(`[data-id="${(child as Component)._id}"]`);

      if (stub) {
        const data = (child as Component).getContent();
        if (data) {
          stub.replaceWith(data);
        }
      }
    });

    this._lists &&
      Object.entries(this._lists).forEach(([key, child]) => {
        const stub = fragment.content?.querySelector(`[data-id="__1_${key}"]`);

        if (!stub) {
          return;
        }

        const listContent = this._createDocumentElement('template') as HTMLTemplateElement;

        (child as Array<Component>).forEach((item) => {
          if (item instanceof Component) {
            const htmlItem = item.getContent();
            htmlItem && listContent.content.append(htmlItem);
          } else {
            listContent.content.append(`${item}`);
          }
        });

        stub.replaceWith(listContent.content);
      });

    return fragment.content;
  }

  init(): void {
    const meta = this._meta;

    if (meta) {
      const { tagName } = meta;
      this._element = this._createDocumentElement(tagName);
    }

    this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
  }

  componentDidMount(callBack?: () => void): void {
    callBack && callBack();
  }

  dispatchComponentDidMount(): void {
    this._eventBus.emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this._children).length) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  dispatchComponentWillUnmount(): void {
    this._eventBus.emit(Component.EVENTS.FLOW_CWU);
  }

  componentDidUpdate(callBack?: () => void): boolean {
    callBack && callBack();
    return true;
  }

  setProps = (nextProps: PropsAndChildren): void => {
    if (!nextProps) {
      return;
    }

    this._setUpdate = true;
    const oldValue = { ...this._props };

    const { props, children, lists } = this.getChildren(nextProps);

    if (Object.values(lists).length) {
      Object.assign(this._lists, lists);
    }

    if (Object.values(children).length) {
      Object.assign(this._children, children);
    }

    if (props && Object.values(props).length) {
      Object.assign(this._props, props);
    }

    if (this._setUpdate) {
      this._eventBus.emit(Component.EVENTS.FLOW_CDU, oldValue, this._props);
      this._setUpdate = false;
    }
  };

  get element(): HTMLElement | null {
    return this._element;
  }

  render(): Node | void {}

  addEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events).forEach((name) => {
      this._element?.addEventListener(
        name,
        (
          events as {
            [name: string]: () => void;
          }
        )[name]
      );
    });
  }

  removeEvents(): void {
    const { events = {} } = this._props;

    Object.keys(events).forEach((name) => {
      this._element?.removeEventListener(
        name,
        (
          events as {
            [name: string]: () => void;
          }
        )[name]
      );
    });
  }

  addAttribute(): void {
    const { attr = {} } = this._props;

    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, String(value));
    });
  }

  getContent(): HTMLElement | null {
    return this.element;
  }

  _render(): void {
    const block = this.render();

    if (block && this._element) {
      this.removeEvents();
      this._element.innerHTML = '';
      this._element.appendChild(block);
      this.addAttribute();
      this.addEvents();
    }
  }

  _componentDidUpdate(): void {
    const isReRender = this.componentDidUpdate();
    if (isReRender) {
      this._eventBus.emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  _componentWillUnmount(): void {}

  _componentDidMount(): void {
    this.componentDidMount();
    Object.values(this._children).forEach((child) => {
      (child as Component).dispatchComponentDidMount();
    });
  }

  _registerEvents(eventBus: EventBus): void {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  _makePropsProxy(props: PropsAndChildren): PropsAndChildren {
    return props;
  }

  _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName);

    return element;
  }
}
