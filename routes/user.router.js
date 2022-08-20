const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/user', authMiddleware, userController.getUser);
router.put('/user', [
	check('password')
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).withMessage('The password must contain at least eight characters, at least one uppercase letter, one lowercase letter and one number'),
	check('email')
		.isEmail().withMessage('Not correct email address'),
	check('nickname')
		.isLength({ min: 4 }).withMessage('Nickname must be longer than 4 characters')
], authMiddleware, userController.updateUser);

module.exports = router;