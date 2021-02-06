import express from 'express';
import { PostHelper } from '../utils/PostHelper';
import { FailoverSender } from './mailer/FailoverSender';

export const demo = express.Router();

demo.post('/submit', async (req, res) => {
  try {
    const postHelper = new PostHelper();
    postHelper.checkEnv();
    postHelper.checkInput(req.body);

    const failover = new FailoverSender();
    await failover.failOverSend(req.body);
    res.redirect('/');
  } catch (err) {
    res.send(`
      [${err.name}] ${err.message}<br>
      <a href="/">Back</a>
    `);
  }
});