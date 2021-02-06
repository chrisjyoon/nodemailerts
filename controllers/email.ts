import express from 'express';
import { PostHelper } from '../utils/PostHelper';
import { FailoverSender } from './mailer/FailoverSender';

export const email = express.Router();

email.post('/email', async (req, res) => {
  try {
    const postHelper = new PostHelper();
    postHelper.checkEnv();
    postHelper.checkInput(req.body);

    const failover = new FailoverSender();
    const resp = await failover.failOverSend(req.body);
    res.status(resp.status).json(`[${resp.status}] ${resp.message}`);
  } catch (err) {
    res.json(`[${err.name}] ${err.message}`);
  }
});