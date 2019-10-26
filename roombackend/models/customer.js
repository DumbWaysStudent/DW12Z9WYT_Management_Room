'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define(
    'customer',
    {
      identity_number: DataTypes.STRING,
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {},
  );
  customer.associate = function(models) {
    customer.belongsToMany(models.room, {
      through: models.order,
      as: 'rooms',
      foreignKey: 'guest_id',
    });
  };
  return customer;
};
