'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    room_id: DataTypes.INTEGER,
    guest_id: DataTypes.INTEGER,
    is_done: DataTypes.BOOLEAN,
    is_booked: DataTypes.BOOLEAN,
    duration: DataTypes.INTEGER,
    check_out: DataTypes.DATE
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};