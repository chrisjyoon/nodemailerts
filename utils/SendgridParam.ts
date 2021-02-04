import { CustomParam } from "./CustomParam";
import { ReqBody } from "./PostHelper";

interface Recipients {
  to: object[];
  cc?: object[];
  bcc?: object[];
}

export class SendgridParams extends CustomParam  {
  constructor(from: string, reqBody: ReqBody) {
    super(from, reqBody);
  }

  makeParams(): string {
    const params = {
      personalizations: [] as object[],
      from: { email: this.from },
      subject: this.subject,
      content: [
        {
          type: 'text/plain',
          value: this.content,
        },
      ],
    };
    try {
      const recipients = {} as Recipients;
      recipients.to = this.to.split(',').map(email => ({email: email.trim()}));
      if (this.isValid(this.cc)) {
        recipients.cc = this.cc.split(',').map(email => ({email: email.trim()}));
      }
      if (this.isValid(this.bcc)) {
        recipients.bcc = this.bcc.split(',').map(email => ({email: email.trim()}));
      }
      params.personalizations.push(recipients);
    } catch (err) {
      throw err;
    }
    return JSON.stringify(params);
  }
}