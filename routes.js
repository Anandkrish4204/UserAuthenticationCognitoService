var express = require('express');
var router = express.Router();
var authController = require('./Controller/AuthController');

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/confirmRegistration', authController.registerConfirmation);
//router.post('/auth/validate', authController.validate_token);

module.exports = router;