'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  
    
  // return queryInterface.addColumn(
  //   'items',
  //   'donatedItemsId',
  //   {
  //     type: Sequelize.INTEGER,
  //     references: {
  //       model: 'items'
  //     },
  //     allowNull: true
  //   }
  // );





  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
