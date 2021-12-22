const EmployeeModel = require("../models").Employees;
const AdminModel = require("../models").Admin;
const CompanyModel = require("../models").Company;
const bcrypt = require("bcrypt");

module.exports.createEmployee = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const company = await CompanyModel.findByPk(req.body.companyId);
    if (admin) {
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        const payload = {
            name : req.body.name,
            email: req.body.email,
            password: hash
        }
        const employee = await EmployeeModel.create(payload);
        await company.addEmployee(employee);
        res
        .status(200)
        .json({ message: "Employee Created Successfully" });
    } else {
      res
        .status(403)
        .json({ message: "You are authorized to perform this action" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error
          ? error
          : "Internal Server Error",
    });
  }
};
