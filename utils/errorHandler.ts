import validator from 'validator';

export const customError = (mesg: string, name: string) => {
  const error = new Error(mesg);
  error.name = name;
  return error;
}

export const checkInputEmpty = (key: string, val: string, isOptional = false) => {
  if (isOptional) {
    return (val === undefined || validator.isEmpty(val));
  }
  if (val === undefined || validator.isEmpty(val)) {
    throw customError(`${key} is required`, 'InputNotValid');
  }
}