import cn from 'classnames';
import styles from './button.module.scss';
import { Component, ComponentProps } from '../../share/classes/Component';
import { MouseEvent } from '../../share/types/MouseEvent';

interface ButtonProps extends ComponentProps {
  propsAndChildren: {
    label: string;
    type?: 'primary' | 'link' | 'warning';
    attr?: {
      href: string;
    };
    events?: {
      click: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    };
  };
}

class Button extends Component {
  constructor(props: ButtonProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          ...props.propsAndChildren?.attr,
          class: cn(styles.button, styles[props.propsAndChildren?.type || 'link']),
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{label}}', {
      ...this._props,
    });
  }
}

export default Button;
