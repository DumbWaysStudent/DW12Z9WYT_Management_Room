'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'rooms',
      [
        {
          room_name: 'A1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          room_name: 'A2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          room_name: 'A3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          room_name: 'B1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rooms', null, {});
  },
};
