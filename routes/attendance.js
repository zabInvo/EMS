const express = require('express');
const router = express.Router();

const middleware = require('../middleware/authentication');
const attendanceController = require('../controllers/AttendanceController');


// CRUD FOR SALARY
router.post('/createAttendance', middleware.checkAuth, attendanceController.createAttendance);
router.post('/getAttendance', middleware.checkAuth, attendanceController.getUserAttendance);
router.post('/getAllAttendance', middleware.checkAuth, attendanceController.getAllAttendance);


module.exports = router

/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         date:
 *           type: date
 *           description: Date of the attendance
 *           example: 2021-12-20
 *         status:
 *           type: string
 *           description: Status of the attendance
 *           example:  Present
 *         userId:
 *           type: string
 *           description: User Id for attendance 
 *           example:  32
 */

/**
 * @swagger
 * tags:
 *   name: Attendance
 *   description: The Attendance API
 */

/**
 * @swagger
 * /api/attendance/create:
 *   post:
 *     summary: create a new attendance
 *     tags: [Attendance]
 *     responses:
 *       200:
 *         description: Attendance Updated Successfully
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
 *                 $ref: '#/components/schemas/Attendance'
 *
 */

/**
 * @swagger
 * /api/attendance/getAttendance:
 *   post:
 *     summary: get all attendance of that users
 *     tags: [Attendance]
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
 *
 */

/**
 * @swagger
 * /api/attendance/getAllAttendance:
 *   post:
 *     summary: get all users attendaces
 *     tags: [Attendance]
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
 *         description: Array of objects containing user attendance data 
 *       500:
 *         description: Internal Server Error
 *
 */