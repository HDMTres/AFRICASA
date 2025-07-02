const twilio = require("twilio");
const dotenv = require("dotenv");
const Logger = require("../utils/logger");
const path = require('path');


const config = dotenv.config({
  path: path.join(__dirname, '../configs/.env') 
});


const accountSid = config.parsed.TWILIO_ACCOUNT_SID; 
const authToken = config.parsed.TWILIO_AUTH_TOKEN; 
const twilioPhoneNumber = config.parsed.TWILIO_PHONE_NUMBER;


const client = twilio(accountSid, authToken);

const sendSMS = async (to, message) => {
  try {
    console.log("config", config);
    console.log("twilioPhoneNumber", twilioPhoneNumber);


    const response = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: to,
    });

    console.log("SMS envoyé avec succès:", response.sid);
    Logger.info(`SMS envoyé à ${to} et la réponse est ${response.sid}`);
    return response;
  } catch (error) {
    Logger.error(`Erreur d'envoi de SMS: ${error}`);
    console.error("Erreur lors de l'envoi du SMS:", error);
    throw error;
  }
};

module.exports = sendSMS;