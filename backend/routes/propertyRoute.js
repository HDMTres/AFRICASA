const express = require('express')
const router = express.Router()
const { createProperty, getAllProperties, getPropertyDetails, updateProperty, deleteProperty } = require('../Controllers/propertyController')

const authMiddleware = require('../middleware/auth')

router.post('/', authMiddleware, createProperty)

router.get('/', getAllProperties)

router.get('/:id', getPropertyDetails)

router.put('/:id', authMiddleware, updateProperty)

router.delete('/:id', authMiddleware, deleteProperty)

module.exports = router 