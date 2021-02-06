import config from '../../config/config';
import { ReqBody, ResBody } from '../../utils/PostHelper';
import { Mailer } from './Mailer';
import { post, HttpHeader } from './postman';

export class Sendgrid extends Mailer implements Mailer {
  private postParams: string;

  constructor(reqBody: ReqBody) {
    super();
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.sendgridKey}`
    } as HttpHeader;
    this.postParams = this.postHelper.makeParamsSendGrid(reqBody);
  }

  async send(): Promise<ResBody> {
    try {
      return await post(config.sendgridBaseUrl, this.headers, this.postParams);
    } catch (err) {
      throw err;
    }
  }
}