const jwt = require('jsonwebtoken');
const User = require('../models/User/userModel');
const Logger = require('../utils/logger');

// Middleware d'authentification JWT amélioré
const authMiddleware = async (req, res, next) => {
    try {
        // Récupérer le token du header Authorization (Bearer token)
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                message: 'Token d\'authentification requis',
                code: 'NO_TOKEN'
            });
        }

        const token = authHeader.substring(7); // Retirer "Bearer "

        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Vérifier si l'utilisateur existe toujours et est actif
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            Logger.warn('Token valide mais utilisateur introuvable', {
                type: 'auth',
                userId: decoded.userId,
                ip: req.ip
            });
            return res.status(401).json({ 
                message: 'Utilisateur non trouvé',
                code: 'USER_NOT_FOUND'
            });
        }

        if (!user.isActive) {
            Logger.warn('Tentative d\'accès avec compte inactif', {
                type: 'auth',
                userId: user._id,
                email: user.email,
                ip: req.ip
            });
            return res.status(403).json({ 
                message: 'Compte non activé',
                code: 'ACCOUNT_INACTIVE'
            });
        }

        // Ajouter les informations utilisateur à la requête
        req.user = user;
        req.userId = user._id;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            Logger.warn('Token JWT invalide', {
                type: 'auth',
                error: error.message,
                ip: req.ip
            });
            return res.status(401).json({ 
                message: 'Token invalide',
                code: 'INVALID_TOKEN'
            });
        }
        
        if (error.name === 'TokenExpiredError') {
            Logger.warn('Token JWT expiré', {
                type: 'auth',
                error: error.message,
                ip: req.ip
            });
            return res.status(401).json({ 
                message: 'Token expiré',
                code: 'TOKEN_EXPIRED'
            });
        }

        Logger.error('Erreur d\'authentification', {
            type: 'auth',
            error: error.message,
            stack: error.stack,
            ip: req.ip
        });
        
        return res.status(500).json({ 
            message: 'Erreur interne du serveur',
            code: 'INTERNAL_ERROR'
        });
    }
};

// Middleware d'autorisation par rôle
const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                message: 'Authentification requise',
                code: 'AUTH_REQUIRED'
            });
        }

        if (roles.length > 0 && !roles.includes(req.user.role)) {
            Logger.warn('Tentative d\'accès non autorisé', {
                type: 'auth',
                userId: req.user._id,
                userRole: req.user.role,
                requiredRoles: roles,
                ip: req.ip
            });
            return res.status(403).json({ 
                message: 'Accès interdit - Privilèges insuffisants',
                code: 'INSUFFICIENT_PRIVILEGES'
            });
        }

        next();
    };
};

// Constantes des rôles
const ROLES = {
    USER: 'user',
    AGENT: 'agent', 
    ADMIN: 'admin'
};

module.exports = {
    authMiddleware,
    authorize,
    ROLES
};

