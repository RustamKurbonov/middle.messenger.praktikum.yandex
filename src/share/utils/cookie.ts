export const getCookies = (): Record<string, string> => {
  return document.cookie.split('; ').reduce(
    (acc, item) => {
      const [name, value] = item.split('=');
      acc[name] = value;
      return acc;
    },
    {} as Record<string, string>
  );
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=;max-age=-1`;
};

export const setCookie = (name: string, value: string): void => {
  if (name && value) {
    document.cookie = `${name}=-${value}`;
  }
};
