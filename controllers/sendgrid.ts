import axios from 'axios';
import config from '../config/config';
import { ReqBody, getApiParamsSendGrid } from '../utils/apiParams';
import { checkInputEmpty } from '../utils/errorHandler';

// send email
const sendMail = async (body: ReqBody) => {
  try {
    checkInputEmpty('api key', config.sendgridKey);
    checkInputEmpty('from email', config.sendgridFromEmail);
  } catch (err) {
    throw err;
  }
  console.log('body = ', body);
  console.log('api key = ', config.sendgridKey);
  const headers = {
    'Content-type': 'application/json',
    'Authorization': `Bearer ${config.sendgridKey}`
  };
  let params = {};
  try {
    params = getApiParamsSendGrid(
      config.sendgridFromEmail,
      body
    );
    console.log('[SENDGRID] params = ', params);
    console.log('[SENDGRID] send via axios.. ' + config.sendgridBaseUrl, params);
  try {
    const resp = await axios({
      method: 'post',
      url: `${config.sendgridBaseUrl}`,
      headers,
      data: params
    });
    console.log(resp.status);
    return 'SendGrid success';
  } catch (err) {
    if (err.response) {
      console.log(err.response.status);
      console.log(err.response.data);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    throw new Error(err.response.data.message);
  }
  } catch (err) {
    throw err;
  }
}

export default {
  sendMail
}