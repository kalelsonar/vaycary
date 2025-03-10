'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SiteSettings', [
      {
        title: 'Facebook App ID',
        name: 'facebookAppId',
        value: 'Your facebook app ID',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Facebook Secret ID',
        name: 'facebookSecretId',
        value: 'Your facebook app secret key',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Google CLient ID',
        name: 'googleClientId',
        value: 'Your google app client ID',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Google Client Secret ID',
        name: 'googleSecretId',
        value: 'Your google app client secret key',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Deep link JSON content',
        name: 'deepLinkContent',
        value: '[ { "relation": [ "delegate_permission/common.handle_all_urls" ], "target": { "namespace": "android_app", "package_name": "com.rentall.radicalstart", "sha256_cert_fingerprints": [ "74:47:9A:BF:3E:33:8D:50:EA:55:21:4A:5C:AB:78:EE:B7:90:DC:4A:52:32:BB:56:1F:11:21:11:C2:93:1A:94" ] } } ]',
        type: 'config_settings',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
};

