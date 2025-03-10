'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('UserClaim')
    ])
  },  

  down: (queryInterface, Sequelize) => {
    return true
  }
};
