"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "rooms",
      [
        {
          room_name: "A1"
        },
        {
          room_name: "A2"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("rooms", null, {});
  }
};
