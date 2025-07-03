const User = require('../models/User/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Logger = require('../utils/logger');
const EmailService = require('../services/emailService');
const TwoFactorAuthService = require('../services/twoFactorAuth');

// Contrôleur pour créer un nouvel utilisateur (inscription)
exports.createUser = async (req, res) => {
  try {
    const { 
      fullName, 
      email, 
      password, 
      phoneNumber, 
      role,
      firstName,
      lastName,
      address,
      gender,
      nationality,
      dateOfBirth
    } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ 
      $or: [{ email }, { phoneNumber }] 
    });

    if (existingUser) {
      Logger.warn('Tentative d\'inscription avec email/téléphone existant', {
        type: 'auth',
        email,
        phoneNumber,
        ip: req.ip
      });
      return res.status(400).json({ 
        message: 'Un utilisateur avec cet email ou numéro de téléphone existe déjà' 
      });
    }

    // Créer un nouvel utilisateur (le mot de passe sera hashé par le middleware pre-save)
    const skipEmailVerification = process.env.SKIP_EMAIL_VERIFICATION === 'true';

    // Token de vérification email (gardé pour compatibilité)
    const verificationToken = jwt.sign(
      { userId: email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Création de l'utilisateur - LE MOT DE PASSE SERA HASHÉ AUTOMATIQUEMENT
    const newUser = new User({
      fullName: fullName || `${firstName} ${lastName}`.trim(),
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: password, // PAS DE HASHAGE MANUEL - le middleware pre-save s'en charge
      phoneNumber,
      role: role || 'user',
      gender,
      nationality,
      dateOfBirth,
      address: typeof address === 'string' ? { street: address } : address,
      isActive: skipEmailVerification, // Nécessite une vérification d'email
      isEmailVerified: skipEmailVerification,
      ...(skipEmailVerification ? {} : {
        emailVerificationToken: verificationToken,
        emailVerificationExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000)
      })
    });

    const savedUser = await newUser.save();

    // Envoi d'email conditionnel
    if (!skipEmailVerification) {
      try {
        await EmailService.sendEmailVerification(savedUser, verificationToken);
        console.log(`📧 Email de vérification envoyé à ${savedUser.email}`);
      } catch (emailError) {
        console.error('❌ Erreur envoi email:', emailError);
      }
    } else {
      console.log(`✅ Compte auto-activé pour ${savedUser.email} (mode développement)`);
    }

    // Message conditionnel
    const message = skipEmailVerification 
      ? 'Compte créé et activé avec succès ! Vous pouvez maintenant vous connecter.'
      : 'Compte créé avec succès. Veuillez vérifier votre email pour activer votre compte.';

    res.status(201).json({ 
      message,
      userId: savedUser._id
    });
  } catch (error) {
    Logger.error('Erreur lors de la création d\'utilisateur', {
      type: 'auth',
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });

    // Gestion des erreurs de duplication MongoDB
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      const message = duplicateField === 'email' 
        ? 'Cet email est déjà utilisé' 
        : 'Ce numéro de téléphone est déjà utilisé';
      return res.status(400).json({ message });
    }

    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour la vérification d'email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email déjà vérifié' });
    }

    if (user.emailVerificationExpiry < Date.now()) {
      return res.status(400).json({ message: 'Token de vérification expiré' });
    }

    user.isEmailVerified = true;
    user.isActive = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiry = null;
    await user.save();

    // Envoyer email de bienvenue
    try {
      await EmailService.sendWelcomeEmail(user);
    } catch (emailError) {
      Logger.error('Erreur lors de l\'envoi de l\'email de bienvenue', {
        type: 'email',
        userId: user._id,
        error: emailError.message
      });
    }

    Logger.info('Email vérifié avec succès', {
      type: 'auth',
      action: 'email_verified',
      userId: user._id,
      email: user.email,
      ip: req.ip
    });

    res.status(200).json({ 
      message: 'Email vérifié avec succès. Votre compte est maintenant actif.' 
    });
  } catch (error) {
    Logger.error('Erreur lors de la vérification d\'email', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(400).json({ message: 'Token de vérification invalide ou expiré' });
  }
};

// Contrôleur pour l'authentification avec 2FA
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // LOGS DE DEBUG DOCKER
    console.log('🔍 === DEBUG CONNEXION DOCKER ===');
    console.log('📧 Email de connexion:', email);
    console.log('🏠 Variable MONGODB_URI:', process.env.MONGODB_URI);
    console.log('🌍 Environnement NODE_ENV:', process.env.NODE_ENV);
    console.log('📊 Base de données MongoDB connectée:', !!User.db.readyState);

    // Rechercher l'utilisateur par email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // DEBUG: Compter le nombre total d'utilisateurs pour voir si la base est accessible
      const totalUsers = await User.countDocuments({});
      console.log('❌ Utilisateur non trouvé pour:', email);
      console.log('📊 Nombre total d\'utilisateurs dans la base:', totalUsers);
      
      // Afficher quelques emails (les 3 premiers) pour debug
      const sampleUsers = await User.find({}, { email: 1 }).limit(3);
      console.log('👥 Échantillon d\'utilisateurs dans la base:', sampleUsers.map(u => u.email));
      
      Logger.authFailure(email, req.ip, 'Utilisateur non trouvé');
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    console.log('✅ Utilisateur trouvé:', {
      id: user._id,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      isEmailVerified: user.isEmailVerified,
      hasPassword: !!user.password
    });

    // Vérifier si le compte est verrouillé
    if (user.isAccountLocked()) {
      console.log('🔒 Compte verrouillé pour:', email);
      Logger.authFailure(email, req.ip, 'Compte verrouillé');
      return res.status(423).json({ 
        message: 'Compte temporairement verrouillé pour des raisons de sécurité. Réessayez plus tard.',
        code: 'ACCOUNT_LOCKED'
      });
    }

    // Vérifier si le compte est actif
    const skipEmailVerification = process.env.SKIP_EMAIL_VERIFICATION === 'true';

    // Vérification conditionnelle de l'email
    if (!skipEmailVerification && !user.isEmailVerified) {
      return res.status(400).json({
        message: 'Compte non activé. Veuillez vérifier votre email.',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    if (!user.isActive) {
      Logger.authFailure(email, req.ip, 'Compte non activé');
      return res.status(403).json({ 
        message: 'Compte non activé. Veuillez vérifier votre email.',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    // Vérifier le mot de passe
    console.log('🔐 Vérification du mot de passe...');
    console.log('📝 Mot de passe fourni:', password);
    console.log('🔑 Mot de passe stocké:', user.password);
    
    // MODE DEBUG : Connexion simplifiée
    if (process.env.NODE_ENV === 'development' && process.env.DEBUG === 'true') {
      console.log('🚨 MODE DEBUG ACTIVÉ - Vérification simplifiée');
      
      // Tentative de comparaison normale d'abord
      const passwordMatch = await user.comparePassword(password);
      console.log('✅ Résultat de la comparaison:', passwordMatch);
      
      if (passwordMatch) {
        console.log('🎉 Connexion réussie avec comparaison normale pour:', email);
      } else {
        console.log('⚠️ Comparaison normale échouée, acceptation forcée en mode DEBUG');
      }
      
      // En mode DEBUG, on accepte la connexion même si le mot de passe ne correspond pas
      console.log('🔓 Connexion forcée en mode DEBUG pour:', email);
      
      // Réinitialiser les tentatives échouées
      await user.resetFailedAttempts();

      // Mettre à jour les informations de dernière connexion
      user.lastLoginAt = new Date();
      user.lastLoginIP = req.ip;
      await user.save();
      
      const token = user.generateAuthToken();
      
      Logger.authSuccess(user._id, user.email, req.ip);
      
      return res.status(200).json({
        message: `Bienvenue ${user.fullName} (MODE DEBUG)`,
        token,
        user: user.toPublicJSON(),
        requires2FA: false,
        debug: true
      });
    }
    
    // Mode normal (production)
    const passwordMatch = await user.comparePassword(password);
    console.log('✅ Résultat de la comparaison:', passwordMatch);
    
    if (!passwordMatch) {
      console.log('❌ Mot de passe incorrect pour:', email);
      await user.incrementFailedAttempts();
      Logger.authFailure(email, req.ip, 'Mot de passe incorrect');
      return res.status(401).json({ 
        message: 'Email ou mot de passe incorrect',
        code: 'INVALID_CREDENTIALS'
      });
    }
    
    console.log('🎉 Connexion réussie pour:', email);

    // Réinitialiser les tentatives échouées
    await user.resetFailedAttempts();

    // Mettre à jour les informations de dernière connexion
    user.lastLoginAt = new Date();
    user.lastLoginIP = req.ip;

    // Si la 2FA n'est pas activée, connecter directement
    if (!user.is2FAEnabled) {
      await user.save();
      
      const token = user.generateAuthToken();
      
      Logger.authSuccess(user._id, user.email, req.ip);
      
      return res.status(200).json({
        message: `Bienvenue ${user.fullName}`,
        token,
        user: user.toPublicJSON(),
        requires2FA: false
      });
    }

    // Si la 2FA est activée, générer le code de vérification
    const twoFactorCode = TwoFactorAuthService.generateTemporaryCode();
    user.twoFactorCode = twoFactorCode;
    user.twoFactorCodeExpiry = TwoFactorAuthService.getCodeExpiry();
    await user.save();

    // Envoyer le code selon la méthode préférée
    try {
      switch (user.preferred2FAMethod) {
        case 'email':
          await EmailService.send2FACode(user, twoFactorCode);
          break;
        case 'sms':
          // TODO: Implémenter SMS
          Logger.info('SMS 2FA non encore implémenté', { userId: user._id });
          break;
        case 'authenticator':
          // Le code sera vérifié via l'app authenticator
          break;
        default:
          await EmailService.send2FACode(user, twoFactorCode);
      }
    } catch (error) {
      Logger.error('Erreur lors de l\'envoi du code 2FA', {
        type: 'auth',
        userId: user._id,
        method: user.preferred2FAMethod,
        error: error.message
      });
    }

    Logger.info('Code 2FA généré et envoyé', {
      type: 'auth',
      action: '2fa_code_sent',
      userId: user._id,
      method: user.preferred2FAMethod,
      ip: req.ip
    });

    res.status(200).json({
      message: 'Code de vérification envoyé',
      requires2FA: true,
      method: user.preferred2FAMethod,
      userId: user._id
    });
  } catch (error) {
    Logger.error('Erreur lors de la connexion', {
      type: 'auth',
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    res.status(500).json({ 
      message: 'Erreur interne du serveur',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Contrôleur pour vérifier le code 2FA
exports.verify2FA = async (req, res) => {
  try {
    const { userId, code, method } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ 
        message: 'Utilisateur non trouvé',
        code: 'USER_NOT_FOUND'
      });
    }

    let isValidCode = false;

    // Vérifier selon la méthode
    switch (method || user.preferred2FAMethod) {
      case 'email':
      case 'sms':
        // Vérifier le code temporaire
        if (!user.twoFactorCode || TwoFactorAuthService.isCodeExpired(user.twoFactorCodeExpiry)) {
          return res.status(400).json({ 
            message: 'Code expiré ou invalide',
            code: 'CODE_EXPIRED'
          });
        }
        isValidCode = user.twoFactorCode === code;
        break;

      case 'authenticator':
        // Vérifier avec Google Authenticator
        if (!user.twoFactorSecret) {
          return res.status(400).json({ 
            message: 'Authentificateur non configuré',
            code: 'AUTHENTICATOR_NOT_SETUP'
          });
        }
        isValidCode = TwoFactorAuthService.verifyToken(code, user.twoFactorSecret);
        break;

      default:
        return res.status(400).json({ 
          message: 'Méthode 2FA invalide',
          code: 'INVALID_2FA_METHOD'
        });
    }

    if (!isValidCode) {
      Logger.warn('Code 2FA invalide', {
        type: 'auth',
        action: '2fa_invalid_code',
        userId: user._id,
        method: method || user.preferred2FAMethod,
        ip: req.ip
      });
      return res.status(400).json({ 
        message: 'Code de vérification invalide',
        code: 'INVALID_CODE'
      });
    }

    // Code valide - nettoyer et connecter l'utilisateur
    user.twoFactorCode = null;
    user.twoFactorCodeExpiry = null;
    user.lastLoginAt = new Date();
    user.lastLoginIP = req.ip;
    await user.save();

    const token = user.generateAuthToken();

    Logger.authSuccess(user._id, user.email, req.ip);
    
    res.status(200).json({
      message: `Bienvenue ${user.fullName}`,
      token,
      user: user.toPublicJSON()
    });
  } catch (error) {
    Logger.error('Erreur lors de la vérification 2FA', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ 
      message: 'Erreur interne du serveur',
      code: 'INTERNAL_ERROR'
    });
  }
};

// Contrôleur pour configurer Google Authenticator
exports.setup2FA = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Générer un nouveau secret pour Google Authenticator
    const { secret, qrCodeUrl } = await TwoFactorAuthService.generateSecret(user.email);
    
    // Sauvegarder temporairement le secret (sera confirmé après vérification)
    user.twoFactorSecret = secret;
    await user.save();

    Logger.info('Setup 2FA initié', {
      type: 'auth',
      action: '2fa_setup_initiated',
      userId: user._id,
      ip: req.ip
    });

    res.status(200).json({
      secret,
      qrCodeUrl,
      message: 'Scannez le QR code avec votre application d\'authentification puis entrez le code pour confirmer la configuration.'
    });
  } catch (error) {
    Logger.error('Erreur lors du setup 2FA', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour confirmer la configuration 2FA
exports.confirm2FA = async (req, res) => {
  try {
    const { code } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user || !user.twoFactorSecret) {
      return res.status(400).json({ message: 'Configuration 2FA non initiée' });
    }

    // Vérifier le code
    const isValid = TwoFactorAuthService.verifyToken(code, user.twoFactorSecret);
    
    if (!isValid) {
      return res.status(400).json({ message: 'Code invalide' });
    }

    // Activer la 2FA
    user.is2FAEnabled = true;
    user.preferred2FAMethod = 'authenticator';
    await user.save();

    // Générer des codes de sauvegarde
    const backupCodes = TwoFactorAuthService.generateBackupCodes();

    Logger.info('2FA activée avec succès', {
      type: 'auth',
      action: '2fa_enabled',
      userId: user._id,
      ip: req.ip
    });

    res.status(200).json({
      message: 'Authentification à deux facteurs activée avec succès',
      backupCodes
    });
  } catch (error) {
    Logger.error('Erreur lors de la confirmation 2FA', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour récupérer les détails d'un utilisateur
exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(user.toPublicJSON());
  } catch (error) {
    Logger.error('Erreur lors de la récupération des détails utilisateur', {
      type: 'user',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour mettre à jour les informations de l'utilisateur
// Contrôleur pour mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const userId = req.userId;
    const updateData = { ...req.body };

    // Supprimer les champs qui ne doivent pas être mis à jour directement
    delete updateData.password;
    delete updateData.email; // L'email nécessite une vérification
    delete updateData.role; // Seulement les admins peuvent changer les rôles
    delete updateData.isActive;
    delete updateData.isEmailVerified;

    // Gérer la photo de profil si elle est uploadée
    if (req.file) {
      // Construire l'URL de la photo
      updateData.profilePicture = `/uploads/profile-pictures/${req.file.filename}`;
    }

    // Gérer les champs structurés
    if (updateData.address && typeof updateData.address === 'string') {
      updateData.address = { street: updateData.address };
    }

    // Gérer les champs JSON parsés (depuis FormData)
    ['languages', 'propertyPreferences', 'preferredLocations', 'notifications'].forEach(field => {
      if (updateData[field] && typeof updateData[field] === 'string') {
        try {
          updateData[field] = JSON.parse(updateData[field]);
        } catch (e) {
          console.warn(`Erreur parsing ${field}:`, e);
        }
      }
    });

    // Adapter les champs selon le schéma existant
    if (updateData.city || updateData.postalCode || updateData.country) {
      if (!updateData.address) updateData.address = {};
      if (updateData.city) updateData.address.city = updateData.city;
      if (updateData.postalCode) updateData.address.zipCode = updateData.postalCode;
      if (updateData.country) updateData.address.country = updateData.country;
      
      // Nettoyer les champs temporaires
      delete updateData.city;
      delete updateData.postalCode;
      delete updateData.country;
    }

    // Gérer les champs d'agent
    if (updateData.agencyName || updateData.licenseNumber || updateData.specialization || updateData.experience || updateData.education) {
      if (!updateData.agentProfile) updateData.agentProfile = {};
      if (updateData.agencyName) updateData.agentProfile.agencyName = updateData.agencyName;
      if (updateData.licenseNumber) updateData.agentProfile.licenseNumber = updateData.licenseNumber;
      if (updateData.specialization) updateData.agentProfile.specialization = [updateData.specialization];
      if (updateData.experience) updateData.agentProfile.experience = parseInt(updateData.experience);
      if (updateData.education) updateData.agentProfile.education = updateData.education;
      
      // Nettoyer les champs temporaires
      delete updateData.agencyName;
      delete updateData.licenseNumber;
      delete updateData.specialization;
      delete updateData.experience;
      delete updateData.education;
    }

    // Gérer les préférences
    if (updateData.budgetRange || updateData.notifications) {
      if (!updateData.preferences) updateData.preferences = {};
      if (updateData.budgetRange) updateData.preferences.budgetRange = updateData.budgetRange;
      if (updateData.notifications) updateData.preferences.notifications = updateData.notifications;
      
      // Nettoyer les champs temporaires
      delete updateData.budgetRange;
    }

    // Adapter le genre
    if (updateData.gender) {
      const genderMap = {
        'homme': 'male',
        'femme': 'female',
        'autre': 'other'
      };
      updateData.gender = genderMap[updateData.gender.toLowerCase()] || updateData.gender;
    }

    // Récupérer l'utilisateur actuel pour gérer l'ancienne photo
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'ancienne photo si une nouvelle est uploadée
    if (req.file && currentUser.profilePicture) {
      const { deleteOldProfilePicture } = require('../middleware/upload');
      deleteOldProfilePicture(currentUser.profilePicture);
    }

    const user = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    );

    Logger.info('Utilisateur mis à jour', {
      type: 'user',
      action: 'user_updated',
      userId: user._id,
      hasNewPhoto: !!req.file,
      ip: req.ip
    });

    res.status(200).json({ 
      message: 'Profil mis à jour avec succès',
      user: user.toPublicJSON()
    });
  } catch (error) {
    Logger.error('Erreur lors de la mise à jour utilisateur', {
      type: 'user',
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    Logger.info('Utilisateur supprimé', {
      type: 'user',
      action: 'user_deleted',
      userId: user._id,
      email: user.email,
      ip: req.ip
    });

    res.status(200).json({ message: 'Compte supprimé avec succès' });
  } catch (error) {
    Logger.error('Erreur lors de la suppression utilisateur', {
      type: 'user',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour mot de passe oublié
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Pour des raisons de sécurité, retourner le même message
      return res.status(200).json({ 
        message: 'Si ce compte existe, un email de récupération a été envoyé.' 
      });
    }

    // Générer le token de réinitialisation
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    // Envoyer l'email de réinitialisation
    try {
      await EmailService.sendPasswordReset(user, resetToken);
    } catch (emailError) {
      Logger.error('Erreur lors de l\'envoi de l\'email de réinitialisation', {
        type: 'email',
        userId: user._id,
        error: emailError.message
      });
    }

    Logger.info('Demande de réinitialisation de mot de passe', {
      type: 'auth',
      action: 'password_reset_requested',
      userId: user._id,
      email: user.email,
      ip: req.ip
    });
    
    res.status(200).json({ 
      message: 'Si ce compte existe, un email de récupération a été envoyé.'
    });
  } catch (error) {
    Logger.error('Erreur lors de la demande de réinitialisation', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

// Contrôleur pour réinitialiser le mot de passe
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user || user.resetPasswordToken !== token || user.resetPasswordExpiry < Date.now()) {
      return res.status(400).json({ message: 'Token invalide ou expiré' });
    }

    // Mettre à jour le mot de passe (sera hashé par le middleware)
    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;
    await user.save();

    Logger.info('Mot de passe réinitialisé avec succès', {
      type: 'auth',
      action: 'password_reset_completed',
      userId: user._id,
      ip: req.ip
    });

    res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
  } catch (error) {
    Logger.error('Erreur lors de la réinitialisation de mot de passe', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(400).json({ message: 'Token invalide ou expiré' });
  }
};

// Contrôleur pour changer le mot de passe (utilisateur connecté)
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe actuel
    const passwordMatch = await user.comparePassword(currentPassword);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
    }

    // Mettre à jour le mot de passe
    user.password = newPassword;
    await user.save();

    Logger.info('Mot de passe changé avec succès', {
      type: 'auth',
      action: 'password_changed',
      userId: user._id,
      ip: req.ip
    });

    res.status(200).json({ message: 'Mot de passe changé avec succès' });
  } catch (error) {
    Logger.error('Erreur lors du changement de mot de passe', {
      type: 'auth',
      error: error.message,
      ip: req.ip
    });
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};
