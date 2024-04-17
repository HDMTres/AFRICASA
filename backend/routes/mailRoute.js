const express = require('express')
const router = express.Router()
const { sendMailForm } = require('../Controllers/mailController')

console.log(sendMailForm)
router.post('/mailForm', sendMailForm)

module.exports = router