import { Component, ComponentProps } from '../../share/classes/Component';
import tpl from './tpl';
import styles from './formItem.module.scss';

interface FormItemProps extends ComponentProps {
  propsAndChildren: {
    id: string;
    label: string;
    input: Component;
  };
}

class FormItem extends Component {
  constructor(props: FormItemProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles.formItem,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

export default FormItem;
