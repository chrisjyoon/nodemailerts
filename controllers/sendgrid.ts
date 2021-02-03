import axios from 'axios';
import config from '../config/config';
import { ReqBody, getApiParams } from '../utils/apiParams';
import { checkInputEmpty } from '../utils/errorHandler';

// send email
const sendMail = async (body: ReqBody) => {
  try {
    checkInputEmpty('api key', config.sendgridKey);
    checkInputEmpty('base url', config.sendgridBaseUrl);
  } catch (err) {
    throw err;
  }
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