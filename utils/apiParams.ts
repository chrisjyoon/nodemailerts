import validator from 'validator';
import { checkInputEmpty, customError } from './errorHandler';

export interface ReqBody {
  to: string;
  cc: string;
  bcc: string;
  subject: string;
  text: string;
}
export type ApiParamsMailGun = (from: string, body: ReqBody) => URLSearchParams;
export type ApiParamsSendGrid = (from: string, body: ReqBody) => string;
interface Recipients {
  to: object[];
  cc?: object[];
  bcc?: object[];
}

// emails can be comma-separated value
const checkEmails = (key: string, emails: string) => {
  const arrEmail = emails.split(',');
  for (let i = 0; i < arrEmail.length; i++) {
    if (!validator.isEmail(arrEmail[i].trim())) {
      throw customError('Please check your email address', 'InputNotValid');
    }
  }
  return true;
}

const getApiParamsMailGun = (from: string, body: ReqBody) => {
  const params = new URLSearchParams();
  params.append('from', from);

  try {
    if (!checkInputEmpty('to', body.to) && checkEmails('to', body.to)) {
      params.append('to', body.to);
    }
    if (!checkInputEmpty('cc', body.cc, true) && checkEmails('cc', body.cc)) {
      params.append('cc', body.cc);
    }
    if (!checkInputEmpty('bcc', body.bcc, true) && checkEmails('bcc', body.bcc)) {
      params.append('bcc', body.bcc);
    }
  } catch (err) {
    throw err;
  }
  params.append('subject', body.subject);
  params.append('text', body.text);
  return params;
}

const getApiParamsSendGrid = (from: string, body: ReqBody) => {
  const params = {
    personalizations: [] as object[],
    from: { email: from },
    subject: body.subject,
    content: [
      {
        type: 'text/plain',
        value: body.text,
      },
    ],
  };
  try {
    const recipients = {} as Recipients;
    if (!checkInputEmpty('to', body.to) && checkEmails('to', body.to)) {
      recipients.to = body.to.split(',').map(email => ({email: email.trim()}));
    }
    if (!checkInputEmpty('cc', body.cc, true) && checkEmails('cc', body.cc)) {
      recipients.cc = body.cc.split(',').map(email => ({email: email.trim()}));
    }
    if (!checkInputEmpty('bcc', body.bcc, true) && checkEmails('bcc', body.bcc)) {
      recipients.bcc = body.bcc.split(',').map(email => ({email: email.trim()}));
    }
    params.personalizations.push(recipients);
  } catch (err) {
    throw err;
  }
  return JSON.stringify(params);
}


export {
  getApiParamsMailGun,
  getApiParamsSendGrid
}