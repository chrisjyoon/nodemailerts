import config from '../config/config';
import { checkInputEmpty, checkEmails } from './errorHandler';
import { ReqBody, ApiParamsMailGun, ApiParamsSendGrid } from './apiParams';
import { MailgunParam } from './MailgunParam';
import { SendgridParams } from './SendgridParam';

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
    const sendgridParam = new SendgridParams(config.mailgunFromEmail, reqBody);
    return sendgridParam.makeParams();
  }
}