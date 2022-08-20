const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/user', authMiddleware, userController.getUser);
router.put('/user', authMiddleware, userController.updateUser);

module.exports = router;