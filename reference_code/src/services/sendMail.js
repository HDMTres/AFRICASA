const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const Logger = require("../utils/logger");
const path = require('path');
const { pathToFileURL } = require("url");
const { text } = require("express");
const fs = require('fs');

const config = dotenv.config({
  path: path.join(__dirname, '../configs/.env') 
});



console.log({
  config:config,
  host: config.parsed.SMTP_SERVICE,
  port: config.parsed.SMTP_PORT,
  user: config.parsed.SMTP_EMAIL,
  pass: config.parsed.SMTP_PASSWORD,
});

const transporter = nodemailer.createTransport({
  host: config.parsed.SMTP_SERVICE, 
  port: parseInt(config.parsed.SMTP_PORT, 10),
  secure: false, 
  auth: {
    user: config.parsed.SMTP_EMAIL, 
    pass: config.parsed.SMTP_PASSWORD, 
  },
  authMethod: 'LOGIN',
  tls: {
    rejectUnauthorized: false, 
  },
  debug: true,
  logger: true,
  dnsCache: false,
});

const sendEmail = async (to, subject, templateName, templateData) => {
  try {

    const templatePath = path.join(__dirname, `../../public/Templates/${templateName}.html`)
    console.log("Chemin du template :", templatePath);
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");
    console.log("Template chargé avec succès");

    for (const [key, value] of Object.entries(templateData)) {
      htmlTemplate = htmlTemplate.replace(new RegExp(`{{${key}}}`, "g"), value);
    }
    console.log("Placeholders remplacés");
    const mailOptions = {
      from: config.parsed.SMTP_EMAIL,
      to,
      subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    Logger.info(`Email envoyé à ${to} avec l'ID: ${info.messageId}`);
  } catch (error) {
    Logger.error(`Erreur d'envoi d'email: ${error}`);
  }
};

module.exports = sendEmail;