import config from '../config/config';
import { checkInputEmpty, checkEmails } from './errorHandler';
import { MailgunParam } from './MailgunParam';
import { SendgridParam } from './SendgridParam';

export interface ReqBody {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  content: string;
}
export interface ResBody {
  status: number;
  message: string;
}
export class PostHelper {
  checkEnv(): void {
    try {
      checkInputEmpty('Api key', config.mailgunKey);
      checkInputEmpty('Domain for mailgun', config.mailgunDomain);
      checkInputEmpty('From email', config.mailgunFromEmail);
      checkInputEmpty('Api key', config.sendgridKey);
      checkInputEmpty('From email', config.sendgridFromEmail);
    } catch (err) {
      throw err;
    }
  }
checkInput(reqBody: ReqBody): void {
    try {
      !checkInputEmpty('To', reqBody.to) && checkEmails(reqBody.to);
      !checkInputEmpty('Cc', reqBody.cc, true) && checkEmails(reqBody.cc);
      !checkInputEmpty('Bcc', reqBody.bcc, true) && checkEmails(reqBody.bcc);
      checkInputEmpty('Subject', reqBody.subject);
    } catch (err) {
      throw err;
    }
  }
  makeParamsMailGun(reqBody: ReqBody): URLSearchParams {
    const mailgunParam = new MailgunParam(config.mailgunFromEmail, reqBody);
    return mailgunParam.makeParams();
  }
  makeParamsSendGrid(reqBody: ReqBody): string {
    const sendgridParam = new SendgridParam(config.mailgunFromEmail, reqBody);
    return sendgridParam.makeParams();
  }
}