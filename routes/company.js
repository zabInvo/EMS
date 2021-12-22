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
