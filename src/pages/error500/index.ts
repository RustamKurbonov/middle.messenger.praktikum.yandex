import Button from '../../components/Button';
import Error from '../../components/Error';

const error500 = (): Error =>
  new Error({
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

export default error500;
