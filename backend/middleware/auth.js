const jwt = require('jsonwebtoken');

// Middleware d'authentification
const authMiddleware = (req, res, next) => {
    // Récupérer le token d'authentification du header Authorization
    const token = req.headers.authorization;

    // Vérifier si le token existe
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Vérifier et décoder le token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajouter l'ID de l'utilisateur décodé à l'objet de la requête pour une utilisation ultérieure
        req.userId = decoded.userId;

        // Appeler la prochaine fonction middleware
        next();
    } catch (error) {
        // En cas d'erreur de vérification du token
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

