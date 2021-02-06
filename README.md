# nodemailerts
a simple nodejs service to send an email via mailgun or sendgrid

* demo : http://chrisyoon.ml:8000/

## Prerequisites
- You have to have node.js installed on your machine. (https://nodejs.org/en/)
- You have to set up your account for mailgun(https://www.mailgun.com/) and SendGrid(https://sendgrid.com/)
- Ideally you'd better have your own doamin for sending email. DNS records setup would be needed for both services.
- You should have a valid email for the from email (account@your.domain)
- .env file : this file is not included in the git repo. You have to create your own .env file like:
```
PORT=8000 // service port
# mailgun
MAILGUN_API_KEY=your mailgun api key
MAILGUN_DOMAIN=yourdomain
MAILGUN_FROM_EMAIL=account@yourdomain
# sendgrid
SENDGRID_API_KEY=your SendGrid api key
SENDGRID_FROM_EMAIL=account@yourdomain
```


## Install & run

```
npm install (for the first time)
npm install -g yarn (in case yarn is not installed)
yarn start
```
## How to test
[Curl]
```
curl --request POST \
--url localhost:8000/email \
--header 'Content-Type: application/json' \
--data '{"to": "toemail@toemail.com, otheremail@toemail.com", "subject": "from CURL", "content": "CURL is okay"}'
```
* cc and bcc are optional

[Postman]
- make a new post request and set the url as 'localhost:8000/email'
- select body tab and choose raw & JSON type and put body like this.
```
{
    "subject": "new aws dns",
    "to": "toemail@toemail.com, otheremail@toemail.com",
    "cc": "cc@toemail.com",
    "bcc": "bcc@toemail.com",
    "content": "this is test email from Chris to test CC and Bcc!"
}
```
* cc and bcc are optional

## Dev notes
[Requirements]
 - create a service to send emails using two providers(mailgun and SendGrid).
 - should provide an abstraction and failover between two providers.
 - should provide one or more REST api to send an email.
 - no third party library should be used to integrate with two providers.
 
