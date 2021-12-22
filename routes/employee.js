const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const employeeController = require('../controllers/EmployeeController');

// All CRUD ROUTES FOR EMPLOYEES

router.post('/create', middleware.checkAuth, employeeController.createEmployee);


module.exports = router;