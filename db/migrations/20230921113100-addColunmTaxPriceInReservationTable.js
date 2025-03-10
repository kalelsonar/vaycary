'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>{
    return Promise.all([
      queryInterface.addColumn('Reservation', 'taxPrice', {
        type: Sequelize.FLOAT,
        defaultValue: 0
      }),
    ])
  },

  down: (queryInterface, Sequelize)=>{
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'taxPrice'),
    ])
  }
};
