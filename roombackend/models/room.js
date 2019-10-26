'use strict';
module.exports = (sequelize, DataTypes) => {
  const room = sequelize.define('room', {
    room_name: DataTypes.STRING
  }, {});
  room.associate = function(models) {
    // associations can be defined here
  };
  return room;
};