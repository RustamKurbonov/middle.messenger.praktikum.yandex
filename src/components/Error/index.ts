import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './error.module.scss';
import tpl from './tpl';

interface ErrorProps extends ComponentProps {
  propsAndChildren: {
    title: string;
    text: string;
    button: Component;
  };
}

class Error extends Component {
  constructor(props: ErrorProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles.error,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

export default Error;
