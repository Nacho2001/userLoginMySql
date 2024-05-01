// Dependencias
const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

// Definición de los endpoints a las consultas del controller

// Obtener usuarios
router.get('/', controller.getUsers);

// Obtener usuario por Username
router.get('/:usuario', controller.getUniqueUser);

// Borrar usuario
router.delete('/:id', controller.deleteUser);

// Actualizar usuario
router.put('/:id', controller.updateUser);

module.exports = router