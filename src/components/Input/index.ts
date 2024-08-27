import cn from 'classnames';
import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './Input.module.scss';

interface InputProps extends ComponentProps {
  propsAndChildren: {
    attr: { id: string; name: string; type: string; value?: string; placeholder?: string };
    events?: {
      blur: (e: Event) => void;
    };
  };
}

class Input extends Component {
  constructor(props: InputProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          ...props.propsAndChildren.attr,
          class: cn(styles.input, 'input'),
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{{Input}}}', this._props);
  }
}

export default Input;
