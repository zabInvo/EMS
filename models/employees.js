"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employees.associate = (models) => {
        Employees.belongsToMany(models.Company, { through: "EmployeeCompany" });
        Employees.hasOne(models.Salary);
        Employees.hasMany(models.Attendance);
      };
    }
  }
  Employees.init(
    {
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [5, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Employees",
    }
  );
  return Employees;
};
