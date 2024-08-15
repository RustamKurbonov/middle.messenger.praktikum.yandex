import store, { StoreEvents } from 'src/serveses/store/Store';
import { Component as ComponentClass, ComponentProps } from 'src/share/classes/Component';
import { Indexed, isEqual } from 'src/share/utils';

export const connect = (
  Component: typeof ComponentClass,
  mapStateToProps: (state: Indexed) => Indexed
): typeof ComponentClass => {
  return class extends Component {
    constructor(props: ComponentProps) {
      let state = mapStateToProps(store.getState());

      super({ ...props, ...mapStateToProps(store.getState()) });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          console.log({ ...mapStateToProps(store.getState()) });
          this.setProps({ ...mapStateToProps(store.getState()) });
        }

        state = newState;
      });
    }
  };
};
