const EMAIL_REGEX = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

export const PasswordRequire = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password should be at least 6 characters long',
  },
};

export const ConfirmPassword = {
  validate: (value: string, valueCheck: string) =>
    value === valueCheck || 'Password do not match',
};

export const EmailRequired = {
  required: 'Email is required',
  pattern: {
    value: EMAIL_REGEX,
    message: 'Email is invalid',
  },
};

export const Required = {
  required: 'This field is required',
};
