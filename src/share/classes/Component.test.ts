import { Component, ComponentProps } from './Component';

type TestComponentProps = ComponentProps;

describe('Component', () => {
  const wrapper = document.createElement('div');

  class TestComponent extends Component {
    constructor(props: TestComponentProps) {
      super(props);
    }

    render(): DocumentFragment {
      return this.compile('{{label}}');
    }
  }

  const element = new TestComponent({
    tagName: 'button',
    propsAndChildren: { label: 'test', attr: { id: 'id' } },
  });

  wrapper.appendChild(element.getContent() as Node);

  it('отрисовывается корректно', () => {
    expect(wrapper.innerHTML).toEqual('<button id="id">test</button>');
  });

  it('меняет состояние', () => {
    element.setProps({ label: 'test2', attr: { id: 'id2' } });

    expect(wrapper.innerHTML).toEqual('<button id="id2">test2</button>');
  });
});
