import express from 'express';
import { PostHelper } from '../utils/PostHelper';
import { Mailer } from './mailer/Mailer';


const router = express.Router();

router.post('/email', async (req, res) => {
  console.log('email post called', req.body);
  try {
    const postHelper = new PostHelper();
    postHelper.checkEnv();
    const mailer = new Mailer();
    console.log(mailer);
    // const resp = await mailgun.sendMail(req.body);
    // res.status(200).json(resp);
    res.status(200).json(mailer);
  } catch (err) {
    console.log(`[${err.name}] ${err.message}`);
    if (err.name === 'InputNotValid') {
      res.json(err.message);
      return;
    }
    try {
      const mailer = new Mailer();
      console.log(mailer);
      // const resp = await sendgrid.sendMail(req.body);
      // res.status(200).json(resp);
    } catch (err) {
      console.log(`[${err.name}] ${err.message}`);
      res.json(err.message);
    }
  }
});


export default router;