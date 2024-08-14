import router from 'src/share/classes/Router';
import Button from '../../components/Button';
import Error from '../../components/Error';
import { Paths } from 'src/share/constants/routes';

const error404 = (): Error =>
  new Error({
    tagName: 'main',
    propsAndChildren: {
      title: '404',
      text: 'Не туда попали',
      button: new Button({
        tagName: 'button',
        propsAndChildren: {
          label: 'Назад к чатам',
          events: {
            click() {
              router.go(Paths.Chat);
            },
          },
        },
      }),
    },
  });

export default error404;
