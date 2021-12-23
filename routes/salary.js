const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const salaryController = require('../controllers/SalaryController');

// CRUD FOR SALARY
router.post('/addSalary', middleware.checkAuth, salaryController.createSalary);
router.post('/updateSalary', middleware.checkAuth, salaryController.updateSalary);
router.post('/getUserSalary', middleware.checkAuth, salaryController.getUserSalary);
router.post('/getAllSalary', middleware.checkAuth, salaryController.getAllSalary);


module.exports = router

