import { ReqBody } from '../../utils/PostHelper';
import { Mailer } from './Mailer';
import { Mailgun } from './Mailgun';
import { Sendgrid } from './Sendgrid';

export class Failover {
  // get two mailer classes
  mailers = [Mailgun, Sendgrid];
  index = 0;

  constructor() {}

  async failOverSend(reqBody: ReqBody) {
    while (this.index < this.mailers.length) {
      const mailer = this.mailers[this.index];
      console.log('mailer = ', mailer);
      try {
        // create each mailer class instance
        return await this.send(new mailer(reqBody));
      } catch (err) {
        if (++this.index === this.mailers.length) {
          throw err;
        }
        console.log('Fail Over to the next mailer! => ', mailer);
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
