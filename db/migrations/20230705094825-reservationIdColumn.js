'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Reservation', 'threadId', {
        type: Sequelize.DataTypes.INTEGER,
      }),
      queryInterface.addColumn('ThreadItems', 'status', {
        type: Sequelize.ENUM('pending', 'preApproved', 'booked'),
        defaultValue: null
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Reservation', 'threadId'),
      queryInterface.removeColumn('ThreadItems', 'status'),
    ]);
  },
};
