'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.bulkDelete('SiteSettings', {
        name: {
          $in: ['logoHeight', 'logoWidth', 'videoLink', 'homeLogoHeight', 'homeLogoWidth', 'paypalEmail', 'paypalHostMode']
        }
      }),
      queryInterface.bulkDelete('WhyHostInfoBlock', {
        name: {
          $in: ['whyBlockTitle1', 'whyBlockTitle2', 'whyBlockContent1', 'whyBlockContent2', 'coverSectionContent2', 'paymentTitle1', 'paymentTitle2', 'paymentTitle3', 'paymentContent1', 'paymentContent2', 'paymentContent3']
        }
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return true;
  }
};
