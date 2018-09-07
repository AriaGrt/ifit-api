const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const path = require('path')

router.get('*', (req, res, next) => {
  res.sendFile('index.html')
})

router.post('/', (req, res, next) => {
  let smtpConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: 'grt.aria@gmail.com',
        pass: "ktozonedkrash"
    }
  };

  let transporter = nodemailer.createTransport(smtpConfig)

  transporter.verify(function(error, success) {
     if (error) {
          console.log(error);
     } else {
          console.log('Server is ready to take our messages');
     }
  });

  let message = {
    from: 'grt.aria@gmail.com',
    // to: 'infos@ifit-trainer.fr',
        to: 'Ifit.personal.trainer.pro@gmail.com',
    subject: 'Nouvelle demande de prise en contact',
    html: '<p>Un utilisateur cherche à vous rencontrer</p>' +
          '<p>Nom : ' + req.body.name + '</p>' +
          '<p>Email : ' + req.body.email + '</p>' +
          '<h5>Subject : ' + req.body.subject + '</5>' +
          '<p>Message : ' + req.body.message + '</p>'
  };

  transporter.sendMail(message, function(err){
    if(err) throw err;
    res.sendStatus(200);
  })
})

module.exports = router;
