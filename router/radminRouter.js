
const { Router } = require('express');
const userController = require('../controllers/admin');

const adminRouter = Router();

adminRouter.post('/login', userController.adminLogin)
adminRouter.get('/refresh', userController.refresh)
adminRouter.post('/req/data', userController.datareq)


module.exports = adminRouter;
