// Dependencias
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Crear usuario nuevo
router.post('/', controller.createUser);

module.exports = router;