const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Usamos los nombres exactos que exportamos en el controlador
router.post('/login', authController.login);
router.post('/register-master', authController.registerMaster); 

module.exports = router;
