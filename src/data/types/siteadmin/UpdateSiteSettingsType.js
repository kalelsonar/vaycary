import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLBoolean as BooleanType
} from 'graphql';

const UpdateSiteSettingsType = new ObjectType({
  name: 'UpdateSiteSettings',
  fields: {
    siteName: { type: new NonNull(StringType) },
    siteTitle: { type: new NonNull(StringType) },
    metaDescription: { type: StringType },
    metaKeyword: { type: StringType },
    logo: { type: new NonNull(StringType) },
    facebookAPI: { type: StringType },
    facebookAPISecret: { type: StringType },
    googleAPI: { type: StringType },
    googleAPISecret: { type: StringType },
    googleMapAPI: { type: new NonNull(StringType) },
    googleMapServerAPI: { type: new NonNull(StringType) },
    googleAnalytics: { type: StringType },
    facebookLink: { type: StringType },
    twitterLink: { type: StringType },
    instagramLink: { type: StringType },
    status: { type: IntType },
    errorMessage: { type: StringType },
    phoneNumberStatus: { type: IntType },
    homeLogo: { type: StringType },
    appAvailableStatus: { type: BooleanType },
    playStoreUrl: { type: StringType },
    appStoreUrl: { type: StringType },
    maxUploadSize: { type: StringType },
    pushNotificationKey: { type: StringType },
    deepLinkBundleId: { type: StringType },
    smtpHost: { type: StringType },
    smtpPort: { type: StringType },
    smptEmail: { type: StringType },
    smtpSender: { type: StringType },
    smtpSenderEmail: { type: StringType },
    smtpPassWord: { type: StringType },
    twillioAccountSid: { type: StringType },
    twillioAuthToken: { type: StringType },
    twillioPhone: { type: StringType },
    paypalClientId: { type: StringType },
    paypalSecret: { type: StringType },
    paypalHost: { type: StringType },
    ogImage: { type: StringType }
  },
});

export default UpdateSiteSettingsType;
