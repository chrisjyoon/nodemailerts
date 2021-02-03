import axios from 'axios';
import config from '../config/config';
import { ReqBody, getApiParams } from '../utils/apiParams';

// send email
const sendMail = async (body: ReqBody) => {
  console.log('body = ', body);
  console.log('api key = ', config.sendgridKey);
  let params = {};
  try {
    params = getApiParams(
      config.sendgridFromEmail,
      body
    );
  } catch (err) {
    throw err;
  }
}

export default {
  sendMail
}