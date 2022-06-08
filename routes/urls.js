const express = require('express');
const db = require('./../db/mariadb');
const HealthController = require('../controllers/health.controller');
const EnumController = require('../controllers/enum.controller');
const AuthController = require('../controllers/auth.controller');

const router = express.Router();

// register controllers
const healthController = new HealthController();
healthController.register(router);

const enumController = new EnumController();
enumController.register(router);

const authController = new AuthController();
authController.auth(router);

module.exports = router;
