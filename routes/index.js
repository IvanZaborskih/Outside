const Router = require('express');
const router = new Router();
const authRouter = require('./auth.router');
const userRouter = require('./user.router');

router.use('/', authRouter);
router.use('/', userRouter);

module.exports = router;