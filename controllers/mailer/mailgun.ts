import config from '../../config/config';
import { post } from './postman';
import { HttpHeader } from './postman';

export class Mailgun {
  private headers;

  constructor() {
    const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${apiKeyHeader}`
    } as HttpHeader;
  }

  async send(postParams: URLSearchParams): Promise<string> {
    try {
      return await post(config.mailgunBaseUrl, this.headers, postParams);
    } catch (err) {
      throw err;
    }
  }
}
