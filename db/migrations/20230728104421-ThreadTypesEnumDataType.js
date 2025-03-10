'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('ThreadItems', 'status', {
        type: Sequelize.ENUM('inquiry', 'preApproved', 'booked'),
        defaultValue: 'inquiry'
      })
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('ThreadItems', 'status', {
        type: Sequelize.ENUM('pending', 'preApproved', 'booked'),
        defaultValue: 'pending'
      })
    ])
  }
};