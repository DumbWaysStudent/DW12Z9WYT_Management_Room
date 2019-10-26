"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "bookeds",
      [
        {
          room_id: 1,
          guest_id: 1,
          is_done: true,
          is_booked: true,
          check_in: new Date(),
          check_out: new Date()
        },
        {
          room_id: 2,
          guest_id: 2,
          is_done: true,
          is_booked: true,
          check_in: new Date(),
          check_out: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bookeds", null, {});
  }
};
