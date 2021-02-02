import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mailgunKey: process.env.MAILGUN_CREDENTIAL as string,
  mailgunDomain: process.env.MAILGUN_DOMAIN as string
}