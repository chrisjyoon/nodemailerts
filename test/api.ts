import request from 'supertest';
import app from '../index';


describe('GET /', () => {
  it('should return 200 OK', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('POST /email', () => {
  let data = {
    to: 'chrisjyoon@gmail.com',
    subject: 'This is from supertest mocha',
    content: 'email sending test from mocha'
  };
  it('respond with 200 sent', (done) => {
    request(app)
      .post('/email')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-type', 'application/json; charset=utf-8')
      .expect(200, done);
  });
});