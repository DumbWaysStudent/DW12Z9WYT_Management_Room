"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          email: "rizky@ari.com",
          password: "12345",
          name: "rizky",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: "test@test.com",
          password: "54321",
          name: "test",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
