const mongoose = require ('mongoose');
const  bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['Masculin', 'Féminin'],
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  residence: {
    city: String,
    district: String,
    postalAddress: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  identityDocument: {
    type: {
      type: String,
      enum: ['CNI', 'Passeport', 'Permis de conduire'],
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    expirationDate: {
      type: Date,
      required: true,
    },
  },
  professionalInfo: {
    profession: { 
      type: String, 
      required: true 
    },
    sector: { 
      type: String, 
      required: true 
    },
    monthlyIncome: { 
      type: String, 
      required: true 
    },
  },
  financialInfo: {
    accountType: { 
      type: String, 
      required: true, 
    },
    bankAccountNumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    mobileMoneyOperator: { 
      type: String, 
      required: true, 
    },
    mobileMoneyNumber: { 
      type: String, 
      required: true, 
    },
  },
  consents: {
    termsAccepted: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    dataProcessingConsent: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    marketingConsent: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
    feesAcceptance: { 
      type: Boolean, 
      required: true, 
      default: false 
    },
  },
  password: {
    type: String,
    required: true,
  },
  securityInfo: {
    question: { 
      type: String, 
      required: true 
    },
    answer: { 
      type: String, 
      required: true 
    },
  },
  // securityQuestion: {
  //   type: String,
  //   required: true,
  // },
  // securityAnswer: {
  //   type: String,
  //   required: true,
  // },
  role: {
    type: String,
    enum: ['utilisateur', 'gestionnaire', 'administrateur'],
    default: 'utilisateur',
  },
  isActive: {
    type: Boolean,
    default: false,
  },

  twoFactorCode: {
    type: String,
    default: null
  },
  twoFactorExpires: {
    type: Date,
    default: null
  },
  is2FAEnabled: {
    type: Boolean,
    default: true, 
  },
  preferred2FAMethod: {
    type: String,
    enum: ['email', 'sms', 'whatsapp', 'telegram', 'google_authenticator'],
    default: 'google_authenticator',
  },
  twoFactorSecret: { // Pour Google Authenticator
    type: String,
    default: null,
  },
  failedAttempts: { 
    type: Number, 
    default: 0 
  },   
  lastFailedAttempt: { 
    type: Date, 
    default: null 
  }, 
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.generateActivationToken = function () {
  return jwt.sign(
    { userId: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const User = mongoose.model('User', UserSchema);
module.exports =  User;
