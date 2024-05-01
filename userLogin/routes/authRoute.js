const express = require('express');
const { autenticacion } = require('../controllers/authController');
const router = express.Router();

router.post('/', autenticacion);

module.exports = router;