// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs\

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

//SENDGRID_API_KEY is in environemntal variables 


function email(to, subject, text)
{
const msg = {
  to: to,
  from: 'WhatverWeDecideToCallThis@ThisDoesntExist.com',
  subject: subject,
  text: text,
  html: text
};

sgMail.send(msg);
}

module.exports = email;