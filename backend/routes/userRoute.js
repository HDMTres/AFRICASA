const express = require('express')
const router = express.Router()
const { createUser, loginUser, getUserDetails, updateUser, deleteUser } = require('../Controllers/userController')
const authMiddleware = require('../middleware/auth')


router.post('/signup', createUser)

router.post('/signin', loginUser)



router.get('/profile', authMiddleware, getUserDetails)

router.put('/profile', authMiddleware, updateUser)

router.delete('/profile', authMiddleware, deleteUser)

module.exports = router;