'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [
      {
        title: 'Max Upload Size',
        name: 'maxUploadSize',
        value: '10',
        type: 'site_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PushNotification Key',
        name: 'pushNotificationKey',
        value: 'AAAAK5aHG3c:APA91bG60ridFhKm7c4uAR-y_zON1wfhHpcgQWmbsU9byWDBky-7h-EEyulelmQq3CyQMOTuR347cmuXgxHruPKuU5THav1-UB440V5mRVbbfzLFZm34CB2APfDApkY7FagkrkZz796Q',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Deep Link Bundle Id',
        name: 'deepLinkBundleId',
        value: 'XAQ5F75F7R.com.rs.RentALL',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smtp Host',
        name: 'smtpHost',
        value: 'smtp.sendgrid.net',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smtp Port',
        name: 'smtpPort',
        value: '587',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smpt Email',
        name: 'smptEmail',
        value: 'apikey',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smtp Sender',
        name: 'smtpSender',
        value: 'RentALL',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Smtp Sender Email',
        name: 'smtpSenderEmail',
        value: 'admin@gmail.com',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Smtp PassWord',
        name: 'smtpPassWord',
        value: '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',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Twillio AccountSid',
        name: 'twillioAccountSid',
        value: 'ACcd400137b32ab6a7243cc324929c51fd',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Twillio AuthToken',
        name: 'twillioAuthToken',
        value: '599880fe92a1e012e74b7f1ceb036fe0',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Twillio Phonenumber',
        name: 'twillioPhone',
        value: '+15103984916',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PayPal Email',
        name: 'paypalEmail',
        value: 'redhoodcool-business@gmail.com',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PayPal ClientId',
        name: 'paypalClientId',
        value: 'Abax6FHO5FW8ausREpc182FX6Jwgq7ICYyUF6IBf_Pfi8-40CIXHMZL4l2TkMrVUznVG_2Q8yQLUb860',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PayPal Secret',
        name: 'paypalSecret',
        value: 'EG6BrUaD-nArhcjJT3CDzCPeM-ENANATVbsXvTC-y-CMIVCccjP0ehkIX6Q5Vh9wC2HRInzxRsPfyFQZ',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PayPal Host',
        name: 'paypalHost',
        value: 'api.sandbox.paypal.com',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'PayPal HostMode',
        name: 'paypalHostMode',
        value: 'sanbox',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};

