"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.associate = models => {
        Admin.hasMany(models.Company);
      }
    }
  }
  Admin.init(
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
      paranoid: true,
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
