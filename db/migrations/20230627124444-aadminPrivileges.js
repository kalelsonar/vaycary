'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Threads', 'reservationId', {
        type: Sequelize.DataTypes.INTEGER,
      }),
      queryInterface.addColumn('Threads', 'checkIn', {
        type: Sequelize.DataTypes.DATEONLY,
      }),
      queryInterface.addColumn('Threads', 'checkOut', {
        type: Sequelize.DataTypes.DATEONLY,
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Threads', 'reservationId'),
      queryInterface.removeColumn('Threads', 'checkIn'),
      queryInterface.removeColumn('Threads', 'checkOut'),
    ]);
  },
};
