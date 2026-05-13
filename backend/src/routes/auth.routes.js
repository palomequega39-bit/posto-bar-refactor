const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Verifica que authController.login y authController.registerMaster existan
router.post('/login', authController.login);
router.post('/register-master', authController.registerMaster); 

module.exports = router;
