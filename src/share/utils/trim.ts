export const trim = (value: string, rules?: string): string => {
  if (rules && rules !== ' ') {
    const reg = new RegExp(`[${rules}]`, 'gi');

    return value.replace(reg, '');
  } else {
    return value.trim();
  }
};
