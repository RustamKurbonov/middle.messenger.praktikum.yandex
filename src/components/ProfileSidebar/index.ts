import styles from './profileSidebar.module.scss';
import { Component, ComponentProps } from '../../share/classes/Component';

interface ProfileSidebarProps extends ComponentProps {
  propsAndChildren: {
    attr: {
      href: string;
    };
  };
}

class ProfileSidebar extends Component {
  constructor(props: ProfileSidebarProps) {
    super({
      ...props,
      tagName: 'a',
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          ...props.propsAndChildren.attr,
          class: styles['profile-sidebar'],
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile('{{href}}', {
      ...this._props,
    });
  }
}

export default ProfileSidebar;
