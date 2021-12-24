const EmployeeModel = require("../models").Employees;
const AdminModel = require("../models").Admin;
const CompanyModel = require("../models").Company;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// CREATE NEW EMPLOYEE ROUTE
module.exports.createEmployee = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const company = await CompanyModel.findByPk(req.body.companyId);
    if (admin) {
      const saltRounds = 10;
      const salt = await bcrypt.genSaltSync(saltRounds);
      const hash = await bcrypt.hashSync(req.body.password, salt);
      const payload = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
      };
      const employee = await EmployeeModel.create(payload);
      await company.addEmployee(employee);
      res.status(200).json({ message: "Employee Created Successfully" });
    } else {
      res
        .status(403)
        .json({ message: "You are authorized to perform this action" });
    }
  } catch (error) {
    res.status(500).json({
      error: error ? error : "Internal Server Error",
    });
  }
};

// EMPLOYEE LOGIN ROUTE
module.exports.login = async (req, res) => {
  try {
    const user = await EmployeeModel.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (user) {
      const comparePassword = await bcrypt.compareSync(
        req.body.password,
        user[0].password
      );
      if (comparePassword == true) {
        await jwt.sign(
          { id: user[0].id },
          process.env.private_key,
          { expiresIn: "12h" },
          function (err, token) {
            res
              .status(200)
              .json({ token: token, message: "User Login Sucessfully" });
          }
        );
      } else {
        res.status(401).json({ error: "Invalid password, please try again" });
      }
    } else {
      res
        .status(401)
        .json({ error: "Invalid email, this email is not registered" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// UPDATE EMPLOYEE PASSWORD ROUTE
module.exports.updatePassword = async (req, res) => {
  try {
    const user = await EmployeeModel.findOne({
      where: {
        id: req.user,
      },
    });
    if (user) {
      const comparePassword = await bcrypt.compareSync(
        req.body.oldPassword,
        user.password
      );
      if (comparePassword == true) {
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.newPassword, salt);
        const changePassword = await user.update({
          password: hash,
        });
        res.status(200).json({ message: "Password Updated Sucessfully" });
      } else {
        res.status(403).json({ message: "Invalid Old Password" });
      }
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({
      error: error ? error : "Internal Server Error",
    });
  }
};

// DELETE EMPLOYEE ROUTE
module.exports.deleteEmployee = async (req, res) => {
  try {
    const checkAdmin = await AdminModel.findOne({
      where: {
        id: req.user,
      },
    });
    if (checkAdmin) {
      const user = await EmployeeModel.findOne({
        where: {
          id: req.body.id,
        },
      });
      if (user) {
        const deleteUser = await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
      } else {
        res.status(403).json({ message: "No user found!" });
      }
    } else {
      res.status(403).json({ message: "You are authorized for this action" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// DELETE EMPLOYEE ROUTE
module.exports.assignComapny = async (req, res) => {
  try {
    // CHECK isAdmin
    const checkAdmin = await AdminModel.findOne({
      where: {
        id: req.user,
      },
      include: {
        model: CompanyModel,
      },
    });
    // CHECK COMPANY BELONGS TO ADMIN
    const checkCompany = checkAdmin.Companies.find((item) => {
      return item.id == parseInt(req.body.companyId) ? item : false;
    });
    if (checkCompany) {
      let user = await EmployeeModel.findByPk(req.body.userId);
      const assignCompany = await checkCompany.addEmployees(user);
      res.status(200).json({ message: "User Added To Company Successfully" });
    } else {
      res.status(403).json({ message: "No company found!" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// DELETE EMPLOYEE ROUTE
module.exports.uploadImage = async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
      res.status(200).json({ message: "Image Uploaded Successfully" });
    } else {
      res.status(500).json({
        error: "Error while uploading Image",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
