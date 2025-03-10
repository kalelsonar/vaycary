'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE PaymentMethods SET name= "PayPal" WHERE id = 1')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('UPDATE PaymentMethods SET name= "Paypal" WHERE id = 1')
  }
};
