const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const UserStore = require('../data/userstore');
const nodemailer = require('nodemailer');
const config = require('config');

const SITE_EMAIL = config.get('Mailer.email');
const EMAIL_PASSWORD = config.get('Mailer.password');

var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
      user: SITE_EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

router.post("/contactme", [
    body('email').isEmail(),
    body('subject').not().isEmpty(),
    body('text').not().isEmpty()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json( { errors: errors.array() });
    }

    var mail = { 
        from: SITE_EMAIL,
        to: SITE_EMAIL,
        subject: req.body.subject,
        text: req.body.text
    }

    try {
        var result = await transporter.sendMail(mail);
        res.status(200).end();
    } catch(err) {
        console.log("Contact me e-mail failed. Error: "+err);
        res.status(500).end();
    }
});

module.exports = router;