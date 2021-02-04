import { expect, assert } from 'chai';

import config from '../config/config';
import { checkEmails, checkInputEmpty } from '../utils/errorHandler';

describe('Env validation', () => {
  it('should have valid urls', (done) => {
    expect(config.mailgunBaseUrl).to.have.string('https://api.mailgun.net/v3/');
    expect(config.sendgridBaseUrl).to.equal('https://api.sendgrid.com/v3/mail/send');
    done();
  });
  it('should have api keys', (done) => {
    expect(config.mailgunKey).to.have.lengthOf.at.least(50);
    expect(config.sendgridKey).to.have.lengthOf.at.least(50);
    done();
  });
});

describe('Input validation', () => {
  it('should throw error when value is empty', (done) => {
    expect(checkInputEmpty.bind(checkInputEmpty, 'To', '')).to.throw(Error);
    done();
  });
  it('should throw error when email is not valid', (done) => {
    expect(checkEmails.bind(checkEmails, 'To', 'test.com')).to.throw(Error);
    done();
  });
})

