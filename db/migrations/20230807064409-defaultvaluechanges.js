'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ThreadItems', 'status', {
        type: Sequelize.ENUM('inquiry', 'preApproved', 'booked'),
        defaultValue: null
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('ThreadItems', 'status', {
        type: Sequelize.ENUM('inquiry', 'preApproved', 'booked'),
        defaultValue: null
      })
    ]);
  },
};
