import validator from 'validator';


const customError = (mesg: string, name: string) => {
  const error = new Error(mesg);
  error.name = name;
  return error;
}

const checkInputEmpty = (key: string, val: string) => {
  if (val === undefined || validator.isEmpty(val)) {
    throw customError(`${key} is required`, 'InputNotValid');
  }
}

export {
  customError,
  checkInputEmpty,
}