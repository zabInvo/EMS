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



/**
 * @swagger
 * components:
 *   schemas:
 *     Employees:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the employee
 *           example: Ali
 *         email:
 *           type: string
 *           description: Email of the employee
 *           example:  ali@gmail.com
 *         password:
 *           type: string
 *           description: Password of the employee
 *           example:  '123456'
 *         imagePath:
 *           type: string
 *           description: Profile Image of the employee
 *           example:  fileType
 */

/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: The Employees API
 */

/**
 * @swagger
 * /api/employee/create:
 *   post:
 *     summary: create a new employee
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: User Created Successfully
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
 *                 $ref: '#/components/schemas/Employees'
 *
 */

/**
 * @swagger
 * /api/employee/login:
 *   post:
 *     summary: login employee
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: User login Successfully
 *       500:
 *         description: Internal Server Error
 *     requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                   type: string
 *                   example: ali@gmail.com
 *                password:
 *                    type: string
 *                    example: 123456
 *
 */

/**
 * @swagger
 * /api/employee/updatePassword:
 *   post:
 *     summary: Update employee Password
 *     tags: [Employees]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the employee
 *        required: true
 *        type: string
 *     requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                password:
 *                   type: string
 *                   example: 123456
 *                oldpassword:
 *                    type: string
 *                    example: 123456
 *     responses:
 *       200:
 *         description: Password Updated Successfully
 *       500:
 *         description: Internal Server Error
 *
 */


/**
 * @swagger
 * /api/employee/deleteEmployee:
 *   post:
 *     summary: Delete employee
 *     tags: [Employees]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the Admin
 *        required: true
 *        type: string
 *     requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                id:
 *                   type: string
 *                   example: 29
 *     responses:
 *       200:
 *         description: User Deleted Successfully
 *       500:
 *         description: Internal Server Error
 *
 */

/**
 * @swagger
 * /api/employee/assignComapny:
 *   post:
 *     summary: Assign New Company to Employee
 *     tags: [Employees]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the Admin
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
 *                   example: 29
 *                userId:
 *                   type: string
 *                   example: 32
 *     responses:
 *       200:
 *         description: User Added To Company Successfully
 *       500:
 *         description: Internal Server Error
 *
 */

/**
 * @swagger
 * /api/employee/uploadImage:
 *   post:
 *     summary: Update Employee Profile Image
 *     tags: [Employees]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the employee
 *        required: true
 *        type: string
 *     requestBody:
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                userImage:
 *                   type: fileType
 *                   example: image.jpeg
 *     responses:
 *       200:
 *         description: Image Added Successfully
 *       500:
 *         description: Internal Server Error
 *
 */