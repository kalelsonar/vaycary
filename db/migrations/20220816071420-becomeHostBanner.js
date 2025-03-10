'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('WhyHostInfoBlock', [
        {
          title: 'Hosting Banner Image',
          value: '',
          name: 'whyhostBannerImage',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Hosting Banner Heading',
          value: 'Join us! Try hosting on Your-Site',
          name: 'whyhostBannerHeading',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ])
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: [
            'whyhostBannerImage',
            'whyhostBannerHeading'
          ]
        }
      })
    ])
  }
};
