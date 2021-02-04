import config from '../../config/config';
import { ReqBody, getApiParamsSendGrid } from '../../utils/apiParams';
import { inputValidate } from '../../utils/PostHelper';
import postman from './postman';
import { HttpHeader } from './postman';

// send email
const sendMail = async (body: ReqBody) => {
  let params: string | URLSearchParams;
  try {
    params = inputValidate(body, getApiParamsSendGrid);
  } catch (err) {
    throw err;
  }

  try {
    const headers = <HttpHeader>{
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.sendgridKey}`
    };
    postman.post(config.sendgridBaseUrl, headers, params);
  } catch (err) {
    throw err;
  }
}

export default {
  sendMail
}