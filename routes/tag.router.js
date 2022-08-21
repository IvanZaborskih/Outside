const Router = require('express');
const router = new Router();
const tagController = require('../controllers/tag.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, tagController.postTag);
router.get('/:id', authMiddleware, tagController.getTag);
router.put('/:id', authMiddleware, tagController.updateTag);
// router.delete('/tag/id', authMiddleware, userController.deleteUser);

module.exports = router;