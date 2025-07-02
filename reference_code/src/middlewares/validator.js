const { check, validationResult } = require("express-validator");

const validateRegister = [
  check("fullName").notEmpty().withMessage("Le nom complet est obligatoire."),

  check("email").isEmail().withMessage("Email invalide."),

  check("phoneNumber")
    .matches(/^\+?[1-9]\d{0,2}\d{6,12}$/)
    .withMessage(
      "Numéro de téléphone invalide. Format attendu : +[indicatif][numéro]"
    ),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères.")
    .matches(/[A-Z]/)
    .withMessage("Le mot de passe doit contenir au moins une majuscule.")
    .matches(/[a-z]/)
    .withMessage("Le mot de passe doit contenir au moins une minuscule.")
    .matches(/[0-9]/)
    .withMessage("Le mot de passe doit contenir au moins un chiffre.")
    .matches(/[\W]/)
    .withMessage(
      "Le mot de passe doit contenir au moins un caractère spécial."
    ),

  check("securityInfo.question")
    .notEmpty()
    .withMessage("Question de sécurité requise."),

  check("securityInfo.answer")
    .notEmpty()
    .withMessage("Réponse de sécurité requise."),

  check("gender")
    .matches(/^(masculin|féminin)$/i)
    .withMessage("Genre invalide."),

  check("birthDate")
    .isISO8601()
    .withMessage("Date de naissance invalide. Format attendu : YYYY-MM-DD."),

  check("nationality").notEmpty().withMessage("Nationalité obligatoire."),

  check("residence.city").notEmpty().withMessage("Ville obligatoire."),
  check("residence.neighborhood")
    .notEmpty()
    .withMessage("Quartier obligatoire."),

  check("identityDocument.type")
    .isIn(["CNI", "Passeport", "Permis de conduire"])
    .withMessage("Type de document d'identité invalide."),

  check("identityDocument.number")
    .notEmpty()
    .withMessage("Numéro du document d'identité obligatoire."),

  check("identityDocument.expirationDate")
    .isISO8601()
    .withMessage("Date d'expiration invalide. Format attendu : YYYY-MM-DD."),

  check("professionalInfo.profession")
    .notEmpty()
    .withMessage("Profession obligatoire."),

  check("professionalInfo.sector")
    .notEmpty()
    .withMessage("Secteur d'activité obligatoire."),

  check("professionalInfo.monthlyIncome")
    // .isIn([
    //   "moins de 100 000 FCFA",
    //   "100 000 - 300 000 FCFA",
    //   "300 000 - 500 000 FCFA",
    //   "plus de 500 000 FCFA",
    // ])
    .notEmpty()
    .withMessage("Revenu mensuel invalide."),

  check("financialInfo.accountType")
  .notEmpty()
    // .isIn(["compte courant", "compte d’épargne", "compte entreprise", "compte joint", "autre"])
    .withMessage("Type de compte invalide."),

  check("financialInfo.mobileMoneyOperator")
    // .isIn(["MTN", "Orange", "Autre"])
    .notEmpty()
    .withMessage("Opérateur mobile money invalide."),

  check("financialInfo.mobileMoneyNumber")
    .matches(/^\+?[1-9]\d{0,2}\d{6,12}$/)
    .withMessage("Numéro mobile money invalide."),

  check("consents.termsAccepted")
    .isBoolean()
    .custom((value) => value === true)
    .withMessage("L'acceptation des conditions générales est obligatoire."),

  check("consents.dataProcessingConsent")
    .isBoolean()
    .custom((value) => value === true)
    .withMessage("Le consentement au traitement des données est obligatoire."),

  check("consents.feesAcceptance")
    .isBoolean()
    .custom((value) => value === true)
    .withMessage("L'acceptation des frais et commissions est obligatoire."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Échec de la validation des données.",
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = validateRegister;

const validateLogin = [
  check("email")
    .isEmail()
    .withMessage("L'email est invalide.")
    .normalizeEmail(),
  check("password")
    .notEmpty()
    .withMessage("Le mot de passe est requis.")
    .isLength({ min: 8 })
    .withMessage("Le mot de passe doit contenir au moins 8 caractères."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = { validateLogin, validateRegister };
