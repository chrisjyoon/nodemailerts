import axios from 'axios';
import config from '../config/config';
import { ReqBody, getApiParams } from '../utils/apiParams';

// send email
const sendMail = async (body: ReqBody) => {
  const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
  const headers = {
    'Content-type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${apiKeyHeader}`
  };
  let params = {};
  try {
    params = getApiParams(
      `Chris Yoon <chrisjyoon@${config.mailgunDomain}>`,
      body
    );
  } catch (err) {
    throw err;
  }
  try {
    const resp = await axios({
      method: 'post',
      url: `${config.mailgunBaseUrl}/messages`,
      headers,
      data: params
    });
    console.log(resp.status);
    return resp.data.message;
  } catch (err) {
    console.error('err =', err.name);
    throw new Error(err.response.data.message);
  }
}

export default {
  sendMail,
}
