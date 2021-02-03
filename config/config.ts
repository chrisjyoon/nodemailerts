import dotenv from 'dotenv';

dotenv.config();

const mailgunBaseUrl = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;
const sendgridBaseUrl = 'https://api.sendgrid.com/v3/mail/send';

export default {
  port: process.env.PORT,
  mailgunKey: process.env.MAILGUN_API_KEY as string,
  mailgunDomain: process.env.MAILGUN_DOMAIN as string,
  mailgunBaseUrl,
  mailgunFromEmail: process.env.MAILGUN_FROM_EMAIL as string,
  sendgridKey: process.env.SENDGRID_API_KEY as string,
  sendgridBaseUrl,
  sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL as string,
};
