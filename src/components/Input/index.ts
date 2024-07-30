import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './Input.module.scss';

interface InputProps extends ComponentProps {
  propsAndChildren: {
    attr: { id: string; name: string; type: string };
  };
}

class Input extends Component {
  constructor(props: InputProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: { ...props.propsAndChildren.attr, class: styles.input },
      },
    });
  }
  render() {
    return this.compile('{{{Input}}}', this._props);
  }
}

export default Input;
