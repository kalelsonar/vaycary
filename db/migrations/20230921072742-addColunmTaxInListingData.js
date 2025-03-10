'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>{
    return Promise.all([
      queryInterface.addColumn('ListingData', 'tax', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }),
    ])
  },

  down: (queryInterface, Sequelize)=>{
    return Promise.all([
      queryInterface.removeColumn('ListingData', 'tax'),
    ])
  }
};
