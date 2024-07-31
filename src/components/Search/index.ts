import { Component, ComponentProps } from '../../share/classes/Component';
import styles from './search.module.scss';

interface SearchProps extends ComponentProps {
  propsAndChildren: {
    attr: {
      placeholder: string;
    };
  };
}

class Search extends Component {
  constructor(props: SearchProps) {
    super({
      ...props,
      propsAndChildren: {
        ...props.propsAndChildren,
        attr: {
          ...props.propsAndChildren.attr,
          class: styles.search,
        },
      },
    });
  }

  render() {
    return this.compile('{{search}}', {
      ...this._props,
    });
  }
}

export default Search;
