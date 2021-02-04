import config from '../../config/config';
import { ReqBody } from '../../utils/PostHelper';
import { Mailer } from './Mailer';
import { post, HttpHeader } from './postman';

export class Mailgun extends Mailer implements Mailer {
  private postParams: URLSearchParams;

  constructor(reqBody: ReqBody) {
    super();
    const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${apiKeyHeader}`
    } as HttpHeader;
    this.postParams = this.postHelper.makeParamsMailGun(reqBody);
  }

  async send(): Promise<string> {
    try {
      return await post(config.mailgunBaseUrl, this.headers, this.postParams);
    } catch (err) {
      throw err;
    }
  }
}
