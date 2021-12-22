const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');
const middleware = require('../middleware/authentication');


// ALL CRUD ROUTES FOR ADMIN
router.post('/create', adminController.createAdmin);
router.post('/login', adminController.login);
router.post('/getAdmins', middleware.checkAuth, adminController.getAll);
router.post('/updatePassword',middleware.checkAuth, adminController.updatePassword);


module.exports = router;
