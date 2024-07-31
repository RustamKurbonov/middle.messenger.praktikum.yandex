type ValidatorType = 'login' | 'password';

const errorClass = 'error';

const minMax: Record<ValidatorType, { min: number; max: number }> = {
  login: {
    min: 3,
    max: 30,
  },
  password: {
    min: 8,
    max: 40,
  },
};

export const validator = (
  value: string,
  elem: Element | null,
  type: ValidatorType,
): boolean => {
  if (!elem) {
    return false;
  }

  const { min, max } = minMax[type];

  const checkRule = (ruleSuccessful: boolean): boolean => {
    if (ruleSuccessful) {
      removeErrorClass();
      return true;
    } else {
      addErrorClass();
      return false;
    }
  };
  const removeErrorClass = (): void => elem?.classList.remove(errorClass);
  const addErrorClass = (): void => elem?.classList.add(errorClass);

  if (min && max && (value.length < min || value.length > max)) {
    return checkRule(false);
  }

  switch (type) {
    case 'login':
      //Латиница + числа + символы + запрет числа без букв
      return checkRule(
        new RegExp(/^[a-zA-Z0-9_-]*[a-zA-Z][a-zA-Z0-9_-]*$/).test(value),
      );

    case 'password':
      //Хотя бы одна заглавная буква и цифра
      return checkRule(new RegExp(/^(?=.*[A-Z])(?=.*\d).*$/).test(value));

    default:
      return checkRule(false);
  }
};
