const ROLES = {
  USER: "utilisateur",
  MANAGER: "gestionnaire",
  ADMIN: "administrateur",
};

const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit." });
    }
    next();
  };
};

module.exports = {
    ROLES,
    authorize
}
