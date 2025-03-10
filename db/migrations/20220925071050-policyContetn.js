'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkInsert('SiteSettings', [
        {
          title: "Cancellation Information",
          name: 'cancellationInfo',
          value: 'RentALL allows hosts to choose among three standardized cancellation policies (Flexible, Moderate, and Strict) Will be enforced to protect both guest and host alike. Each listing and reservation on our site will clearly state the cancellation policy. Guests while viewing their travel plans are able to review any penalties and also cancel by clicking ‘Cancel’ on the respective reservation. A host will be able to see the number of reservations a guest has Cancelled Over the past 12 months when the guest submits Booking request.',
          type: 'site_settings',
          createdAt: new Date(),
          updatedAt: new Date()
        }]),
      queryInterface.addColumn('Cancellation', 'subTitle', {
        type: Sequelize.TEXT('long')
      }),
      queryInterface.addColumn('Cancellation', 'subContent', {
        type: Sequelize.TEXT('long')
      }),
      queryInterface.addColumn('Cancellation', 'content1', {
        type: Sequelize.TEXT('long')
      }),
      queryInterface.addColumn('Cancellation', 'content2', {
        type: Sequelize.TEXT('long')
      }),
      queryInterface.addColumn('Cancellation', 'content3', {
        type: Sequelize.TEXT('long')
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('SiteSettings', {
      name: {
        $in: ['cancellationInfo']
      }
    }),
      queryInterface.removeColumn('Cancellation', 'subTitle'),
      queryInterface.removeColumn('Cancellation', 'subContent'),
      queryInterface.removeColumn('Cancellation', 'content1'),
      queryInterface.removeColumn('Cancellation', 'content2'),
      queryInterface.removeColumn('Cancellation', 'content3')
  }
};
