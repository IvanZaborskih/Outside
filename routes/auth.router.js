const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post('/signin', [
	check('password')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('The password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number'),
	check('email')
		.isEmail().withMessage('Not correct email address'),
	check('nickname')
		.isLength({ min: 4 }).withMessage('Nickname must be longer than 4 characters')
], authController.signIn);
router.post('/login', authController.login);

module.exports = router;