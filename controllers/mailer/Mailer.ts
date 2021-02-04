import { ReqBody } from "../../utils/apiParams";
import { PostHelper } from "../../utils/postHelper";
import { Mailgun } from "./Mailgun";
import { Sendgrid } from "./Sendgrid";

export class Mailer {
  protected postHelper: PostHelper;

  constructor() {
    this.postHelper = new PostHelper();
  }
  async send(reqBody: ReqBody): Promise<string> {
    try {
      // const params = this.postHelper.makeParamsMailGun(reqBody);
      // console.log('params = ', params);
      // const mailGun = new Mailgun();
      // return await mailGun.send(params);
      const params = this.postHelper.makeParamsSendGrid(reqBody);
      console.log('params = ', params);
      const mailer = new Sendgrid();
      return await mailer.send(params);
    } catch (err) {
      throw err;
    }
  }
}