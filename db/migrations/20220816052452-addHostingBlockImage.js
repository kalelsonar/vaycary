'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
        {
          title: 'Hosting Block Image 1',
          value: '',
          name: 'hostingBlockImage1',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Hosting Block Image 2',
          value: '',
          name: 'hostingBlockImage2',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Hosting Block Image 3',
          value: '',
          name: 'hostingBlockImage3',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: [
            'hostingBlockImage1',
            'hostingBlockImage2',
            'hostingBlockImage3',
          ]
        }
      })
    ])
  }
};
