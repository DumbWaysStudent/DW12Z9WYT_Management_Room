'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          room_id: 1,
          guest_id: 1,
          is_done: true,
          is_booked: true,
          duration: 10,
          check_out: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {});
  },
};
