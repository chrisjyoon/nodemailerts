import { expect } from 'chai';
import config from '../config/config';
import { MailgunParam } from '../utils/MailgunParam';
import { SendgridParam } from '../utils/SendgridParam';
import { ReqBody } from '../utils/PostHelper';

const reqBody: ReqBody = {
  to: 'a@test.com',
  subject: 'test email',
  content: 'hello'
};

describe('Make post params', () => {
  it('should return url search params', (done) => {
    const mailgunParams = new MailgunParam(config.mailgunFromEmail, reqBody);
    const params = mailgunParams.makeParams() as URLSearchParams;
    const objParams = {
      from: params.get('from'),
      to: params.get('to'),
      subject: params.get('subject')
    };
    expect(objParams).to.own.property('from');
    expect(objParams).to.own.property('to');
    expect(objParams).to.own.property('subject');
    done();
  });
  it('should return string params', (done) => {
    const sendgridParams = new SendgridParam(config.sendgridFromEmail, reqBody);
    const params = sendgridParams.makeParams();
    const objParams = JSON.parse(params);
    console.log(objParams);
    expect(objParams).to.own.property('from');
    expect(objParams).to.own.property('personalizations');
    expect(objParams).to.own.property('subject');
    done();
  });
});
