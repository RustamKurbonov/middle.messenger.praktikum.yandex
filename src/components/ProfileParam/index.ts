import tpl from './tpl';
import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './profileParam.module.scss';

interface ProfileParamProps extends ComponentProps {
  propsAndChildren: {
    title: string;
    value: string;
  };
}

class ProfileParam extends Component {
  constructor(props: ProfileParamProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles['profile-param'],
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

export default ProfileParam;
