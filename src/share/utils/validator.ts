type ValidatorType = 'login' | 'password' | 'name' | 'email' | 'phone' | 'message' | 'displayName';

const errorClass = 'error';

const text: Record<ValidatorType, string> = {
  login:
    'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  password: 'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  message: 'Не должно быть пустым',
  name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  displayName: 'Не может быть пустым',
  email:
    'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
};

const minMax: Record<ValidatorType, { min?: number; max?: number }> = {
  login: {
    min: 3,
    max: 30,
  },
  password: {
    min: 8,
    max: 40,
  },
  name: {
    min: undefined,
    max: undefined,
  },
  email: {
    min: undefined,
    max: undefined,
  },
  phone: {
    min: 10,
    max: 15,
  },
  message: {
    min: undefined,
    max: undefined,
  },
  displayName: {
    min: undefined,
    max: undefined,
  },
};

export const validator = (value: string, type: ValidatorType, id: string): boolean => {
  if (!id) {
    return false;
  }

  const elem = document.getElementById(id);

  if (!elem) {
    return false;
  }

  const { min, max } = minMax[type];
  const addedErrorBlock = document.querySelector(`#error-text-${id}`);

  addedErrorBlock?.remove();

  const checkRule = (ruleSuccessful: boolean): boolean => {
    if (ruleSuccessful) {
      removeErrorClass();
      return true;
    }
    addErrorClass();
    return false;
  };
  const removeErrorClass = (): void => {
    elem?.classList.remove(errorClass);
  };
  const addErrorClass = (): void => {
    const errorBlock = document.createElement('div');
    errorBlock?.append(text[type]);
    errorBlock.classList.add('error-text', `.error-text-${id}`);
    errorBlock.id = `error-text-${id}`;
    elem.parentElement?.append(errorBlock);
    elem?.classList.add(errorClass);
  };

  if (min && max && (value.length < min || value.length > max)) {
    return checkRule(false);
  }

  switch (type) {
    case 'login':
      return checkRule(new RegExp(/^[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/).test(value));

    case 'password':
      return checkRule(new RegExp(/^(?=.*[A-Z])(?=.*\d).*$/).test(value));

    case 'name':
      return checkRule(new RegExp(/^[A-ZА-Я][a-zA-ZА-Яа-я-]*$/).test(value));

    case 'email':
      return checkRule(
        new RegExp(
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        ).test(value)
      );

    case 'phone':
      return checkRule(new RegExp(/^\+?\d{10,15}$/).test(value));

    case 'message':
      return checkRule(value.trim() !== '');

    case 'displayName':
      return checkRule(value.trim() !== '');

    default:
      return checkRule(false);
  }
};
