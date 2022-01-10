const AdminModel = require("../models").Admin;
const EmployeeModel = require("../models").Employees;
const AttendanceModel = require("../models").Attendance;
const CompanyModal = require("../models").Company;

// ROUTE FOR CREATE ATTENDANCE
const createAttendance = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    const user = await EmployeeModel.findByPk(req.body.userId);
    if (admin && user) {
      const checkDuplicate = await AttendanceModel.findOne({
        where: {
          date: req.body.date,
          EmployeeId: req.body.userId,
        },
      });
      if (!checkDuplicate) {
        let payload = {
          date: req.body.date,
          status: req.body.status,
        };
        const attendance = await AttendanceModel.create(payload);
        const assignUser = await user.addAttendance(attendance);
        res.status(200).json({ message: "Attendance Updated Successfully" });
      } else {
        res
          .status(403)
          .json({ message: "Attendance already created for this user! " });
      }
    } else {
      res.status(403).json({ message: "Invalid data!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// ROUTE FOR GET USER ATTENDANCE
const getUserAttendance = async (req, res) => {
  try {
    const attendance = await AttendanceModel.findAll({
      where: {
        EmployeeId: req.user,
      },
      attributes: ["date", "status"],
    });
    res.status(200).json({ data: attendance });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// ROUTE FOR GET ALL ATTENDANCE
const getAllAttendance = async (req, res) => {
  try {
    const admin = await AdminModel.findByPk(req.user);
    if (admin) {
      const attendance = await CompanyModal.findAll({
        where: {
          id: req.body.companyId,
        },
        attributes: [],
        include: {
          model: EmployeeModel,
          attributes: ["name", "email"],
          through: {
            attributes: [],
          },

          include: {
            model: AttendanceModel,
            attributes: ["date", "status"],
          },
        },
      });
      res.status(200).json({ data: attendance });
    } else {
      res
        .status(403)
        .json({ data: "You are not authorized to perform this action" });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  createAttendance,
  getUserAttendance,
  getAllAttendance
}