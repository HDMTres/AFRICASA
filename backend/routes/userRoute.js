const express = require('express');
const router = express.Router();
const { 
    createUser, 
    loginUser, 
    getUserDetails, 
    updateUser, 
    deleteUser,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    verify2FA,
    setup2FA,
    confirm2FA
} = require('../Controllers/userController');

const { authMiddleware, authorize, ROLES } = require('../middleware/auth');
const { handleProfilePictureUpload } = require('../middleware/upload');

const {
    validateRegister,
    validateLogin,
    validatePasswordReset,
    validateNewPassword
} = require('../middleware/validator');

// Routes d'authentification publiques
router.post('/register', validateRegister, createUser);
router.post('/login', validateLogin, loginUser);
router.get('/verify-email/:token', verifyEmail);
router.post('/verify-2fa', verify2FA);

// Routes de récupération de mot de passe
router.post('/forgot-password', validatePasswordReset, forgotPassword);
router.post('/reset-password', validateNewPassword, resetPassword);

// Routes protégées utilisateur
router.get('/profile', authMiddleware, getUserDetails);
router.put('/profile', authMiddleware, handleProfilePictureUpload, updateUser);
router.delete('/profile', authMiddleware, deleteUser);
router.post('/change-password', authMiddleware, validateNewPassword, changePassword);

// Routes 2FA protégées
router.post('/setup-2fa', authMiddleware, setup2FA);
router.post('/confirm-2fa', authMiddleware, confirm2FA);

// Routes administrateur
router.get('/admin/users', authMiddleware, authorize([ROLES.ADMIN]), (req, res) => {
    // TODO: Implémenter la liste des utilisateurs pour les admins
    res.status(200).json({ message: 'Route admin en construction' });
});

// Route de test de santé
router.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK', 
        service: 'User Service',
        timestamp: new Date().toISOString()
    });
});

module.exports = router;