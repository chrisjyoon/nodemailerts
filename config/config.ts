import dotenv from 'dotenv';

dotenv.config();

const mailgunBaseUrl = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}`;

export default {
  port: process.env.PORT,
  mailgunKey: process.env.MAILGUN_CREDENTIAL as string,
  mailgunDomain: process.env.MAILGUN_DOMAIN as string,
  mailgunBaseUrl,
};
