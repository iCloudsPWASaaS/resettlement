const express = require('express');
const { authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// Public dashboard route (accessible to all authenticated users)
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the dashboard!',
    user: {
      id: req.user.userId,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Manager dashboard route
router.get('/manager', authorizeRoles('ADMIN', 'MANAGER'), (req, res) => {
  res.json({
    message: 'Welcome to the MANAGER dashboard!',
    features: [
      'Team management',
      'Project oversight',
      'Reports generation',
      'Resource allocation'
    ]
  });
});

// Analyst dashboard route
router.get('/analyst', authorizeRoles('ADMIN', 'MANAGER', 'ANALYST'), (req, res) => {
  res.json({
    message: 'Welcome to the ANALYST dashboard!',
    features: [
      'Data analysis',
      'Report creation',
      'Trend identification',
      'Data visualization'
    ]
  });
});

// User dashboard route
router.get('/user', authorizeRoles('ADMIN', 'MANAGER', 'ANALYST', 'USER'), (req, res) => {
  res.json({
    message: 'Welcome to the USER dashboard!',
    features: [
      'View personal data',
      'Submit requests',
      'Access basic reports',
      'Update profile'
    ]
  });
});

module.exports = router;