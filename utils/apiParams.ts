import validator from 'validator';
import { customError } from './errorHandler';

export interface ReqBody {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  text: string;
}

// emails can be comma-separated value
const checkEmails = (params: URLSearchParams, key: string, emails: string) => {
  if (emails === undefined || validator.isEmpty(emails)) {
    throw customError(`${key} is required`, 'InputNotValid');
  }
  const arrEmail = emails.split(',');
  for (let i = 0; i < arrEmail.length; i++) {
    if (!validator.isEmail(arrEmail[i].trim())) {
      console.log('arrEmail[i] = ', arrEmail[i]);
      throw customError('Please check your email address', 'InputNotValid');
    }
  }
  params.append(key, emails);
  return true;
}

const getApiParams = (from: string, body: ReqBody) => {
  const params = new URLSearchParams();
  params.append('from', from);

  try {
    checkEmails(params, 'to', body.to);
    if (body.cc) {
      checkEmails(params, 'cc', body.cc);
    }
    if (body.bcc) {
      checkEmails(params, 'bcc', body.bcc);
    }
  } catch (err) {
    throw err;
  }
  params.append('subject', body.subject);
  params.append('text', body.text);
  return params;
}


export {
  getApiParams,
}