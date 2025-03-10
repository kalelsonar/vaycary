import {
  GraphQLList as List,
  GraphQLString as StringType
} from 'graphql';
import { SiteSettings } from '../../../data/models';
import SiteSettingsType from '../../types/siteadmin/SiteSettingsType';

const siteSettings = {

  type: new List(SiteSettingsType),

  args: {
    type: { type: StringType },
  },

  async resolve({ request }, { type }) {

    let where = {}
    where['name'] = {
      $in: ['siteName', 'siteTitle', 'metaKeyword', 'metaDescription', 'facebookLink', 'twitterLink', 'logoHeight',
        'logoWidth', 'homePageType', 'videoLink', 'phoneNumberStatus', 'cancellationInfo', 'maxUploadSize', 'faviconLogo', 'listingApproval',
        'address', 'phoneNumber', 'email', 'appStoreUrl', 'playStoreUrl', 'appAvailableStatus', 'emailLogo', 'homeLogo', 'Logo', 'homeLogoWidth', 'homeLogoHeight', 'instagramLink', 'ogImage']
    };

    if (request.user && request.user.admin) {
      where['name'] = {
        notIn: ['platformSecretKey']
      };
      if (type) {
        where = {
          type: {
            $in: [type, 'appSettings']
          },
          name: {
            $ne: 'platformSecretKey'
          },
        }
      }
    }

    // Get Specific Type of Settings Data
    const siteSettingsData = await SiteSettings.findAll({
      attributes: [
        'id',
        'title',
        'name',
        'value',
        'type'
      ],
      where
    });

    return siteSettingsData;

  },
};

export default siteSettings;
