import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './form.module.scss';

export interface FormProps extends ComponentProps {
  propsAndChildren: {
    title: string;
    fields: Component[];
    buttons?: Component[];
    id?: string;
    errorText?: string;
    attr?: {
      class?: string;
    };
  };
}

class Form extends Component {
  constructor(props: FormProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          ...props.propsAndChildren?.attr,
          class: styles.form,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, {
      ...this._props,
    });
  }
}

export default Form;
