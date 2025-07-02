const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const Logger = require('../utils/logger');

class TwoFactorAuthService {
  /**
   * Génère un secret pour Google Authenticator
   * @param {string} userEmail - Email de l'utilisateur
   * @param {string} serviceName - Nom du service (AFRICASA)
   * @returns {Object} Secret et URL du QR code
   */
  static async generateSecret(userEmail, serviceName = 'AFRICASA') {
    try {
      const secret = speakeasy.generateSecret({
        name: `${serviceName} (${userEmail})`,
        issuer: serviceName,
        length: 32
      });

      // Générer le QR code
      const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

      Logger.info('Secret 2FA généré', {
        type: 'auth',
        action: '2fa_secret_generated',
        userEmail
      });

      return {
        secret: secret.base32,
        qrCodeUrl,
        manualEntryKey: secret.base32,
        issuer: serviceName
      };
    } catch (error) {
      Logger.error('Erreur lors de la génération du secret 2FA', {
        type: 'auth',
        error: error.message,
        userEmail
      });
      throw new Error('Impossible de générer le secret 2FA');
    }
  }

  /**
   * Vérifie un token 2FA
   * @param {string} token - Token à vérifier
   * @param {string} secret - Secret de l'utilisateur
   * @param {number} window - Fenêtre de tolérance (défaut: 2)
   * @returns {boolean} True si le token est valide
   */
  static verifyToken(token, secret, window = 2) {
    try {
      const verified = speakeasy.totp.verify({
        secret,
        encoding: 'base32',
        token,
        window
      });

      if (verified) {
        Logger.info('Token 2FA vérifié avec succès', {
          type: 'auth',
          action: '2fa_token_verified'
        });
      } else {
        Logger.warn('Token 2FA invalide', {
          type: 'auth',
          action: '2fa_token_invalid'
        });
      }

      return verified;
    } catch (error) {
      Logger.error('Erreur lors de la vérification du token 2FA', {
        type: 'auth',
        error: error.message
      });
      return false;
    }
  }

  /**
   * Génère un code temporaire pour SMS/Email
   * @param {number} length - Longueur du code (défaut: 6)
   * @returns {string} Code temporaire
   */
  static generateTemporaryCode(length = 6) {
    const digits = '0123456789';
    let code = '';
    
    for (let i = 0; i < length; i++) {
      code += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return code;
  }

  /**
   * Calcule l'expiration d'un code temporaire
   * @param {number} minutes - Durée de validité en minutes (défaut: 10)
   * @returns {Date} Date d'expiration
   */
  static getCodeExpiry(minutes = 10) {
    return new Date(Date.now() + minutes * 60 * 1000);
  }

  /**
   * Vérifie si un code temporaire est expiré
   * @param {Date} expiryDate - Date d'expiration
   * @returns {boolean} True si expiré
   */
  static isCodeExpired(expiryDate) {
    return new Date() > expiryDate;
  }

  /**
   * Formate un code pour l'affichage (ex: 123456 -> 123 456)
   * @param {string} code - Code à formater
   * @returns {string} Code formaté
   */
  static formatCode(code) {
    if (code.length === 6) {
      return `${code.slice(0, 3)} ${code.slice(3)}`;
    }
    return code;
  }

  /**
   * Génère des codes de sauvegarde
   * @param {number} count - Nombre de codes (défaut: 10)
   * @returns {Array<string>} Codes de sauvegarde
   */
  static generateBackupCodes(count = 10) {
    const codes = [];
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    
    for (let i = 0; i < count; i++) {
      let code = '';
      for (let j = 0; j < 8; j++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      // Format: xxxx-xxxx
      codes.push(`${code.slice(0, 4)}-${code.slice(4)}`);
    }
    
    Logger.info('Codes de sauvegarde 2FA générés', {
      type: 'auth',
      action: '2fa_backup_codes_generated',
      count
    });
    
    return codes;
  }

  /**
   * Valide le format d'un token 2FA
   * @param {string} token - Token à valider
   * @returns {boolean} True si le format est valide
   */
  static isValidTokenFormat(token) {
    // Le token doit être composé de 6 chiffres
    return /^\d{6}$/.test(token);
  }

  /**
   * Calcule le temps restant avant l'expiration d'un token TOTP
   * @returns {number} Secondes restantes
   */
  static getTimeRemaining() {
    const now = Math.floor(Date.now() / 1000);
    const step = 30; // Les tokens TOTP changent toutes les 30 secondes
    return step - (now % step);
  }
}

module.exports = TwoFactorAuthService;
