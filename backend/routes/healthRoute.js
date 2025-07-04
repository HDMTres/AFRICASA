const express = require('express');
const router = express.Router();

// Health check endpoint simple
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'AFRICASA Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root endpoint
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'AFRICASA API is running',
    version: '1.0.0'
  });
});

module.exports = router;
