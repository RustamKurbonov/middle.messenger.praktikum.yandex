import { Component } from '../../share/classes/Component';
import styles from './InputImage.module.scss';
import tpl from './tpl';

interface InputImageProps {
  id: string;
  name: string;
}

class InputImage extends Component {
  constructor(props: InputImageProps) {
    super({
      tagName: 'form',
      propsAndChildren: {
        name: props.name,
        attr: {
          class: styles['input-images'],
          id: props.id,
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(tpl, this._props);
  }
}

export default InputImage;
