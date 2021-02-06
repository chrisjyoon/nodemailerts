import { ReqBody } from '../../utils/PostHelper';
import { Mailer } from './Mailer';
import { Mailgun } from './Mailgun';
import { Sendgrid } from './Sendgrid';

export class FailoverSender {
  // get two mailer classes
  readonly mailers = [Mailgun, Sendgrid];
  index: number;
  tried: number;

  constructor() {
    this.index = Math.round(Math.random());
    this.tried = 0;
  }

  async failOverSend(reqBody: ReqBody) {
    while (true) {
      const mailer = this.mailers[this.index];
      console.log('try this mailer: ', mailer);
      try {
        // create each mailer class instance
        return await this.send(new mailer(reqBody));
      } catch (err) {
        if (++this.tried === this.mailers.length) {
          // we've tried all
          throw err;
        }
        this.index = 1 - this.index;
        console.log('Fail Over to the next mailer!');
      }
    }
  }

  async send(mailer: Mailer) {
    try {
      return await mailer.send();
    } catch (err) {
      throw err;
    }
  }
}
