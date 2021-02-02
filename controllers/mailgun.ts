import axios from 'axios';
import config from '../config/config';

// send email
const sendMail = async (body: any) => {
  const apiKeyHeader = Buffer.from(`api:${config.mailgunKey}`).toString('base64');
  const headers = {
    'Authorization': `Basic ${apiKeyHeader}`
  };
  const params = new URLSearchParams();
  params.append('from', `Chris Yoon <chrisjyoon@${config.mailgunDomain}>`);
  params.append('to', body.to)
  if (body.cc) {
    params.append('cc', body.cc);
  }
  if (body.bcc) {
    params.append('bcc', body.bcc);
  }
  params.append('subject', body.subject)
  params.append('text', body.text)
  try {
    const resp = await axios({
      method: 'post',
      url: `${config.mailgunBaseUrl}/messages`,
      headers,
      data: params
    });
    console.log(resp.status);
    console.log(resp.data);
  } catch (err) {
    console.error('error! : ', err);
  }
}

export default {
  sendMail,
}
