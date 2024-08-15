import router from 'src/serveses/router/Router';
import Button from '../../components/Button';
import Error from '../../components/Error';
import { Paths } from 'src/share/constants/routes';

const error500 = new Error({
  tagName: 'main',
  propsAndChildren: {
    title: '500',
    text: 'Уже чиним',
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

export default error500;
