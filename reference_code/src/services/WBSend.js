const wbm = require("wbm");
const dotenv = require("dotenv");
const Logger = require("../utils/logger");
const path = require("path");

const config = dotenv.config({
  path: path.join(__dirname, "../configs/.env"),
});


const sendWhatsAppMessage = async (to, message) => {
  try {
    
    await wbm.start();

    await wbm.sendTo(to, message);

    console.log("Message WhatsApp envoyé avec succès");
    Logger.info(`Message WhatsApp envoyé à ${to}`);

    await wbm.end();
  } catch (error) {
    Logger.error(`Erreur d'envoi du message WhatsApp: ${error}`);
    console.error("Erreur lors de l'envoi du message WhatsApp:", error);
    throw error;
  }
};

module.exports = sendWhatsAppMessage;
