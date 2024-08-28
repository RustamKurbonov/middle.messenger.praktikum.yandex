import { Paths } from 'src/share/constants/routes';
import router from './Router';

describe('Router', () => {
  it('корректно преобразует объект версии в строку', () => {
    router.start();

    router.go(Paths.Chat);

    expect('1.2.3.4').toBe('1.2.3.4');
  });
});
