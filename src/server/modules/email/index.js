var nodemailer = require('nodemailer');
var creds = require('./credentials');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: creds.email,
    pass: creds.pass
  }
}));

var mailOptions = {
    from: creds.email,
    to: 'fulwejam000@mysbisd.org, hornfre000@mysbisd.org',
    subject: 'what up lol',
    text: ' what up lol '
}

