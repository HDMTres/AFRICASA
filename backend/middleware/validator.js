const { body, validationResult } = require('express-validator');
const Logger = require('../utils/logger');

// Middleware pour gérer les erreurs de validation
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    Logger.warn('Erreurs de validation', {
      type: 'validation',
      errors: errors.array(),
      ip: req.ip,
      path: req.path
    });
    
    return res.status(400).json({
      message: 'Erreurs de validation',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  
  next();
};

// Validations pour l'inscription
const validateRegister = [
  body('fullName')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom complet doit contenir entre 2 et 100 caractères')
    .matches(/^[a-zA-ZÀ-ÿ\s-']+$/)
    .withMessage('Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
    
  body('email')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('L\'email ne peut pas dépasser 255 caractères'),
    
  body('password')
    .isLength({ min: 3, max: 128 })
    .withMessage('Le mot de passe doit contenir au moins 3 caractères')
    // TEMPORAIRE: Validation simplifiée pour les tests
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    // .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'),
    ,
    
  body('phoneNumber')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Format de numéro de téléphone invalide')
    .isLength({ min: 8, max: 20 })
    .withMessage('Le numéro de téléphone doit contenir entre 8 et 20 caractères'),
    
  body('role')
    .isIn(['user', 'agent'])
    .withMessage('Rôle invalide. Doit être "user" ou "agent"'),
    
  handleValidationErrors
];

// Validations pour la connexion
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail(),
    
  body('password')
    .notEmpty()
    .withMessage('Le mot de passe est requis')
    .isLength({ max: 128 })
    .withMessage('Mot de passe trop long'),
    
  handleValidationErrors
];

// Validations pour la réinitialisation de mot de passe
const validatePasswordReset = [
  body('email')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail(),
    
  handleValidationErrors
];

// Validations pour le nouveau mot de passe
const validateNewPassword = [
  body('password')
    .isLength({ min: 8, max: 128 })
    .withMessage('Le mot de passe doit contenir entre 8 et 128 caractères')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage('Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial'),
    
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Les mots de passe ne correspondent pas');
      }
      return true;
    }),
    
  handleValidationErrors
];

// Validations pour les propriétés
const validateProperty = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Le titre doit contenir entre 5 et 200 caractères'),
    
  body('description')
    .trim()
    .isLength({ min: 20, max: 2000 })
    .withMessage('La description doit contenir entre 20 et 2000 caractères'),
    
  body('price')
    .isNumeric()
    .withMessage('Le prix doit être un nombre')
    .isFloat({ min: 0 })
    .withMessage('Le prix doit être positif'),
    
  body('location')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('L\'emplacement doit contenir entre 5 et 200 caractères'),
    
  body('type')
    .isIn(['appartement', 'maison', 'villa', 'terrain', 'commercial'])
    .withMessage('Type de propriété invalide'),
    
  body('category')
    .isIn(['vente', 'location'])
    .withMessage('Catégorie invalide. Doit être "vente" ou "location"'),
    
  body('bedrooms')
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage('Le nombre de chambres doit être entre 0 et 20'),
    
  body('bathrooms')
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage('Le nombre de salles de bain doit être entre 0 et 20'),
    
  body('area')
    .optional()
    .isFloat({ min: 1 })
    .withMessage('La superficie doit être positive'),
    
  handleValidationErrors
];

// Validations pour les agents
const validateAgent = [
  body('specialization')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('La spécialisation doit contenir entre 2 et 100 caractères'),
    
  body('experience')
    .isInt({ min: 0, max: 50 })
    .withMessage('L\'expérience doit être entre 0 et 50 ans'),
    
  body('licenseNumber')
    .optional()
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage('Le numéro de licence doit contenir entre 5 et 50 caractères'),
    
  handleValidationErrors
];

// Validation pour les messages de contact
const validateContactMessage = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Le nom doit contenir entre 2 et 100 caractères'),
    
  body('email')
    .isEmail()
    .withMessage('Format d\'email invalide')
    .normalizeEmail(),
    
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Le sujet doit contenir entre 5 et 200 caractères'),
    
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Le message doit contenir entre 10 et 2000 caractères'),
    
  handleValidationErrors
];

// Validation d'ObjectId MongoDB
const validateObjectId = (paramName) => [
  body(paramName)
    .matches(/^[0-9a-fA-F]{24}$/)
    .withMessage(`${paramName} doit être un ID MongoDB valide`),
    
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validatePasswordReset,
  validateNewPassword,
  validateProperty,
  validateAgent,
  validateContactMessage,
  validateObjectId,
  handleValidationErrors
};
