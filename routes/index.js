const Router = require('express');
const router = new Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const tagRouter = require('./tag.router');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/tag', tagRouter);

module.exports = router;