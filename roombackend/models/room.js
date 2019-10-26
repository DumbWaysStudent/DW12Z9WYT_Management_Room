'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define(
    'room',
    {
      room_name: DataTypes.STRING,
    },
    {},
  );
  room.associate = function(models) {
    room.belongsToMany(models.customer, {
      through: models.order,
      as: 'customers',
      foreignKey: 'room_id',
    });
  };
  return room;
};
