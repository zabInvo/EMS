const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const employeeController = require('../controllers/EmployeeController');
const upload = require('../app').upload;

// All CRUD ROUTES FOR EMPLOYEES
router.post('/login', employeeController.login);
router.post('/create', middleware.checkAuth, employeeController.createEmployee);
router.post('/updatePassword', middleware.checkAuth, employeeController.updatePassword);
router.post('/deleteEmployee', middleware.checkAuth, employeeController.deleteEmployee);
router.post('/assignComapny', middleware.checkAuth, employeeController.assignComapny);
router.post('/uploadImage' , middleware.checkAuth, upload.single('userImage'), employeeController.uploadImage);



module.exports = router;