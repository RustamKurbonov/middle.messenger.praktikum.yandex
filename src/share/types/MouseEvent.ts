type NativeMouseEvent = MouseEvent;

interface BaseSyntheticEvent<E = object, C = unknown, T = unknown> {
  nativeEvent: E;
  currentTarget: C;
  target: T;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  preventDefault(): void;
  isDefaultPrevented(): boolean;
  stopPropagation(): void;
  isPropagationStopped(): boolean;
  persist(): void;
  timeStamp: number;
  type: string;
}

type SyntheticEvent<T = Element, E = Event> = BaseSyntheticEvent<E, EventTarget & T, EventTarget>;

interface AbstractView {
  styleMedia: StyleMedia;
  document: Document;
}

type NativeUIEvent = UIEvent;

interface UIEvent<T = Element, E = NativeUIEvent> extends SyntheticEvent<T, E> {
  detail: number;
  view: AbstractView;
}

export interface MouseEvent<T = Element, E = NativeMouseEvent> extends UIEvent<T, E> {
  altKey: boolean;
  button: number;
  buttons: number;
  clientX: number;
  clientY: number;
  ctrlKey: boolean;
  getModifierState(key: string): boolean;
  metaKey: boolean;
  movementX: number;
  movementY: number;
  pageX: number;
  pageY: number;
  relatedTarget: EventTarget | null;
  screenX: number;
  screenY: number;
  shiftKey: boolean;
}
