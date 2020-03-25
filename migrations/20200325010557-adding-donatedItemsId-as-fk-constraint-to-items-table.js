'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    items.associate = function(models){
      items.belongsTo(models.Donations,{foreignkey:id});
    };
    return items;

    //azams class
  //  return queryInterface.addConstraint(
    //    'items',
    //    ['donatedItemsId'],{
    //      type: 'FOREIGN KEY',
    //      references: {
    //        name: 'donatedItemsId-fk-in-items',
    //        table: 'Donations',
    //        field: 'id'
    //      }
    //    }
    //  )

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
