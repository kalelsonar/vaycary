'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('PaymentSettings')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true
  }
};
