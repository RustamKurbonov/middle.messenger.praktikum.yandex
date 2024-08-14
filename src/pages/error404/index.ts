import Button from '../../components/Button';
import Error from '../../components/Error';

const error404 = (): Error =>
  new Error({
    tagName: 'main',
    propsAndChildren: {
      title: '404',
      text: 'Не туда попали',
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

export default error404;
