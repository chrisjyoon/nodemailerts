import { CustomParam } from "./CustomParam";
import { ReqBody } from "./PostHelper";

export class MailgunParam extends CustomParam {
  constructor(from: string, reqBody: ReqBody) {
    super(from, reqBody);
  }

  makeParams(): URLSearchParams {
    const params = new URLSearchParams();
    params.append('from', this.from);
    params.append('to', this.to);
    if (this.cc !== undefined && this.isValid(this.cc)) {
      params.append('cc', this.cc);
    }
    if (this.bcc !== undefined && this.isValid(this.bcc)) {
      params.append('bcc', this.bcc);
    }
    params.append('subject', this.subject);
    params.append('text', this.content);

    return params;
  }
}