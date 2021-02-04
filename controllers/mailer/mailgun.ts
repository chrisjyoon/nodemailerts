import config from '../../config/config';
import { ReqBody, getApiParamsMailGun } from '../../utils/apiParams';
import postman from './postman';
import { HttpHeader } from './postman';
import { inputValidate } from '../../utils/PostHelper';

// send email
const sendMail = async (body: ReqBody) => {
  let params : string | URLSearchParams;
  try {
    params = inputValidate(body, getApiParamsMailGun);
  } catch (err) {
    throw err;
  }

  try {
    const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
    const headers = <HttpHeader>{
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${apiKeyHeader}`
    };
    console.log(headers, params);
    postman.post(config.mailgunBaseUrl, headers, params);
  } catch (err) {
    throw err;
  }
}

export default {
  sendMail,
}
