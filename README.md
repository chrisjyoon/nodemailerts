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

## Dev notes
[Requirements]
 - create a service to send emails using two providers(mailgun and SendGrid).
 - should provide an abstraction and failover between two providers.
 - should provide one or more REST api to send an email.
 - no third party library should be used to interface with two providers.
 
