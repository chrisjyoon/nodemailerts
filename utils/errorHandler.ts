import validator from 'validator';


const customError = (mesg: string, name: string) => {
  const error = new Error(mesg);
  error.name = name;
  return error;
}

const isInputEmpty = (key: string, val: string) => {
  return (val === undefined || validator.isEmpty(val));
}


export {
  customError,
  isInputEmpty,
}