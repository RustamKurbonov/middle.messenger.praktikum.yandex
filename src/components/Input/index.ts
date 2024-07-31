import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './Input.module.scss';
import cn from 'classnames';

interface InputProps extends ComponentProps {
  propsAndChildren: {
    attr: { id: string; name: string; type: string };
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
  render() {
    return this.compile('{{{Input}}}', this._props);
  }
}

export default Input;
