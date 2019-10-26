"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "customers",
      [
        {
          identity_number: "KT2105KR",
          name: "Budi",
          phone: 756135,
          image:
            "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png"
        },
        {
          identity_number: "N2158AR",
          name: "Tono",
          phone: 872211,
          image:
            "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("customers", null, {});
  }
};
