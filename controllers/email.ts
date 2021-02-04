import express from 'express';
import { PostHelper } from '../utils/PostHelper';
import { Mailer } from './mailer/Mailer';


const router = express.Router();

router.post('/email', async (req, res) => {
  console.log('email post called', req.body);
  try {
    const postHelper = new PostHelper();
    postHelper.checkEnv();
    postHelper.checkInput(req.body);
    const mailer = new Mailer();
    const resp = await mailer.send(req.body);
    res.status(200).json(resp);
  } catch (err) {
    console.log(`[${err.name}] ${err.message}`);
    if (err.name === 'InputNotValid') {
      res.json(err.message);
      return;
    }
  }
});


export default router;