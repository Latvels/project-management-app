export const isValidEmail = (email: string): boolean => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/.test(
    email
  );
};

export const stringIncludesUppercaseLetter = (string: string): boolean => {
  return /[A-Z]/.test(string);
};

export const stringIncludesLowercaseLetter = (string: string): boolean => {
  return /[a-z]/.test(string);
};

export const isValidStringLength = (string: string, minLength: number): boolean => {
  return new RegExp(`.{${minLength},}`).test(string);
};

export const isValidPassword = (password: string): boolean => {
  return /^\S{6,}$/.test(password);
};

export const stringIncludesNumber = (string: string): boolean => {
  return /\d/.test(string);
};

export const stringIncludesSpecialCharacter = (string: string): boolean => {
  return /([\W_])/.test(string);
};

export const isValidName = (string: string): boolean => {
  return string.search(/\d/) === -1;
}
