export const isValidPassword = stringPassword => stringPassword.length >= 8;
export const isValidPhoneNumber = stringPhoneNumber =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(stringPhoneNumber);
export const isValidRePassword = stringRePassword =>
  stringRePassword.length >= 8;
