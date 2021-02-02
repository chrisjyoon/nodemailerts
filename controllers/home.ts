import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log(process.env.PORT);
  res.send('Welcom to mailer service using Express + Typescript<br>Please check README.md');
});

export default router;