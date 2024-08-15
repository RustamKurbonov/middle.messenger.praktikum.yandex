import { IndexedValue } from '../types';

type StringIndexed<T = IndexedValue> = Record<string, T>;

export const queryStringify = (data: StringIndexed): string | never => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value.reduce(
        (result, arrData, index) => ({
          ...(result as Array<IndexedValue>),
          [`${key}[${index}]`]: arrData,
        }),
        {} as StringIndexed
      );

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {}).reduce<StringIndexed>(
        (result, objKey) => ({
          ...result,
          [`${key}[${objKey}]`]: value[objKey as keyof Object],
        }),
        {}
      );

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
};

export default queryStringify;
