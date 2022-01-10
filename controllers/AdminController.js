const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const AdminModel = require("../models").Admin;
const CompanyModel = require("../models").Company;
const EmployeeCompanyModel = require("../models").EmployeeCompany;

// CREATE NEW ADMIN ROUTE
const createAdmin = async (req, res) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(req.body.password, salt);
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };
  try {
    const admin = await AdminModel.create(payload);
    res.status(200).json({ message: "Admin Created Successfully" });
  } catch (error) {
    res.status(500).json({
      error:
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// LOGIN ADMIN ROUTE
const login = async (req, res) => {
  try {
    const user = await AdminModel.findAll({
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
        error.name === "SequelizeValidationError"
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// GET ALL ADMINS
const getAll = async (req, res) => {
  try {
    const checkAdmin = await AdminModel.findOne({
      where: {
        id: req.user,
      },
    });
    if (checkAdmin) {
      const admin = await AdminModel.findAll({ attributes: ["name", "email"] });
      res.status(200).json({ data: admin });
    } else {
      res.status(403).json({ message: "You are authorized for this action" });
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

// CHANGE/UPDATE ADMIN PASSWORD
const updatePassword = async (req, res) => {
  try {
    const user = await AdminModel.findAll({
      where: {
        id: req.user,
      },
    });
    if (user) {
      const comparePassword = await bcrypt.compareSync(
        req.body.oldPassword,
        user[0].password
      );
      if (comparePassword == true) {
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds);
        const hash = await bcrypt.hashSync(req.body.newPassword, salt);
        const changePassword = await AdminModel.update(
          {
            password: hash,
          },
          {
            where: {
              id: req.user,
            },
          }
        );
        res.status(200).json({ message: "Password Updated Sucessfully" });
      } else {
        res.status(403).json({ message: "Invalid Old Password" });
      }
    } else {
      res.status(403).json({ message: "User not found" });
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

// UPLOAD IMAGE TO DATABASE
const uploadImage = async (req, res) => {
  try {
    const user = await AdminModel.findOne({
      where: {
        id: req.user,
      },
    });
    if (user) {
      console.log(req.files.adminImage);
      const saveFile = await user.update({
        imageData: req.files.adminImage.data,
      });
      res.status(200).json({ message: "Image added Sucessfully" });
    } else {
      res.status(403).json({ message: "User not found" });
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

// FETCH IMAGE TO DATABASE
const fetchImage = async (req, res) => {
  const user = await AdminModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (user) {
    const image = user.imageData;
    // let file = await fs.createWriteStream('./uploads/image.jpg').write(image); // Optional If you want to save file in uploads folder.
    res.end(image);
  } else {
    res.end("No Img with that Id!");
  }
};

// GET ALL ADMIN DASHBOARD STATS
const getDashboardStats = async (req, res) => {
  try {
    const checkAdmin = await AdminModel.findOne({
      where: {
        id: req.user,
      },
    });
    if (checkAdmin) {
      const admin = await AdminModel.count();
      const company = await CompanyModel.count({
        where: { AdminId: req.user },
      });
      const employees = await EmployeeCompanyModel.count({
        where: { CompanyId: req.body.companyId },
      });
      const response = {
        admin,
        company,
        employees,
      };
      res.status(200).json({ data: response });
    } else {
      res.status(403).json({ message: "You are authorized for this action" });
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
  createAdmin,
  login,
  getAll,
  updatePassword,
  uploadImage,
  fetchImage,
  getDashboardStats,
};
