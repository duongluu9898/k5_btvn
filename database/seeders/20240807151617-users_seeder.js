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
        status: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "duong luu",
        email: "duongluu9898@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        status: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "duong luu",
        email: "duongluu1301@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        status: true,
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
