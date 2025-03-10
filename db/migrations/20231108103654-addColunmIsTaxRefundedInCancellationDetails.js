'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('CancellationDetails', 'isTaxRefunded', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('CancellationDetails', 'isTaxRefunded'),
    ])
  }
};
