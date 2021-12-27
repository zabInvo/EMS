const express = require('express');
const router = express.Router();
const middleware = require('../middleware/authentication');
const companyController = require('../controllers/CompanyController');


// All CRUD ROUTES FOR COMPANY
router.post('/create', middleware.checkAuth, companyController.createCompany);
router.post('/getCompanies', middleware.checkAuth, companyController.getCompanies);
router.post('/update', middleware.checkAuth, companyController.updateCompany);
router.post('/delete', middleware.checkAuth, companyController.deleteCompany);

 
module.exports = router;


/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the company
 *           example: InvoZone
 *         address:
 *           type: string
 *           description: Email of the company
 *           example:  Johar Town
 *         type:
 *           type: string
 *           description: Password of the company
 *           example:  Software House
 */

/**
 * @swagger
 * tags:
 *   name: Company
 *   description: The Company API
 */

/**
 * @swagger
 * /api/company/create:
 *   post:
 *     summary: create a new company
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Company Created Successfully
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
 *                 $ref: '#/components/schemas/Company'
 *
 */

/**
 * @swagger
 * /api/company/getCompanies:
 *   post:
 *     summary: get all admin companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Array ob objects containg admin company's data 
 *       500:
 *         description: Internal Server Error
 *     parameters:
 *      - name: token
 *        in: header
 *        description: Auth token of the admin
 *        required: true
 *        type: string
 *
 */

/**
 * @swagger
 * /api/company/update:
 *   post:
 *     summary: Update company details
 *     tags: [Company]
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
 *                id:
 *                   type: string
 *                   example: 25
 *                name:
 *                    type: string
 *                    example: UCP
 *                address:
 *                    type: string
 *                    example: Johar Town Lahore
 *                type:
 *                    type: string
 *                    example: University
 *     responses:
 *       200:
 *         description: Company Updated Successfully
 *       500:
 *         description: Internal Server Error
 *
 */


/**
 * @swagger
 * /api/company/delete:
 *   post:
 *     summary: Delete company
 *     tags: [Company]
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
 *                   example: 26
 *     responses:
 *       200:
 *         description: Company Deleted Successfully
 *       500:
 *         description: Internal Server Error
 *
 */