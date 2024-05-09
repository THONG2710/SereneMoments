export const isValidPassword = (stringPassword: string) => stringPassword.length >= 8;
export const isValidPhoneNumber = (stringPhoneNumber: string) =>
  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(stringPhoneNumber);
export const isValidRePassword = (stringRePassword: string) =>
  stringRePassword.length >= 8;
