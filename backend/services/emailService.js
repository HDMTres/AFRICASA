const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = this.createTransporter();
    this.templatesPath = path.join(__dirname, '../templates');
  }

  createTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false, // true pour port 465, false pour autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async loadTemplate(templateName, variables = {}) {
    try {
      const templatePath = path.join(this.templatesPath, `${templateName}.html`);
      let html = fs.readFileSync(templatePath, 'utf8');

      // Remplacer les variables dans le template
      Object.keys(variables).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        html = html.replace(regex, variables[key]);
      });

      return html;
    } catch (error) {
      Logger.error('Erreur lors du chargement du template email', {
        type: 'email',
        template: templateName,
        error: error.message
      });
      return null;
    }
  }

  async sendEmail(to, subject, templateName, variables = {}) {
    try {
      // Vérifier que le transporteur est configuré
      if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('Configuration SMTP manquante');
      }

      let html;
      if (templateName) {
        html = await this.loadTemplate(templateName, variables);
        if (!html) {
          throw new Error(`Template ${templateName} non trouvé`);
        }
      } else {
        html = variables.html || variables.message || '';
      }

      const mailOptions = {
        from: {
          name: 'AFRICASA',
          address: process.env.SMTP_USER
        },
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);

      Logger.info('Email envoyé avec succès', {
        type: 'email',
        to,
        subject,
        messageId: result.messageId
      });

      return {
        success: true,
        messageId: result.messageId
      };
    } catch (error) {
      Logger.error('Erreur lors de l\'envoi d\'email', {
        type: 'email',
        to,
        subject,
        error: error.message
      });
      
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Templates spécifiques
  async sendWelcomeEmail(user) {
    const variables = {
      fullName: user.fullName,
      email: user.email,
      loginUrl: `${process.env.FRONTEND_URL}/login`,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@africasa.com'
    };

    return await this.sendEmail(
      user.email,
      'Bienvenue sur AFRICASA !',
      'welcome',
      variables
    );
  }

  async sendEmailVerification(user, verificationToken) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    
    const variables = {
      fullName: user.fullName,
      verificationUrl,
      expiryTime: '24 heures'
    };

    return await this.sendEmail(
      user.email,
      'Vérifiez votre adresse email - AFRICASA',
      'email-verification',
      variables
    );
  }

  async sendPasswordReset(user, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    
    const variables = {
      fullName: user.fullName,
      resetUrl,
      expiryTime: '1 heure',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@africasa.com'
    };

    return await this.sendEmail(
      user.email,
      'Réinitialisation de votre mot de passe - AFRICASA',
      'password-reset',
      variables
    );
  }

  async send2FACode(user, code) {
    const variables = {
      fullName: user.fullName,
      code,
      expiryTime: '10 minutes',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@africasa.com'
    };

    return await this.sendEmail(
      user.email,
      'Code de vérification - AFRICASA',
      '2fa-code',
      variables
    );
  }

  async sendContactForm(formData) {
    const variables = {
      name: formData.name,
      email: formData.email,
      phone: formData.phoneNumber || 'Non fourni',
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Douala' })
    };

    // Envoyer à l'équipe AFRICASA
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@africasa.com';
    
    return await this.sendEmail(
      adminEmail,
      `Nouveau message de contact: ${formData.subject}`,
      'contact-form',
      variables
    );
  }

  async sendPropertyInquiry(inquiry) {
    const variables = {
      inquirerName: inquiry.name,
      inquirerEmail: inquiry.email,
      inquirerPhone: inquiry.phone || 'Non fourni',
      propertyTitle: inquiry.propertyTitle,
      propertyId: inquiry.propertyId,
      message: inquiry.message,
      timestamp: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Douala' })
    };

    // Envoyer à l'agent responsable
    return await this.sendEmail(
      inquiry.agentEmail,
      `Nouvelle demande pour: ${inquiry.propertyTitle}`,
      'property-inquiry',
      variables
    );
  }

  async sendAccountLocked(user, lockDuration) {
    const variables = {
      fullName: user.fullName,
      lockDuration,
      supportEmail: process.env.SUPPORT_EMAIL || 'support@africasa.com'
    };

    return await this.sendEmail(
      user.email,
      'Compte temporairement verrouillé - AFRICASA',
      'account-locked',
      variables
    );
  }

  async sendLoginNotification(user, loginInfo) {
    const variables = {
      fullName: user.fullName,
      loginTime: new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Douala' }),
      ipAddress: loginInfo.ip,
      userAgent: loginInfo.userAgent,
      location: loginInfo.location || 'Inconnue',
      supportEmail: process.env.SUPPORT_EMAIL || 'support@africasa.com'
    };

    return await this.sendEmail(
      user.email,
      'Nouvelle connexion à votre compte - AFRICASA',
      'login-notification',
      variables
    );
  }

  // Méthode pour tester la configuration email
  async testConnection() {
    try {
      await this.transporter.verify();
      Logger.info('Configuration email valide');
      return { success: true, message: 'Configuration email valide' };
    } catch (error) {
      Logger.error('Configuration email invalide', { error: error.message });
      return { success: false, error: error.message };
    }
  }
}

// Export singleton
module.exports = new EmailService();
