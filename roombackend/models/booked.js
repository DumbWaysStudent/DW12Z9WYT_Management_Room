"use strict";
module.exports = (sequelize, DataTypes) => {
  const booked = sequelize.define(
    "booked",
    {
      room_id: DataTypes.INTEGER,
      guest_id: DataTypes.INTEGER,
      is_done: DataTypes.BOOLEAN,
      is_booked: DataTypes.BOOLEAN,
      check_in: DataTypes.TIME,
      check_out: DataTypes.TIME
    },
    {}
  );
  booked.associate = function(models) {
    booked.belongsTo(models.room, {
      as: "roomId",
      foreignKey: "room_id"
    });
  };
  return booked;
};
