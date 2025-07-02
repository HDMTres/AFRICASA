const User = require('../Models/User.model.js');
const Logger = require('../utils/logger.js');
const { genSalt, hash } = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    Logger.error(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const getUser = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    Logger.error(`Erreur lors de la récupération de l'utilisateur: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { fullName, gender, birthDate, nationality, residence, email, phoneNumber, identityDocument, securityQuestion, securityAnswer, role, password } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (birthDate) user.birthDate = birthDate;
    if (nationality) user.nationality = nationality;
    if (residence) user.residence = residence;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (identityDocument) user.identityDocument = identityDocument;
    if (securityQuestion) user.securityQuestion = securityQuestion;
    if (securityAnswer) user.securityAnswer = securityAnswer;
    if (role && req.user.role === 'administrateur') user.role = role;

    if (password) {
      const salt = await genSalt(10);
      user.password = bcrypt.hash(password, salt);
    }

    await user.save();
    Logger.info(`Utilisateur mis à jour: ${userId}`);
    res.status(200).json({ message: "Utilisateur mis à jour avec succès", user });
  } catch (error) {
    Logger.error(`Erreur lors de la mise à jour: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    Logger.error(`Erreur lors de la suppression: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.role = role;
    await user.save();
    res.status(200).json({ message: "Rôle mis à jour avec succès", user });
  } catch (error) {
    Logger.error(`Erreur lors de la mise à jour du rôle: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};


const getUserPermissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    res.status(200).json({ permissions: user.permissions || [] });
  } catch (error) {
    Logger.error(`Erreur lors de la récupération des permissions: ${error.message}`);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = { getUsers, getUser, updateUser, deleteUser, updateUserRole, getUserPermissions };
