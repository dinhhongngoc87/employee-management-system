import { ILoginParams, ILoginValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }
  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }
  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }
  if (password.length < 4) {
    return 'minPasswordInvalid';
  }
  return '';
};

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    username: validateEmail(values.username),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.username && !values.password;
};
