import { expect } from 'chai';
import config from '../config/config';
import { MailgunParam } from '../utils/MailgunParam';
import { SendgridParam } from '../utils/SendgridParam';
import { ReqBody } from '../utils/PostHelper';
import { HttpHeader, post } from '../controllers/mailer/postman';
import { Mailgun } from '../controllers/mailer/Mailgun';
import { Sendgrid } from '../controllers/mailer/Sendgrid';
import { Failover } from '../controllers/mailer/Failover';

const reqBody: ReqBody = {
  to: 'chrisjyoon@gmail.com, jyma7503@gmail.com',
  subject: 'mocha chai failover test',
  content: 'hello3'
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
    console.log(objParams);
    
    expect(objParams).to.own.property('from');
    expect(objParams).to.own.property('to');
    expect(objParams).to.own.property('subject');
    done();
  });
  it('should return string params', (done) => {
    const sendgridParams = new SendgridParam(config.sendgridFromEmail, reqBody);
    const params = sendgridParams.makeParams();
    const objParams = JSON.parse(params);
    expect(objParams).to.own.property('from');
    expect(objParams).to.own.property('personalizations');
    expect(objParams).to.own.property('subject');
    done();
  });
});

describe('Mailer', () => {
  it('should have class memebers', (done) => {
    const mailgun = new Mailgun(reqBody);
    expect(mailgun).to.have.property('postHelper');
    expect(mailgun).to.have.property('headers');
    expect(mailgun).to.have.property('postParams');
    expect(mailgun).to.have.property('send');
    done();
  });
  it('should have class memebers', (done) => {
    const sendgrid = new Sendgrid(reqBody);
    expect(sendgrid).to.have.property('postHelper');
    expect(sendgrid).to.have.property('headers');
    expect(sendgrid).to.have.property('postParams');
    expect(sendgrid).to.have.property('send');
    done();
  });
})

describe('Failover', () => {
  it('should have two mailers', (done) => {
    const failover = new Failover();
    expect(failover).to.have.property('mailers');
    expect(failover.mailers).to.be.an('array').that.includes(Mailgun);
    expect(failover.mailers).to.be.an('array').that.includes(Sendgrid);
    done();
  });
  it('should failover to next', async () => {
    const failover = new Failover();
    // to test failover, deliberately give a wrong api key for mailgun
    config.mailgunKey += 'a';
    const resp = await failover.failOverSend(reqBody);
    // index should be 1
    expect(failover.index).to.equal(1);
  });
});