'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'cleaningPrice', {
        type: Sequelize.DOUBLE
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.DOUBLE
      }),
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.DOUBLE
      })
    ]
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.changeColumn('ListingData', 'cleaningPrice', {
        type: Sequelize.FLOAT
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.FLOAT
      }),
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.FLOAT
      })
    ]
  }
};