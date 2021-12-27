const AdminModel = require("../models").Admin;
const EmployeeModel = require("../models").Employees;
const SalaryModel = require("../models").Salary;
const CompanyModal = require("../models").Company;

// ROUTE FOR CREATE SALARY
module.exports.createSalary = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const user = await EmployeeModel.findByPk(req.body.userId);
    if (admin && user) {
      const payload = {
        amount: req.body.salary,
      };
      const checkDuplicate = await SalaryModel.findOne({
        where: {
          EmployeeId: req.body.userId,
        },
      });
      if (!checkDuplicate) {
        const createSalary = await SalaryModel.create(payload);
        const assignEmployee = await user.setSalary(createSalary);
        res.status(200).json({ message: "Salary Added Successfully" });
      } else {
        res
          .status(403)
          .json({ message: "Salary is already created for this employee" });
      }
    } else {
      res.status(403).json({ message: "Invalid data!" });
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

// ROUTE FOR UPDATE SALARY
module.exports.updateSalary = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const user = await EmployeeModel.findByPk(req.body.userId);
    if (admin && user) {
      const payload = {
        amount: req.body.salary,
      };
      const updateSalary = await SalaryModel.update(payload, {
        where: {
          EmployeeId: req.body.userId,
        },
      });
      res.status(200).json({ message: "Salary Updated Successfully" });
    } else {
      res.status(403).json({ message: "Invalid data!" });
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

// ROUTE FOR UPDATE SALARY
module.exports.updateSalary = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const user = await EmployeeModel.findByPk(req.body.userId);
    if (admin && user) {
      const payload = {
        amount: req.body.salary,
      };
      const updateSalary = await SalaryModel.update(payload, {
        where: {
          EmployeeId: req.body.userId,
        },
      });
      res.status(200).json({ message: "Salary Updated Successfully" });
    } else {
      res.status(403).json({ message: "Invalid data!" });
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

// ROUTE FOR GET USER SALARY
module.exports.getUserSalary = async (req, res) => {
  try {
    const userSalary = await SalaryModel.findOne({
      where: {
        EmployeeId: req.user,
      },
      attributes: ["amount"],
    });
    res.status(200).json({ data: userSalary });
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// ROUTE FOR GET USER SALARY
module.exports.getUserSalary = async (req, res) => {
  try {
    const userSalary = await SalaryModel.findOne({
      where: {
        EmployeeId: req.user,
      },
      attributes: ["amount"],
    });
    res.status(200).json({ data: userSalary });
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// ROUTE FOR GET USER SALARY
module.exports.getAllSalary = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const company = await CompanyModal.findOne({
        where: {
          id: req.body.companyId,
        },
        attributes: ["name", "address", "type"],
        include: [
          {
            model: EmployeeModel,
            through: {
              attributes: [],
            },
            attributes: ["name", "id", "email"],
            include: {
              model: SalaryModel,
              attributes: ["amount"],
            },
          },
        ],
      });
      const userSalary = await SalaryModel.findAll({
        attributes: ["amount", "EmployeeId"],
      });
      res.status(200).json({ company: company });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
