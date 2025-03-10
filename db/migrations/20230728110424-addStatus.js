'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE ThreadItems SET status = "inquiry" WHERE status = "pending"')
    ])
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.sequelize.query('UPDATE ThreadItems SET status = "pending" WHERE status = "inquiry"')
    ])
  }
};