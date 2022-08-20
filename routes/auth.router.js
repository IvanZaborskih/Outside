const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/signin', authController.signIn);
router.post('/login', authController.login);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;