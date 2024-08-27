import styles from './profileSidebar.module.scss';
import { Component, ComponentProps } from '../../share/classes/Component';
import { MouseEvent } from '../../share/types';

interface ProfileSidebarProps extends ComponentProps {
  propsAndChildren: {
    events?: {
      click: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
    };
  };
}

class ProfileSidebar extends Component {
  constructor(props: ProfileSidebarProps) {
    super({
      ...props,
      tagName: 'button',
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          class: styles['profile-sidebar'],
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{button}}', {
      ...this._props,
    });
  }
}

export default ProfileSidebar;
