import config from '../../config/config';
import { post } from './postman';
import { HttpHeader } from './postman';

export class Sendgrid {
  private headers;

  constructor() {
    this.headers = <HttpHeader>{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.sendgridKey}`
    };
  }

  async send(postParams: string): Promise<string> {
    try {
      return await post(config.sendgridBaseUrl, this.headers, postParams);
    } catch (err) {
      throw err;
    }
  }
}