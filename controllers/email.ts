import express from 'express';
import mailgun from './mailgun';

const router = express.Router();

router.post('/email', (req, res) => {
  console.log('email post called', req.body);
  mailgun.sendMail(req.body);
  res.status(200).json("sent");
});


export default router;