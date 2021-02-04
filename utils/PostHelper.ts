import config from '../config/config';
import { checkInputEmpty } from './errorHandler';
import { ReqBody, ApiParamsMailGun, ApiParamsSendGrid } from './apiParams';

export class PostHelper {
  checkEnv(): void {
    try {
      checkInputEmpty('api key', config.mailgunKey);
      checkInputEmpty('domain for mailgun', config.mailgunDomain);
      checkInputEmpty('from email', config.mailgunFromEmail);
      checkInputEmpty('api key', config.sendgridKey);
      checkInputEmpty('from email', config.sendgridFromEmail);
    } catch (err) {
      throw err;
    }
  }
  makeParamsMailGun(): void {}
  makeParamsSendGrid(): void {}
}

const inputValidate = (body: ReqBody, getParamsFunc: ApiParamsMailGun | ApiParamsSendGrid) => {
  let params: URLSearchParams | string;
  try {
    params = getParamsFunc(
      `Chris Yoon <${config.mailgunFromEmail}>`,
      body
    );
  } catch (err) {
    throw err;
  }
  return params;
}

export {
  inputValidate
}