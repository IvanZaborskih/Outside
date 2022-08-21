const Router = require('express');
const router = new Router();
const tagController = require('../controllers/tag.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, tagController.postTag);
// router.get('/user', authMiddleware, userController.getUser);
// router.put('/user', authMiddleware, userController.updateUser);
// router.delete('/tag/id', authMiddleware, userController.deleteUser);

module.exports = router;