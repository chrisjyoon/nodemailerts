import validator from 'validator';
import { ReqBody } from './PostHelper';

export class CustomParam {
  protected from: string;
  protected to: string;
  protected cc?: string;
  protected bcc?: string;
  protected subject: string;
  protected content: string;

  constructor(from: string, reqBody: ReqBody) {
    this.from = from;
    this.to = reqBody.to;
    this.cc = reqBody.cc;
    this.bcc = reqBody.bcc;
    this.subject = reqBody.subject;
    this.content = reqBody.content || '';
  }

  protected isValid(item: string | undefined) {
    return item !== undefined && !validator.isEmpty(item);
  }
}