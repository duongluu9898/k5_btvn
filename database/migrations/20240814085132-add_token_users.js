"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "reset_token", {
      type: Sequelize.STRING(255),
    });
    await queryInterface.addColumn("users", "expired_token", {
      type: Sequelize.STRING(255),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "reset_token");
    await queryInterface.removeColumn("users", "expired_token");
  },
};
