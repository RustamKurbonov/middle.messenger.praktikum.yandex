class EventBus {
  listeners: Record<string, Array<Function>>;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Function) {
    if (event && typeof event === 'string') {
      if (!this.listeners?.[event]) {
        this.listeners[event] = [];
      }

      this.listeners[event].push(callback);
    }
  }

  off(event: string, callback: Function) {
    if (event && typeof event === 'string') {
      if (this.listeners[event]) {
        this.listeners[event] = this.listeners[event].filter(
          (item) => item !== callback,
        );
      } else {
        throw new Error(`Нет события: ${event}`);
      }
    }
  }

  emit<T = unknown>(event: string, ...args: Array<T>) {
    if (event && typeof event === 'string') {
      if (this.listeners[event]) {
        this.listeners[event].forEach((listener) => {
          listener(...args);
        });
      } else {
        throw new Error(`Нет события: ${event}`);
      }
    }
  }
}

export default EventBus;
