'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Force Update',
        name: 'appForceUpdate',
        value: 'false',
        type: 'appSettings',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'Android Version',
        name: 'androidVersion',
        value: null,
        type: 'appSettings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ]),
      queryInterface.bulkInsert('SiteSettings', [{
        title: 'iOS Version',
        name: 'iosVersion',
        value: null,
        type: 'appSettings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      ]),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['appForceUpdate', 'androidVersion', 'iosVersion']
        }
      }),
    ])
  }
};
