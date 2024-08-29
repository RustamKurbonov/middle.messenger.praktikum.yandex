import { Paths } from 'src/share/constants/routes';
import router from './Router';

describe('Router', () => {
  router.start();
  const mockGoBack = jest.fn();
  const mockGoForward = jest.fn();

  it('правильно запускается', () => {
    expect(global.window.location.pathname).toBe(Paths.Login);
  });

  it('правильно работает переход по ссылке', () => {
    router.go(Paths.Chat);
    expect(global.window.location.pathname).toBe(Paths.Chat);
  });

  it('правильно работает переход назад', () => {
    router.back({ back: mockGoBack } as unknown as History);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('правильно работает переход вперед', () => {
    router.forward({ forward: mockGoForward } as unknown as History);
    expect(mockGoForward).toHaveBeenCalled();
  });

  it('правильно находит нужный путь', () => {
    expect(router.getRoute(Paths.Profile)).not.toBeNull();
  });
});
