import express from 'express';
import mailgun from './mailgun';

const router = express.Router();

router.post('/email', async (req, res) => {
  console.log('email post called', req.body);
  try {
    const resp = await mailgun.sendMail(req.body);
    res.status(200).json(resp);
  } catch (err) {
    console.log('err name = ', err.name);
    res.json(err.message);
  }
});


export default router;