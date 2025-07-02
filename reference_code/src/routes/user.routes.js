const express = require ('express');
const { 
    register, 
    registerAdmin,
    activateAccount,
    login,
    loginAdmin,
    resetPassword,
    requestPasswordReset,
    enableTwoFactorAuth,
    verifyOtp,
    verifyTwoFactorAuth,
    verify2FA, 
    resendActivationEmail,
    resend2FACode,
    verify2FactorAuth
}= require( '../controllers/user.controller.js');
const { authorize,ROLES } = require ('../middlewares/authorize.js');
const {validateRegister, validateLogin } = require("../middlewares/validator.js")

const router = express.Router();

// Route utilisateur
router.post('/register',validateRegister, register);
router.get('/activate/:token', activateAccount);
router.post('/login',validateLogin, login);
router.post("/login/method_auth", verify2FactorAuth)
router.post("/confirmlogin",verify2FA)
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/:token', resetPassword);
router.post("/register/resend", resendActivationEmail);
router.post("/login/resend", resend2FACode);

// Route protégée : accès uniquement aux administrateurs
router.post('/register-admin',validateRegister, authorize([ROLES.ADMIN]), registerAdmin);
router.post('/login-admin',validateLogin, loginAdmin);
router.post('/verify-otp', verifyOtp);
router.post('/enable-2fa', authorize, enableTwoFactorAuth);
router.post('/verify-2fa', authorize, verifyTwoFactorAuth);


router.get('/admin-only', authorize([ROLES.ADMIN]), (req, res) => {
  res.status(200).json({ message: 'Accès administrateur autorisé' });
});





module.exports = router;
