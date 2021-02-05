import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(
    `
    <h3>Welcome to mailer service using Express + Typescript Demo</h3>
    Please check <a href="https://github.com/chrisjyoon/nodemailerts">README</a>
    <p>
    <form action="/email/" method="post">
      <div style="display: flex;flex-direction: column">
        <div style="display: flex;justify-content: end">
          <label for="email" style="width:100px">Email: </label>
          <input id="email" type="email" name="to" required style="width:200px"><br>
        </div>
        <div style="display: flex;justify-content: end">
          <label for="subject" style="width:100px">Subject: </label>
          <input id="subject" type="text" name="subject" value="node express mailer test"
            required style="width:200px">
        </div>
      </div>
      <p></p>
        <input type="hidden" name="content" value="Hello email test">
        <input type="submit" value="OK">
    </form>
    <p>This will send simple test email to above email address
    using Mailgun or Sendgrid api
    `
  );
});

export default router;