"use strict";

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "admin",
        email: "admin@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "user",
        email: "user@gmail.com",
        password: bcrypt.hashSync("654321", 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      truncate: true,
    });
  },
};
