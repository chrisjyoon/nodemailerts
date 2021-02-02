import mailgun from 'mailgun-js';
import config from '../config/config';

// send email
const sendMail = async (body: any) => {
  console.log('mailgun key = ', config.mailgunKey);
  const DOMAIN = config.mailgunDomain;
  const mg = mailgun({ apiKey: config.mailgunKey, domain: DOMAIN });
  const data = {
    from: `Chris Yoon <chrisjyoon@${config.mailgunDomain}>`,
    to: 'chrisjyoon@gmail.com',
    subject: body.subject,
    text: 'Testing some Mailgun awesomness!'
  };
  console.log('send..');
  try {
    const resp = await mg.messages().send(data);
    console.log(resp);
  } catch (err) {
    console.error('error! : ', err);
  }
}

export default {
  sendMail,
}
