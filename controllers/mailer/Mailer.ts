import { ReqBody, PostHelper } from "../../utils/PostHelper";
import { HttpHeader } from "./postman";

export interface Mailer {
  headers: HttpHeader;
  send(): Promise<string>;
}
export class Mailer {
  protected postHelper: PostHelper;

  constructor() {
    this.postHelper = new PostHelper();
  }
}
