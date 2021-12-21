"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface
      .addColumn(
        // Admin hasOne Company
        "Companies",
        "AdminId",
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Admins",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        }
      )
      .then(() => {
        return queryInterface.createTable(
          // Employee belongsToMany Company
          "EmployeeCompany",
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            EmployeeId: {
              type: Sequelize.INTEGER,
              references: {
                model: "Employees",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            },
            CompanyId: {
              type: Sequelize.INTEGER,
              references: {
                model: "Companies",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            },
          }
        );
      })
      .then(() => {
        return queryInterface.addColumn("Salaries", "EmployeeId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Employees",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.addColumn("Attendances", "EmployeeId", {
          type: Sequelize.INTEGER,
          references: {
            model: "Employees",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface
      .removeColumn(
        "Companies", // name of Source model
        "AdminId" // key we want to remove
      )
      .then(() => {
        // remove Payment hasOne Order
        return queryInterface.removeColumn(
          "Salaries", // name of the Target model
          "EmployeeId" // key we want to remove
        );
      })
      .then(() => {
        // remove Order hasMany Product
        return queryInterface.removeColumn(
          "Attendances", // name of the Target model
          "EmployeeId" // key we want to remove
        );
      })
      .then(() => {
        return queryInterface.dropTable("EmployeeCompany");
      });
  },
};
