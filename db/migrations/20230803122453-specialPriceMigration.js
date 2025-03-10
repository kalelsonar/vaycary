'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListingData', 'cleaningPrice', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      }),
      queryInterface.sequelize.query("UPDATE ListingData SET basePrice = 0 where basePrice IS NULL;"),
      queryInterface.sequelize.query("UPDATE ListingData SET cleaningPrice = 0 where cleaningPrice IS NULL;"),
      queryInterface.sequelize.query("UPDATE ListBlockedDates SET isSpecialPrice = 0 where isSpecialPrice IS NULL;"),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ListingData', 'basePrice', {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.changeColumn('ListingData', 'cleaningPrice', {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.changeColumn('ListBlockedDates', 'isSpecialPrice', {
        type: Sequelize.DOUBLE,
      }),
      queryInterface.sequelize.query("UPDATE ListingData SET basePrice = NULL where basePrice = 0;"),
      queryInterface.sequelize.query("UPDATE ListingData SET cleaningPrice = NULL where cleaningPrice = 0;"),
      queryInterface.sequelize.query("UPDATE ListBlockedDates SET isSpecialPrice = NULL where isSpecialPrice = 0;"),
    ])
  }
};
