const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const AdminModel = require("../models").Admin;

// CREATE NEW ADMIN ROUTE
module.exports.createAdmin = async (req, res) => {
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
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// LOGIN ADMIN ROUTE
module.exports.login = async (req, res) => {
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
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// GET ALL ADMINS
module.exports.getAll = async (req, res) => {
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
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// CHANGE/UPDATE ADMIN PASSWORD
module.exports.updatePassword = async (req, res) => {
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
        const checkAdmin = await AdminModel.update(
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
        error && error.errors[0] && error.errors[0].message
          ? error.errors[0].message
          : "Internal Server Error",
    });
  }
};

// GET ALL ADMINS
module.exports.destroyAdmin = async (req, res) => {
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
          error && error.errors[0] && error.errors[0].message
            ? error.errors[0].message
            : "Internal Server Error",
      });
    }
  };