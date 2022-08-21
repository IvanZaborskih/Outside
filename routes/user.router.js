const Router = require('express');
const router = new Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.get('/', authMiddleware, userController.getUser);
router.put('/', authMiddleware, userController.updateUser);
router.delete('/', authMiddleware, userController.deleteUser);

module.exports = router;