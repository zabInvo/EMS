const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const employeeController = require('../controllers/EmployeeController');

// All CRUD ROUTES FOR EMPLOYEES
router.post('/login', employeeController.login);
router.post('/create', middleware.checkAuth, employeeController.createEmployee);
router.post('/updatePassword', middleware.checkAuth, employeeController.updatePassword);
router.post('/deleteEmployee', middleware.checkAuth, employeeController.deleteEmployee);
router.post('/assignComapny', middleware.checkAuth, employeeController.assignComapny);



module.exports = router;