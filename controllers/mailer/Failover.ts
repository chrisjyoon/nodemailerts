import { ReqBody } from '../../utils/PostHelper';
import { Mailer } from './Mailer';
import { Mailgun } from './Mailgun';
import { Sendgrid } from './Sendgrid';

export class Failover {
  mailers = [Mailgun, Sendgrid];

  constructor() {}

  async failOverSend(reqBody: ReqBody) {
    for (let i = 0; i < this.mailers.length; i++) {
      const mailer = this.mailers[i];
      try {
        return await this.send(new mailer(reqBody));
      } catch (err) {
        if (i === this.mailers.length - 1) {
          throw err;
        }
        console.log('Fail Over to the next mailer! => ', mailer);
      }
    }
  }

  async send(mailer: Mailer) {
    try {
      await mailer.send();
    } catch (err) {
      throw err;
    }
  }
}
