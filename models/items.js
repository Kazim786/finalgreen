'use strict';
const db = {};
module.exports = (sequelize, DataTypes) => {
  const items = sequelize.define('items', {
    categories: DataTypes.TEXT,
    amount: DataTypes.INTEGER,
    item_Name: DataTypes.TEXT,
    Description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    UserID: DataTypes.TEXT
    
  }, {});
  items.associate = function(models) {
    // associations can be defined here
  };
  return items;
};

// module.exports = db;