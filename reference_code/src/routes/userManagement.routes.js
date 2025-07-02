const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  updateUserRole,
  getUserPermissions
} = require('../controllers/userController.js');
const authorize = require('../middlewares/authorize.js');

const router = express.Router();

// Routes accessibles uniquement par les administrateurs
router.get('/', 
  authorize([ROLES.ADMIN]), getUsers);
router.delete('/:userId', authorize([ROLES.ADMIN]), deleteUser);
router.patch('/:userId/role', authorize([ROLES.ADMIN]), updateUserRole);

// Routes accessibles aux utilisateurs authentifiés
router.get('/:userId', authorize, getUser);
router.put('/:userId', authorize, updateUser);
router.get('/:userId/permissions', authorize([ROLES.ADMIN]), getUserPermissions);

module.exports = router;
