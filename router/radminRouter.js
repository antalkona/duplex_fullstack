
const { Router } = require('express');
const userController = require('../controllers/admin');

const adminRouter = Router();

adminRouter.post('/login', userController.adminLogin)
adminRouter.get('/refresh', userController.refresh)
adminRouter.get('/logout', userController.logout)
adminRouter.post('/sendshed', userController.sendshed)
adminRouter.post('/sendshed/dat', userController.sheddat)
adminRouter.post('/sendshed/dat/del', userController.sheddatDel)
adminRouter.post('/req/data', userController.datareq)


module.exports = adminRouter;
