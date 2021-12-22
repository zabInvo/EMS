"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class EmployeeCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  EmployeeCompany.init(
    {
      EmployeeId: DataTypes.INTEGER,
      CompanyId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "EmployeeCompany",
    }
  );
  return EmployeeCompany;
};
