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
      Employees.belongsToMany(models.Company, { through: "EmployeeCompany", foreignKey: 'EmployeeId' });
      Employees.hasOne(models.Salary);
      Employees.hasMany(models.Attendance);
    }
  }
  Employees.init(
    {
      name: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
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
