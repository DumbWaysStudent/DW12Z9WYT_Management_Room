'use strict';
module.exports = (sequelize, DataTypes) => {
  const customer = sequelize.define('customer', {
    identity_number: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {});
  customer.associate = function(models) {
    // associations can be defined here
  };
  return customer;
};