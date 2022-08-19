const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post('/signin', [
	check('password', 'Password must have more 8 symbols').isLength({ min: 8 })
], authController.signIn);

module.exports = router;