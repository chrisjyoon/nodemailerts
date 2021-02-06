# nodemailerts(node + express + typescript)
a simple nodejs service to send an email via mailgun or sendgrid

* demo : http://chrisyoon.ml:8000/

## Prerequisites
- You have to have node.js installed on your machine. (https://nodejs.org/en/)
- You have to set up your account for mailgun(https://www.mailgun.com/) and SendGrid(https://sendgrid.com/)
- Ideally you'd better have your own domain for sending email. DNS records setup would be needed for both services.
- You should have a valid email for the from email (account@your.domain)
- .env file : this file is not included in the git repo. You have to create your own .env file like:
(you can copy .env.example file)
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
[without Docker]
```
npm install (for the first time)
npm install -g yarn (in case yarn is not installed)
yarn start
```
[with Docker]
- install docker and docker-compose if you don't have : https://docs.docker.com/engine/install/
```
docker-compse up mailer
```
## How to test
[Curl]
```
curl --request POST \
--url localhost:8000/email \
--header 'Content-Type: application/json' \
--data '{"to": "toemail@toemail.com, otheremail@toemail.com", "cc": "ccemail@toemail.com", "subject": "from CURL", "content": "CURL is okay"}'
```

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
* cc and bcc are optional.
* email addresses should be separated with comma if there are more than one.

## Dev notes
[Requirements]
 - create a service to send emails using two providers(mailgun and SendGrid).
 - should provide an abstraction and failover between two providers.
 - should provide one or more REST api to send an email.
 - no third party library should be used to integrate with two providers.
 
[Libraries]
 - I chose node + express + typescript.
 - body-parser is essential to parse the client's post request parameters.
 - validator is used to check the enviroment values and the email addresses from the client.
 - axios is used only as a simple http client to send a post reqeust to the providers.

[Abstraction & Failover]
 - I used the class and interface both named 'Mailer' for the abstraction. 
 - Each two mail provider inherit the Mailer class and implements the Mailer interface.
 - So FailoverSender class doesn't need to have two separate variables for each mailer. Instead it has one mailer variable which can represent Mailgun or SendGrid class. If one of them failed then immediately switch to other one.
 - Email controller should only have FailoverSender class to send an email, it doesn't need to know about which mailer is being used.
 
