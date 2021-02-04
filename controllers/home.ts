import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    `Welcom to mailer service using Express + Typescript<p>
    Please check <a href="https://github.com/chrisjyoon/nodemailerts">README</a>`
  );
});

export default router;