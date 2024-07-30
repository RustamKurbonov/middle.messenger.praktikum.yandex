import Button from '../../components/Button';
import Error from '../../components/Error';

export default () => {
  return new Error({
    tagName: 'main',
    propsAndChildren: {
      title: '500',
      text: 'Уже чиним',
      button: new Button({
        tagName: 'a',
        propsAndChildren: {
          label: 'Назад к чатам',
          attr: {
            href: './chat',
          },
        },
      }),
    },
  });
};
