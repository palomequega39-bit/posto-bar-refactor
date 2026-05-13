const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register-master', authController.register_master); // Asegúrate que el nombre coincida con el controlador

module.exports = router;