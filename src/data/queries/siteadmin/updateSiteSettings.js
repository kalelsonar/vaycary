import UpdateSiteSettingsType from '../../types/siteadmin/UpdateSiteSettingsType';
import { SiteSettings, Listing } from '../../../data/models';

import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLBoolean as BooleanType
} from 'graphql';

const updateSiteSettings = {

  type: UpdateSiteSettingsType,

  args: {
    siteName: { type: StringType },
    siteTitle: { type: StringType },
    metaDescription: { type: StringType },
    logo: { type: StringType },
    facebookLink: { type: StringType },
    twitterLink: { type: StringType },
    instagramLink: { type: StringType },
    homePageType: { type: IntType },
    metaKeyword: { type: StringType },
    phoneNumberStatus: { type: IntType },
    homeLogo: { type: StringType },
    emailLogo: { type: StringType },
    appAvailableStatus: { type: BooleanType },
    playStoreUrl: { type: StringType },
    appStoreUrl: { type: StringType },
    email: { type: StringType },
    phoneNumber: { type: StringType },
    address: { type: StringType },
    listingApproval: { type: StringType },
    cancellationInfo: { type: StringType },
    appForceUpdate: { type: StringType },
    androidVersion: { type: StringType },
    iosVersion: { type: StringType },
    ogImage: { type: StringType }
  },

  async resolve({ request }, {
    siteName,
    siteTitle,
    metaDescription,
    logo,
    facebookLink,
    twitterLink,
    instagramLink,
    homePageType,
    metaKeyword,
    phoneNumberStatus,
    homeLogo,
    emailLogo,
    appAvailableStatus,
    playStoreUrl,
    appStoreUrl,
    email,
    phoneNumber,
    address,
    listingApproval,
    cancellationInfo,
    appForceUpdate,
    androidVersion,
    iosVersion,
    ogImage
  }) {

    if (request.user && request.user.admin == true) {


      let siteSettingsFields = {
        siteName,
        siteTitle,
        metaDescription,
        logo,
        facebookLink,
        twitterLink,
        instagramLink,
        homePageType,
        metaKeyword,
        phoneNumberStatus,
        homeLogo,
        emailLogo,
        appAvailableStatus,
        playStoreUrl,
        appStoreUrl,
        email,
        phoneNumber,
        address,
        cancellationInfo,
        appForceUpdate,
        androidVersion,
        iosVersion,
        ogImage
      };

      await Promise.all([
        Object.keys(siteSettingsFields).map(async (item) => {
          await SiteSettings.update({ value: siteSettingsFields[item] }, { where: { name: item } })
        })
      ])

      //Update Listing Approval
      const updateListingApproval = await SiteSettings.update({ value: listingApproval }, { where: { name: "listingApproval" } })
        .then(async function (instance) {
          if (instance > 0) {
            if (listingApproval === '1') {
              const updateListingPublished = await Listing.update({
                listApprovalStatus: 'approved'
              },
                {
                  where:
                  {
                    isPublished: 1
                  }
                });
              const updateListingUnPublished = await Listing.update({
                listApprovalStatus: null
              },
                {
                  where:
                  {
                    isPublished: 0
                  }
                });
            } else {
              const updateListing = await Listing.update({
                listApprovalStatus: 'approved',
              },
                {
                  where:
                  {
                    isPublished: 0
                  }
                });
            }

          }
        });

      return {
        status: 200
      }

    } else {
      return {
        status: 400
      }
    }

  },
};

export default updateSiteSettings;
