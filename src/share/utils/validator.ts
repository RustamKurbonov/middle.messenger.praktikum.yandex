type ValidatorType = 'login' | 'password' | 'name' | 'email' | 'phone' | 'message' | 'displayName';

const errorClass = 'error';

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

export const validator = (value: string, elem: Element | null, type: ValidatorType): boolean => {
  if (!elem) {
    return false;
  }

  const { min, max } = minMax[type];

  const checkRule = (ruleSuccessful: boolean): boolean => {
    if (ruleSuccessful) {
      removeErrorClass();
      return true;
    }
    addErrorClass();
    return false;
  };
  const removeErrorClass = (): void => elem?.classList.remove(errorClass);
  const addErrorClass = (): void => elem?.classList.add(errorClass);

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
