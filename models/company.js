'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.associate = models => {
        Company.belongsTo(models.Admin);
        Company.belongsToMany(models.Employees, {through: 'EmployeeCompany'});
      }
    }
  };
  Company.init({
    name: {
      type : DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    address: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};