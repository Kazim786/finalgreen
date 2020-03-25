'use strict';
const db = {};
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    categories: DataTypes.TEXT,
    amount: DataTypes.INTEGER
  }, {});
  items.associate = function(models) {
    // associations can be defined here
    // items.belongsTo(models.donation, { foreignKey: 'id'});
  };
  return items;
};

// module.exports = db;