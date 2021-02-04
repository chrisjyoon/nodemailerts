import express from 'express';
import { PostHelper } from '../utils/PostHelper';
import { Failover } from './mailer/Failover';

const router = express.Router();

router.post('/email', async (req, res) => {
  try {
    const postHelper = new PostHelper();
    postHelper.checkEnv();
    postHelper.checkInput(req.body);

    const failover = new Failover();
    const resp = await failover.failOverSend(req.body);
    res.status(200).json(resp);
  } catch (err) {
    res.json(`[${err.name}] ${err.message}`);
  }
});


export default router;