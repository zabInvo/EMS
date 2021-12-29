const CompanyModel = require("../models").Company;
const AdminModel = require("../models").Admin;

// CREATE NEW COMPANY ROUTE
const createCompany = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const payload = {
        name: req.body.name,
        address: req.body.address,
        type: req.body.type,
      };
      const company = await CompanyModel.create(payload);
      const companyAdmin = await company.setAdmin(admin);
      res.status(200).json({ message: "Company Created Successfully" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// GET ADMIN COMPANIES ROUTE
const getCompanies = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const companies = await CompanyModel.findAll({
        where: {
          AdminId: req.user,
        },
        attributes: ["id", "name", "address", "type"],
      });
      res.status(200).json({ data: companies });
    } else {
      res.status(403).json({ message: "You are authorized" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// UPDATE COMPANY ROUTE
const updateCompany = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const company = await CompanyModel.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (company) {
        let payload = {};
        if (req.body.name) {
          payload["name"] = req.body.name;
        }
        if (req.body.address) {
          payload["address"] = req.body.address;
        }
        if (req.body.type) {
          payload["type"] = req.body.type;
        }
        const updateCompany = await company.update(payload);
        res.status(200).json({ message: "Company Updated Successfully" });
      } else {
        res.status(403).json({ message: "No company found against this name" });
      }
    } else {
      res.status(403).json({ message: "You are authorized" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// UPDATE COMPANY ROUTE
const deleteCompany = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const company = await CompanyModel.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (company) {
        await company.destroy();
      } else {
        res.status(403).json({ message: "No company found!" });
      }
      res.status(200).json({ message: "Company deleted Successfully" });
    } else {
      res
        .status(403)
        .json({ message: "You are authorized to perform this action" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  updateCompany,
  deleteCompany
}