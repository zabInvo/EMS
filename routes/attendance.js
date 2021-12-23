const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const attendanceController = require('../controllers/AttendanceController');

// CRUD FOR SALARY
router.post('/createAttendance', middleware.checkAuth, attendanceController.createAttendance);
router.post('/getAttendance', middleware.checkAuth, attendanceController.getUserAttendance);
router.post('/getAllAttendance', middleware.checkAuth, attendanceController.getAllAttendance);


module.exports = router

