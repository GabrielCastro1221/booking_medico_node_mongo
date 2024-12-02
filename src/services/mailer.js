const nodemailer = require("nodemailer");
const configObject = require("../config/env.config");

class EmailManager {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: configObject.mailer.email_service,
      auth: {
        user: configObject.mailer.mailer_user,
        pass: configObject.mailer.mailer_pass,
      },
    });
  }
  

}

module.exports = EmailManager;
