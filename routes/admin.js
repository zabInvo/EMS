const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AdminController");
const middleware = require("../middleware/authentication");

const { body } = require("express-validator");

// ALL CRUD ROUTES FOR ADMIN
router.post(
  "/create",
  body("name", "Name is required!").exists(),
  body("email", "Email must be valid").exists().isEmail(),
  body("password", "Invalid Password! Password must be 6 characters long")
    .exists()
    .isLength({ min: 6 }),
  adminController.createAdmin
);
router.post(
  "/login",
  body("email", "Email must be valid").exists().isEmail(),
  body("password", "Invalid Password").exists(),
  adminController.login
);
router.post("/getAdmins", middleware.checkAuth, adminController.getAll);
router.post(
  "/updatePassword",
  middleware.checkAuth,
  body("oldPassword", "Invalid Password! Password must be 6 characters long")
    .exists()
    .isLength({ min: 6 }),
  body("newPassword", "Invalid Password! Password must be 6 characters long")
    .exists()
    .isLength({ min: 6 }),
  adminController.updatePassword
);
// ROUTE FOR SAVE IMAGE IN DATABASE
router.post("/uploadImage", middleware.checkAuth, adminController.uploadImage);
router.post(
  "/getDashboardStats",
  middleware.checkAuth,
  adminController.getDashboardStats
);
router.get("/fetchImage/:id", adminController.fetchImage);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the admin
 *           example: Ali
 *         email:
 *           type: string
 *           description: Email of the admin
 *           example:  ali@gmail.com
 *         password:
 *           type: string
 *           description: Password of the admin
 *           example:  '123456'
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: The Admin API
 */

/**
 * @swagger
 * /api/admin/create:
 *   post:
 *     summary: create a new admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin Created Successfully
 *       500:
 *         description: Internal Server Error
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Admin'
 *
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: login admin
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin login Successfully
 *       500:
 *         description: Internal Server Error
 *     requestBody:
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Admin'
 *
 */

/**
 * @swagger
 * /api/admin/getAdmins:
 *   post:
 *     summary: Get all admin
 *     tags: [Admin]
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the admin
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Array Of Objects Containing Admin Data
 *       500:
 *         description: Internal Server Error
 *
 */

/**
 * @swagger
 * /api/admin/updatePassword:
 *   post:
 *     summary: Update admin Password
 *     tags: [Admin]
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
