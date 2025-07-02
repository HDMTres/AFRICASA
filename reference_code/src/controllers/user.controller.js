const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const Logger = require('../utils/logger.js');

const User = require("../Models/User.model.js");
const { ROLES } = require("../middlewares/authorize.js");
const  sendSMS  = require("../services/sendSms.js");
// const { sendEmail } = require("../services/sendMail.js");
const sendEmail = require("../services/sendMail.js");
const sendWhatsAppMessage = require('../services/WBSend.js');
const { generateSecret } = require('../services/googleAuth.js');


const failedLoginAttempts = new Map(); 
const otpCache = new Map(); 


const register = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      password,
      securityInfo,
      role,
      gender,
      birthDate,
      nationality,
      residence,
      identityDocument,
      professionalInfo,
      financialInfo,
      consents
    } = req.body;


    if (!fullName || !email || !phoneNumber || !password || 
      !securityInfo?.question || !securityInfo?.answer ||
      !gender || !birthDate || !nationality || 
      !identityDocument?.type || !identityDocument?.number || !identityDocument?.expirationDate ||
      !professionalInfo?.profession || !professionalInfo?.sector || !professionalInfo?.monthlyIncome ||
      !financialInfo?.accountType || !financialInfo?.bankAccountNumber || 
      !financialInfo?.mobileMoneyOperator || !financialInfo?.mobileMoneyNumber ||
      !consents?.termsAccepted || !consents?.dataProcessingConsent || !consents?.feesAcceptance) {
    return res.status(400).json({ message: "Tous les champs obligatoires doivent être remplis." });
  }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Format d'email invalide." });
    }
   
    const existingUser = await User.findOne({
      $or: [
        { email }, 
        { phoneNumber },
        { "financialInfo.bankAccountNumber": financialInfo.bankAccountNumber },
        { "financialInfo.mobileMoneyNumber": financialInfo.mobileMoneyNumber }
      ],
    });


      if (existingUser) {
      return res.status(400).json({ message: "Email, téléphone ou compte bancaire déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(securityInfo?.answer , 10);
    const genderFormatted = gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

    const newUser = new User({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      securityInfo: {
        question: securityInfo.question,
        answer: hashedAnswer
      },
      role,
      gender: genderFormatted,
      birthDate,
      nationality,
      residence,
      identityDocument,
      professionalInfo,
      financialInfo,
      consents,
      isActive: false,
    });

    const activationToken = newUser.generateActivationToken();

    await newUser.save();
    const activateUrl = `http://localhost:${process.env.PORT}/api/auth/activate/${activationToken}`


    // simuler l'envoi d'un email d'activation
    sendEmail(
      newUser.email, 
      "Veuillez confirmer votre compte ", 
      "comfirmMail",
      {
        fulname:newUser.fullName,
        confirmmailurl:activateUrl
      }
    );

    console.log(
      `Lien d'activation: http://localhost:${process.env.PORT}/api/auth/activate/${activationToken}`
    );

    res.status(201).json({
      message: "Inscription réussie. Veuillez vérifier votre email pour activer votre compte.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);

    // Gestion des erreurs de duplication MongoDB
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      let message = `Erreur: La valeur de '${duplicateField}' est déjà utilisée.`;

      if (duplicateField === "email") {
        message = "Cet email est déjà enregistré.";
      } else if (duplicateField === "phoneNumber") {
        message = "Ce numéro de téléphone est déjà utilisé.";
      } else if (duplicateField === "financialInfo.bankAccountNumber") {
        message = "Ce numéro de compte bancaire est déjà utilisé.";
      } else if (duplicateField === "financialInfo.mobileMoneyNumber") {
        message = "Ce numéro de mobile money est déjà utilisé.";
      }

      return res.status(400).json({ message });
    }

    // Gestion des erreurs internes
    next(error);
  }
};



const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      Logger.warn(`Tentative d'inscription avec un email existant: ${email}`);
      return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = bcrypt.hash(password, 10);

    const newAdmin = new User({
      fullName,
      email,
      password: hashedPassword,
      role: ROLES.ADMIN,
      isActive: true 
    });

    await newAdmin.save();
    Logger.info(`Nouvel administrateur créé: ${email}`);
    
    res.status(201).json({ message: 'Administrateur enregistré avec succès.' });
  } catch (error) {
    Logger.error(`Erreur lors de l'inscription admin: ${error.message}`);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

const activateAccount = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    if (user.isActive) {
      return res.status(400).json({ message: "Compte déjà activé." });
    }

    user.isActive = true;
    await user.save();

    res.status(200).json({
      message:
        "Compte activé avec succès. Vous pouvez maintenant vous connecter.",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Lien d’activation invalide ou expiré." });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email});
    if (!user) {
      return res.status(400).json({ message: "Cette utilisateur n'existe pas" });
    }

    if (!user.isActive) {
      return res.status(403).json({ message: "Compte non activé. Veuillez vérifier votre email." });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // console.log(isMatch)
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    // }

    // Vérifier si la 2FA est activée
    if (!user.is2FAEnabled) {
      // Si la 2FA est désactivée, générer directement un token JWT
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: `Bienvenue ${user.fullName}`,
        token,
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      });
    }

    return res.status(200).json({
      message: "Connexion réussie, veuillez procéder à la validation 2FA.",
      require2FA: true,
      userId: user._id,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const verify2FactorAuth = async (req, res) =>{
  const { userId, method } = req.body;
    
  const user = await User.findById(userId);
  if (!user) {
    return res.status(400).json({ message: "Utilisateur introuvable" });
  }

   if (method === "google_authenticator") {
    if (user.twoFactorSecret === null) {
      const { secret, qrCodeUrl } = await generateSecret(user.email);  
      user.twoFactorSecret = secret;  
      await user.save();
      
      return res.status(200).json({
        secret: secret, // Secret to use in Google Authenticator
        qrCodeUrl: qrCodeUrl,  // Send back the QR code URL for scanning
        message: "Veuillez entrer le code de vérification de Google Authenticator.",
        require2FA: true,
        userId: user._id,
        method: "google_authenticator",
      });
    }
    
    
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.twoFactorCode = verificationCode;
  user.twoFactorExpires = Date.now() + 10 * 60 * 1000; // Expire en 10 minutes
  await user.save();

  if (!['email', 'sms', 'whatsapp', 'telegram', 'google_authenticator'].includes(method)) {
    return res.status(400).json({ message: "Méthode de 2FA invalide." });
  }
  switch (method) {
    case 'email':
      await  sendEmail(
        user.email,
        "Vérification de sécurité", 
        "verifyLogin",
        {
          appName: "PSP_APP",
          code:verificationCode
        }
      );
      break;
    case 'sms':
      await sendSMS(user.phoneNumber, `Votre code de vérification est : ${verificationCode}`);
      break;
    case 'whatsapp':
      await sendWhatsAppMessage(user.phoneNumber, `Votre code de vérification est : ${verificationCode}`);
      break;
    case 'telegram':
      await sendTelegram(user.telegramId, `Votre code de vérification est : ${verificationCode}`);
      break;
    case 'google_authenticator':
      break;
    default:
      throw new Error("Méthode de 2FA non reconnue.");
  }

  res.status(200).json({
    message: "Code de vérification envoyé.",
    require2FA: true,
    userId: user._id,
    method: user.preferred2FAMethod,
  });
}

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const MAX_ATTEMPTS = 5;
    const BLOCK_DURATION = 15 * 60 * 1000; 
    

    const failedAttempts = failedLoginAttempts.get(email) || { count: 0, timestamp: null };
    if (failedAttempts.count >= MAX_ATTEMPTS && Date.now() - failedAttempts.timestamp < BLOCK_DURATION) {
      Logger.warn(`Compte admin temporairement bloqué: ${email}`);
      return res.status(403).json({ message: 'Trop de tentatives échouées. Veuillez réessayer plus tard.' });
    }
    

    const admin = await User.findOne({ email, role: ROLES.ADMIN });
    if (!admin) {
      Logger.warn(`Tentative de connexion admin échouée (email inconnu): ${email}`);
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }


    const isMatch = bcrypt.compare(password, admin.password);
    if (!isMatch) {
      Logger.warn(`Tentative de connexion admin échouée (mot de passe incorrect): ${email}`);
      failedLoginAttempts.set(email, { count: failedAttempts.count + 1, timestamp: Date.now() });
      return res.status(400).json({ message: 'Identifiants invalides.' });
    }


    failedLoginAttempts.delete(email);
    

    const otp = Math.floor(100000 + Math.random() * 900000); 
    otpCache.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });
    

    await sendEmail(email, 'Code de vérification', `Votre code de vérification est : ${otp}`);
    Logger.info(`OTP envoyé par email à l'administrateur: ${email}`);

    res.status(200).json({ message: 'Code de vérification envoyé par email.', otpRequired: true });
  } catch (error) {
    Logger.error(`Erreur lors de la connexion admin: ${error.message}`);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpData = otpCache.get(email);
    if (!otpData || otpData.otp !== parseInt(otp) || Date.now() > otpData.expiresAt) {
      Logger.warn(`Échec de vérification OTP pour: ${email}`);
      return res.status(400).json({ message: 'Code invalide ou expiré.' });
    }


    const admin = await User.findOne({ email, role: ROLES.ADMIN });
    const token =jwt.sign(
      { userId: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    otpCache.delete(email); 
    Logger.info(`Connexion réussie après vérification OTP pour: ${email}`);
    res.status(200).json({ message: 'Connexion réussie.', token });
  } catch (error) {
    Logger.error(`Erreur lors de la vérification OTP: ${error.message}`);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};




const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const resetToken =jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const reseturl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    
    console.log(
      `Lien de réinitialisation : http://localhost:5000/api/auth/password-reset/${resetToken}`
    
    );

    sendEmail(
      email,
      "Veuillez confirmer votre compte ", 
      "resetPassWord",
      {
        reseturl:reseturl
      }
    );

    res.status(200).json({
      message: "Un lien de réinitialisation a été envoyé à votre email.",
      resetToken: resetToken
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
};

const resetPassword = async (req, res) => {
  try {
    // const { token } = req.params;
    const { newPassword , token} = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if(!newPassword){
      return res.status(400).json({
        message: "Entrer le nouveau mots de passe"
      })
    }

    if (!user) {
      return res.status(400).json({ message: "L'utilisateur n'a pas été trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Mot de passe réinitialisé avec succès." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ 
      message: "Erreur de modification du passeword", 
      error: error
    });
  }
};


const enableTwoFactorAuth = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFactorCode = verificationCode;
    user.twoFactorExpires = Date.now() + 10 * 60 * 1000; 
    await user.save();

    if (user.preferred2FAMethod === 'email') {
      await sendEmail(user.email, "Votre code de vérification", `Votre code de vérification est : ${verificationCode}`);
    } else {
      await sendSMS(user.phoneNumber, `Votre code de vérification est : ${verificationCode}`);
    }

    res.status(200).json({ message: "Code de vérification envoyé" });
  } catch (error) {
    Logger.error(`Erreur lors de l'activation du 2FA: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const verifyTwoFactorAuth = async (req, res) => {
  try {
    const { userId } = req.user;
    const { code } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (user.twoFactorCode !== code || Date.now() > user.twoFactorExpires) {
      return res.status(400).json({ message: "Code invalide ou expiré" });
    }

    user.twoFactorCode = null;
    user.twoFactorExpires = null;
    await user.save();

    res.status(200).json({ message: "Vérification réussie" });
  } catch (error) {
    Logger.error(`Erreur lors de la vérification du 2FA: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const disable2FA = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    user.is2FAEnabled = false;
    user.preferred2FAMethod = null;
    user.twoFactorSecret = null; 
    await user.save();

    res.status(200).json({ message: "2FA désactivée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const enable2FA = async (req, res) => {
  try {
    const { userId } = req.user;
    const { method } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (!['email', 'sms', 'whatsapp', 'telegram', 'google_authenticator'].includes(method)) {
      return res.status(400).json({ message: "Méthode de 2FA invalide." });
    }

    user.is2FAEnabled = true;
    user.preferred2FAMethod = method;

    // Si l'utilisateur choisit Google Authenticator, génère un secret
    if (method === 'google_authenticator') {
      const secret = speakeasy.generateSecret({ length: 20 });
      user.twoFactorSecret = secret.base32;
      await user.save();

      return res.status(200).json({
        message: "Scannez le QR code avec Google Authenticator.",
        qrCodeUrl: `otpauth://totp/PSP_APP:${user.email}?secret=${secret.base32}&issuer=YourApp`,
      });
    }

    await user.save();
    res.status(200).json({ message: "2FA activée avec succès.", method });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const verify2FA = async (req, res) => {
  try {
    const { userId, code } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    if (!user.is2FAEnabled) {
      return res.status(400).json({ message: "La double authentification n'est pas activée." });
    }

    let isValid = false;
    if (user.preferred2FAMethod === 'google_authenticator') {
      isValid = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: code,
        window: 1, 
      });
    } else {
      isValid = user.twoFactorCode === code && Date.now() <= user.twoFactorExpires;
    }

    if (!isValid) {
      return res.status(400).json({ message: "Code invalide ou expiré." });
    }

    user.twoFactorCode = null;
    user.twoFactorExpires = null;
    await user.save();

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: `Bienvenue ${user.fullName}`,
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};

const resend2FACode = async (req, res) => {
  try {
    const { email, method } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    if (user.failedAttempts >= 3) {
      const oneHourAgo = Date.now() - 60 * 60 * 1000;  // 1 heure en millisecondes
      if (user.lastFailedAttempt && user.lastFailedAttempt > oneHourAgo) {
        const remainingTime = ((user.lastFailedAttempt + 60 * 60 * 1000) - Date.now()) / 1000;  // Temps restant en secondes
        return res.status(400).json({
          message: `Vous avez atteint la limite de tentatives. Veuillez patienter encore ${Math.ceil(remainingTime)} secondes avant de réessayer.`
        });
      } else {
        // Si 1 heure est passée, réinitialiser les tentatives
        user.failedAttempts = 0;
        user.lastFailedAttempt = null;
      }
    }

    if (Date.now() < user.twoFactorExpires) {
      return res.status(400).json({ message: "Le code n'est pas expiré. Veuillez entrer le code actuel." });
    }

    const newVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFactorCode = newVerificationCode;
    user.twoFactorExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    if (!['email', 'sms', 'whatsapp', 'telegram'].includes(method)) {
      return res.status(400).json({ message: "Méthode de 2FA invalide." });
    }

    switch (method) {
      case 'email':
        await sendEmail(
          user.email,
          "Vérification de sécurité", 
          "verifyLogin", 
          { 
            code: newVerificationCode,
            appName: "PSP_APP" 
          }
        );
        break;
      case 'sms':
        await sendSMS(user.phoneNumber, `Votre nouveau code de vérification est : ${newVerificationCode}`);
        break;
      case 'whatsapp':
        await sendWhatsAppMessage(user.phoneNumber, `Votre nouveau code de vérification est : ${newVerificationCode}`);
        break;
      case 'telegram':
        await sendTelegram(user.telegramId, `Votre nouveau code de vérification est : ${newVerificationCode}`);
        break;
      default:
        throw new Error("Méthode de 2FA non reconnue.");
    }

    res.status(200).json({
      message: "Nouveau code de vérification envoyé.",
      require2FA: true,
      userId: user._id,
      method: method,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


const resendActivationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    if (user.failedAttempts >= 3) {
      const oneHourAgo = Date.now() - 60 * 60 * 1000;  // 1 heure en millisecondes
      if (user.lastFailedAttempt && user.lastFailedAttempt > oneHourAgo) {
        const remainingTime = ((user.lastFailedAttempt + 60 * 60 * 1000) - Date.now()) / 1000;  // Temps restant en secondes
        return res.status(400).json({
          message: `Vous avez atteint la limite de tentatives. Veuillez patienter encore ${Math.ceil(remainingTime)} secondes avant de réessayer.`
        });
      } else {
        // Si 1 heure est passée, réinitialiser les tentatives
        user.failedAttempts = 0;
        user.lastFailedAttempt = null;
      }
    }

    if (user.isActive) {
      return res.status(400).json({ message: "Le compte est déjà activé." });
    }


    const activationToken = user.generateActivationToken();
    const activateUrl = `http://localhost:${process.env.PORT}/api/auth/activate/${activationToken}`;

    sendEmail(
      user.email,
      "Veuillez confirmer votre compte",
      "comfirmMail",
      {
        fulname: user.fullName,
        confirmmailurl: activateUrl,
      }
    );

    res.status(200).json({ message: "Email d'activation renvoyé." });
  } catch (error) {
    console.error("Erreur lors du renvoi de l'email d'activation:", error);
    res.status(500).json({ message: "Erreur interne du serveur." });
  }
};


module.exports = {
  register,
  registerAdmin,
  login,
  loginAdmin,
  activateAccount,
  verifyOtp,
  enableTwoFactorAuth,
  verifyTwoFactorAuth,
  resetPassword,
  requestPasswordReset,
  enable2FA,
  disable2FA,
  verify2FA,
  resend2FACode,
  resendActivationEmail,
  verify2FactorAuth
}