import axios from 'axios';
import config from '../config/config';
import { checkInputEmpty } from '../utils/errorHandler';
import { ReqBody, getApiParams } from '../utils/apiParams';

// send email
const sendMail = async (body: ReqBody) => {
  try {
    checkInputEmpty('api key', config.mailgunKey);
    checkInputEmpty('base url', config.mailgunBaseUrl);
  } catch (err) {
    throw err;
  }
  const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${apiKeyHeader}`
  };
  let params = {};
  try {
    params = getApiParams(
      `Chris Yoon <${config.mailgunFromEmail}>`,
      body
    );
  } catch (err) {
    throw err;
  }
  console.log('send via axios.. ' + config.mailgunBaseUrl, params);
  try {
    const resp = await axios({
      method: 'post',
      url: `${config.mailgunBaseUrl}`,
      headers,
      data: params
    });
    console.log(resp.status);
    console.log(resp.data);

    return resp.data.message;
  } catch (err) {
    console.error('err =', err);
    throw new Error(err.response.data.message);
  }
}

export default {
  sendMail,
}
