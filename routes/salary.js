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

/**
 * @swagger
 * components:
 *   schemas:
 *     Salary:
 *       type: object
 *       properties:
 *         salary:
 *           type: string
 *           description: Date of the attendance
 *           example: 50000
 *         EmployeeId:
 *           type: string
 *           description: Status of the attendance
 *           example:  32
 */

/**
 * @swagger
 * tags:
 *   name: Salary
 *   description: The Salary API
 */

/**
 * @swagger
 * /api/salary/addSalary:
 *   post:
 *     summary: create a salary for employee
 *     tags: [Salary]
 *     responses:
 *       200:
 *         description: Salary Added Successfully
 *       500:
 *         description: Internal Server Error
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the admin
 *        required: true
 *        type: string
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Salary'
 *
 */

/**
 * @swagger
 * /api/salary/updateSalary:
 *   post:
 *     summary: update salary of employee
 *     tags: [Salary]
 *     responses:
 *       200:
 *         description: Array of objects containing user attendance data 
 *       500:
 *         description: Internal Server Error
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the employee 
 *        required: true
 *        type: string
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Salary'
 *
 */

/**
 * @swagger
 * /api/salary/getUserSalary:
 *   post:
 *     summary: get user salary details
 *     tags: [Salary]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the employee
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: amount of employee salary
 *       500:
 *         description: Internal Server Error
 *
 */

/**
 * @swagger
 * /api/salary/getAllSalary:
 *   post:
 *     summary: get all users salary
 *     tags: [Salary]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the admin
 *        required: true
 *        type: string
 *     requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                companyId:
 *                   type: string
 *                   example: 18
 *     responses:
 *       200:
 *         description: Array of objects containing user salary data 
 *       500:
 *         description: Internal Server Error
 *
 */