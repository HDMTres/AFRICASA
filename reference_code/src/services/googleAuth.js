const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const Logger = require("../utils/logger");  

const generateSecret = async (userEmail) => {
  try {
    Logger.info(`Début de la génération du secret pour l'utilisateur : ${userEmail}`);


    const secret = speakeasy.generateSecret({
      name: 'PSP_APP',
    });

    Logger.info(`Secret généré avec succès : ${secret.base32}`);


    const qrCodeUrl = `otpauth://totp/PSP_APP:${userEmail}?secret=${secret.base32}&issuer=YourApp`;
    Logger.info(`URL du QR code générée : ${qrCodeUrl}`);


    const dataUrl = await new Promise((resolve, reject) => {
      qrcode.toDataURL(qrCodeUrl, (err, data_url) => {
        if (err) {
          Logger.error("Erreur lors de la génération du QR code", err);
          reject(err);
        }
        resolve(data_url);
      });
    });

    Logger.info('QR code généré avec succès');
    return { secret: secret.base32, qrCodeUrl: dataUrl };
  } catch (error) {
    Logger.error("Erreur lors de la génération du secret :", error);
    throw error;
  }
};

const verifyGoogleAuthCode = async (user, code) => {
    const verified = speakeasy.totp.verify({
      secret: user.googleAuthenticatorSecret,
      encoding: 'base32',
      token: code
    });
  
    return verified;
  };

module.exports = { generateSecret,verifyGoogleAuthCode };

