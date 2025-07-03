const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Le nom complet est requis'],
    trim: true,
    maxLength: [100, 'Le nom ne peut pas dépasser 100 caractères']
  },
  
  firstName: {
    type: String,
    trim: true,
    maxLength: [50, 'Le prénom ne peut pas dépasser 50 caractères']
  },
  
  lastName: {
    type: String,
    trim: true,
    maxLength: [50, 'Le nom de famille ne peut pas dépasser 50 caractères']
  },
  
  username: {
    type: String,
    unique: true,
    sparse: true, // Permet les valeurs null
    trim: true,
    minLength: [3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'],
    maxLength: [30, 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères']
  },

  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Format d\'email invalide']
  },

  password: {
    type: String,
    required: [true, 'Le mot de passe est requis'],
    minLength: process.env.NODE_ENV === 'development' ? [3, 'Le mot de passe doit contenir au moins 3 caractères'] : [8, 'Le mot de passe doit contenir au moins 8 caractères']
  },

  phoneNumber: {
    type: String, 
    required: [true, 'Le numéro de téléphone est requis'],
    unique: true,
    trim: true
  },

  profilePicture: {
    type: String,
    default: null
  },

  coverPicture: {
    type: String,
    default: null
  },

  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    lowercase: true
  },

  nationality: {
    type: String,
    trim: true,
    maxLength: [50, 'La nationalité ne peut pas dépasser 50 caractères']
  },

  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    country: { type: String, trim: true }
  },

  dateOfBirth: {
    type: Date
  },

  role: {
    type: String,
    enum: ['user', 'agent', 'admin'],
    default: 'user'
  },

  // Statut du compte
  isActive: {
    type: Boolean,
    default: false
  },

  isEmailVerified: {
    type: Boolean,
    default: false
  },

  isPhoneVerified: {
    type: Boolean,
    default: false
  },

  // Champs pour la vérification d'email
  emailVerificationToken: {
    type: String,
    default: null
  },

  emailVerificationExpiry: {
    type: Date,
    default: null
  },

  // Champs pour la réinitialisation de mot de passe
  resetPasswordToken: {
    type: String,
    default: null
  },

  resetPasswordExpiry: {
    type: Date,
    default: null
  },

  // Authentification à deux facteurs (2FA)
  is2FAEnabled: {
    type: Boolean,
    default: false
  },

  preferred2FAMethod: {
    type: String,
    enum: ['email', 'sms', 'authenticator'],
    default: 'email'
  },

  twoFactorSecret: {
    type: String,
    default: null
  },

  twoFactorCode: {
    type: String,
    default: null
  },

  twoFactorCodeExpiry: {
    type: Date,
    default: null
  },

  // Sécurité et monitoring
  lastLoginAt: {
    type: Date,
    default: null
  },

  lastLoginIP: {
    type: String,
    default: null
  },

  failedLoginAttempts: {
    type: Number,
    default: 0
  },

  accountLockedUntil: {
    type: Date,
    default: null
  },

  // Métadonnées pour les agents
  agentProfile: {
    agencyName: { type: String, trim: true },
    licenseNumber: { type: String, sparse: true },
    specialization: [{ type: String }],
    experience: { type: Number, min: 0 },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    bio: { type: String, maxLength: 500 },
    education: { type: String, trim: true }
  },

  // Préférences utilisateur
  preferences: {
    language: { type: String, default: 'fr' },
    currency: { type: String, default: 'XAF' },
    budgetRange: { type: String, trim: true },
    propertyPreferences: [{ type: String }],
    preferredLocations: [{ type: String }],
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true }
    }
  }
}, {
  timestamps: true // Ajoute createdAt et updatedAt automatiquement
});

// Index pour améliorer les performances de recherche
userSchema.index({ email: 1 });
userSchema.index({ phoneNumber: 1 });
userSchema.index({ username: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Middleware pre-save pour hasher le mot de passe - TEMPORAIREMENT DÉSACTIVÉ POUR DEBUG
/*
userSchema.pre('save', async function(next) {
  // Hash password only if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
*/

// Méthode pour comparer les mots de passe - MODE DEBUG PLAIN TEXT
userSchema.methods.comparePassword = async function(candidatePassword) {
  console.log('🚨 MODE DEBUG - Comparaison plain text');
  console.log('🔑 Mot de passe saisi:', candidatePassword);
  console.log('🔑 Mot de passe stocké:', this.password);
  
  // Comparaison simple en plain text pour les tests
  const match = candidatePassword === this.password;
  console.log('✅ Résultat comparaison:', match);
  return match;
};

// Méthode pour générer un token JWT
userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { 
      userId: this._id, 
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Méthode pour générer un token de vérification d'email
userSchema.methods.generateEmailVerificationToken = function() {
  const token = jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  this.emailVerificationToken = token;
  this.emailVerificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 heures
  
  return token;
};

// Méthode pour générer un token de réinitialisation de mot de passe
userSchema.methods.generatePasswordResetToken = function() {
  const token = jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  
  this.resetPasswordToken = token;
  this.resetPasswordExpiry = Date.now() + 60 * 60 * 1000; // 1 heure
  
  return token;
};

// Méthode pour vérifier si le compte est verrouillé
userSchema.methods.isAccountLocked = function() {
  return this.accountLockedUntil && this.accountLockedUntil > Date.now();
};

// Méthode pour incrémenter les tentatives de connexion échouées
userSchema.methods.incrementFailedAttempts = function() {
  // Si nous avons un verrou précédent et qu'il a expiré, redémarrer à 1
  if (this.accountLockedUntil && this.accountLockedUntil < Date.now()) {
    return this.updateOne({
      $unset: { accountLockedUntil: 1 },
      $set: { failedLoginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { failedLoginAttempts: 1 } };
  
  // Si nous atteignons max tentatives et qu'il n'y a pas de verrou, verrouiller le compte
  if (this.failedLoginAttempts + 1 >= 5 && !this.isAccountLocked()) {
    updates.$set = { accountLockedUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 heures
  }
  
  return this.updateOne(updates);
};

// Méthode pour réinitialiser les tentatives de connexion échouées
userSchema.methods.resetFailedAttempts = function() {
  return this.updateOne({
    $unset: { failedLoginAttempts: 1, accountLockedUntil: 1 }
  });
};

// Méthode pour masquer les champs sensibles
userSchema.methods.toPublicJSON = function() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpiry;
  delete user.emailVerificationToken;
  delete user.emailVerificationExpiry;
  delete user.twoFactorSecret;
  delete user.twoFactorCode;
  delete user.twoFactorCodeExpiry;
  return user;
};

module.exports = mongoose.model('User', userSchema);
