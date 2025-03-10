import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLList as List,
} from 'graphql';

import moment from 'moment';

import UserVerifiedInfoType from './UserVerifiedInfoType';
import CancellationType from './CancellationType';
import ListCalendarType from './ListCalendarType';
import UserBedTypes from './UserBedTypes';
import ReviewsType from './ReviewsType';
import ListBlockedDatesType from './ListBlockedDatesType';
import ListingHistoryType from './ListingHistoryType';
import ServiceFeesType from './ServiceFeesType'

//Helper
import { getDateUsingTimeZone } from '../../helpers/dateRange';

import {
  Cancellation, Reviews, ListCalendar, WishList, Listing, BedTypes, ListSettings as ImportedListSettings, ServiceFees, User as ImportedUser,
  ListingData as ImportedListingData, ListPhotos as ImportedListPhotos, UserListingData as ImportedUserListingData, Currencies, CurrencyRates,
  UserProfile, UserVerifiedInfo, UserListingSteps as ImportedUserListingSteps, Recommend as ImportedRecommend,
  ListSettingsTypes as ImportedListSettingsTypes, UserAmenities as ImportedUserAmenities, UserSafetyAmenities as ImportedUserSafetyAmenities,
  UserSpaces as ImportedUserSpaces, UserHouseRules as ImportedUserHouseRules, ListBlockedDates, ListingPermissionHistory
} from '../models';

import { calculateTotalPrice } from '../../helpers/calculateTotalPrice';

const Profile = new ObjectType({
  name: 'profile',
  fields: {
    profileId: { type: IntType },
    firstName: { type: StringType },
    lastName: { type: StringType },
    displayName: { type: StringType },
    dateOfBirth: { type: StringType },
    picture: { type: StringType },
    location: { type: StringType },
    info: { type: StringType },
    createdAt: { type: StringType }
  }
});
const User = new ObjectType({
  name: 'user',
  fields: {
    id: {
      type: StringType,
      resolve(user) {
        return user.id;
      }
    },
    email: {
      type: StringType,
      resolve(user) {
        return user.email;
      }
    },
    profile: {
      type: Profile,
      async resolve(user) {
        return await UserProfile.findOne({
          where: {
            userId: user.id
          }
        });
      }
    },
    verification: {
      type: UserVerifiedInfoType,
      async resolve(user) {
        return await UserVerifiedInfo.findOne({
          where: {
            userId: user.id
          }
        });
      }
    },
    userBanStatus: {
      type: IntType,
      resolve(user) {
        return user.userBanStatus;
      }
    },
    userDeletedAt: {
      type: StringType,
      resolve(user) {
        return user.userDeletedAt;
      }
    },
  }
});
const ListSettingsTypes = new ObjectType({
  name: 'listSettingsTypes',
  fields: {
    id: { type: IntType },
    typeName: { type: StringType },
    typeLabel: { type: StringType },
    step: { type: StringType },
    fieldType: { type: StringType },
    isEnable: { type: StringType },
    status: { type: StringType },
  },
});
const ListSettings = new ObjectType({
  name: 'listSettings',
  fields: {
    id: { type: IntType },
    typeId: { type: IntType },
    itemName: { type: StringType },
    itemDescription: { type: StringType },
    otherItemName: { type: StringType },
    maximum: { type: IntType },
    minimum: { type: IntType },
    startValue: { type: IntType },
    endValue: { type: IntType },
    isEnable: { type: StringType },
    image: { type: StringType },
    settingsType: {
      type: ListSettingsTypes,
      async resolve(listSettings) {
        return await ImportedListSettingsTypes.findOne({
          where: {
            id: listSettings.typeId
          }
        });
      }
    },
  }
});
const UserAmenities = new ObjectType({
  name: 'userAmenities',
  fields: {
    amenitiesId: {
      type: StringType,
      resolve(userAmenities) {
        return userAmenities.amenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(userAmenities) {
        return await ImportedListSettings.findOne({
          where: {
            id: userAmenities.amenitiesId,
            isEnable: '1'
          }
        });
      }
    },
  }
});
const UserSafetyAmenities = new ObjectType({
  name: 'userSafetyAmenities',
  fields: {
    safetyAmenitiesId: {
      type: StringType,
      resolve(userSafetyAmenities) {
        return userSafetyAmenities.safetyAmenitiesId;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(userSafetyAmenities) {
        return await ImportedListSettings.findOne({
          where: {
            id: userSafetyAmenities.safetyAmenitiesId,
            isEnable: '1'
          }
        });
      }
    },
  }
});
// Spaces
const UserSpaces = new ObjectType({
  name: 'userSpaces',
  fields: {
    spacesId: {
      type: StringType,
      resolve(userSpaces) {
        return userSpaces.spacesId;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(userSpaces) {
        return await ImportedListSettings.findOne({
          where: {
            id: userSpaces.spacesId,
            isEnable: '1'
          }
        });
      }
    },
  }
});
// House Rules
const UserHouseRules = new ObjectType({
  name: 'userHouseRules',
  fields: {
    id: { type: IntType },
    houseRulesId: {
      type: StringType,
      resolve(userHouseRules) {
        return userHouseRules.houseRulesId;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(userHouseRules) {
        return await ImportedListSettings.findOne({
          where: {
            id: userHouseRules.houseRulesId,
            isEnable: '1'
          }
        });
      }
    },
  }
});

// BedTypes
const ListBedTypes = new ObjectType({
  name: 'listBedTypes',
  fields: {
    bedType: {
      type: IntType,
      resolve(listBedTypes) {
        return listBedTypes.bedType;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(listBedTypes) {
        return await ImportedListSettings.findOne({
          where: {
            id: listBedTypes.bedType,
            isEnable: '1'
          }
        });
      }
    },
  }
});

// List Blocked Dates
const ListBlockedDatesValue = new ObjectType({
  name: 'listBlockedDates',
  fields: {
    blockedDates: {
      type: StringType,
      resolve(listBlockedDates) {
        return listBlockedDates.blockedDates;
      }
    },
    reservationId: {
      type: IntType,
      resolve(listBlockedDates) {
        return listBlockedDates.reservationId;
      }
    },
    calendarStatus: {
      type: StringType,
      resolve(listBlockedDates) {
        return listBlockedDates.calendarStatus;
      }
    },
    isSpecialPrice: {
      type: FloatType,
      resolve(listBlockedDates) {
        return listBlockedDates.isSpecialPrice;
      }
    },
    dayStatus: { type: StringType },
  }
});
// Listing More Data
const ListingData = new ObjectType({
  name: 'listingData',
  fields: {
    bookingNoticeTime: { type: StringType },
    checkInStart: { type: StringType },
    checkInEnd: { type: StringType },
    maxDaysNotice: { type: StringType },
    minNight: { type: IntType },
    maxNight: { type: IntType },
    basePrice: { type: FloatType },
    cleaningPrice: { type: FloatType },
    tax: { type: FloatType },
    currency: { type: StringType },
    weeklyDiscount: { type: IntType },
    monthlyDiscount: { type: IntType },
    cancellationPolicy: { type: IntType },
    dates: { type: StringType },
    isOneTotalToggle: { type: BooleanType },
    cancellation: {
      type: CancellationType,
      resolve(listingData) {
        return Cancellation.findOne({
          where: {
            id: listingData.cancellationPolicy,
            isEnable: true
          }
        });
      }
    },
    taxRate: { type: FloatType },
    oneTotalPrice: {
      type: FloatType,
      async resolve(listingData) {
        const listBlockedDates = await ListBlockedDates.findAll({
          where: {
            listId: listingData.listId,
            blockedDates: {
              $gte: moment().format('YYYY-MM-DD')
            }
          },
          order: [['createdAt', 'DESC']]
        });
        const serviceFees = await ServiceFees.findAll();
        let baseValue = await Currencies.findOne({ where: { isBaseCurrency: true } });
        const base = baseValue.symbol;
        let data = await CurrencyRates.findAll(), rates = {};

        data.map((item) => {
          rates[item.dataValues.currencyCode] = item.dataValues.rate;
        });
        const { oneTotalPrice } = calculateTotalPrice({ listingData, listBlockedDates, serviceFees, base, rates });
        return oneTotalPrice > 0 ? oneTotalPrice : 0;
      }
    }
  }
});
// User Listing Data
const UserListingData = new ObjectType({
  name: 'userListingData',
  fields: {
    id: {
      type: IntType,
      resolve(userListingData) {
        return userListingData.id;
      }
    },
    settingsId: {
      type: IntType,
      resolve(userListingData) {
        return userListingData.settingsId;
      }
    },
    listsettings: {
      type: ListSettings,
      async resolve(userListingData) {
        return await ImportedListSettings.findOne({
          where: {
            id: userListingData.settingsId,
            isEnable: '1'
          }
        });
      }
    },
  }
});
// Listing Steps
const UserListingSteps = new ObjectType({
  name: 'userListingSteps',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    step1: { type: StringType },
    step2: { type: StringType },
    step3: { type: StringType },
    step4: { type: StringType },
    currentStep: { type: IntType },
    status: { type: StringType },
  },
});
// Recommended Listing
const Recommend = new ObjectType({
  name: 'recommend',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    status: { type: StringType },
  },
});
// Listing Photos
const ListPhotos = new ObjectType({
  name: 'listPhotos',
  fields: {
    id: { type: IntType },
    listId: { type: IntType },
    name: { type: StringType },
    type: { type: StringType },
    status: { type: StringType },
  },
});
const ShowListingType = new ObjectType({
  name: 'ShowListing',
  fields: {
    id: { type: IntType },
    userId: { type: StringType },
    title: { type: StringType },
    description: { type: StringType },
    bedrooms: { type: StringType },
    residenceType: { type: StringType },
    buildingSize: { type: StringType },
    beds: { type: IntType },
    personCapacity: { type: IntType },
    bathrooms: { type: FloatType },
    country: { type: StringType },
    street: { type: StringType },
    buildingName: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    zipcode: { type: StringType },
    lat: { type: FloatType },
    lng: { type: FloatType },
    coverPhoto: { type: IntType },
    lastUpdatedAt: { type: StringType },
    dates: { type: StringType },
    isOneTotalToggle: { type: BooleanType },
    listPhotos: {
      type: new List(ListPhotos),
      async resolve(listing) {
        const listPhotos = await ImportedListPhotos.findAll({
          where: {
            listId: listing.id
          }
        });
        return listPhotos;
      }
    },
    isMapTouched: { type: BooleanType },
    bookingType: { type: StringType },
    isPublished: { type: BooleanType },
    listApprovalStatus: { type: StringType },
    isReady: { type: BooleanType },
    status: { type: StringType },
    updatedAt: { type: StringType },
    createdAt: { type: StringType },
    count: { type: IntType },
    user: {
      type: User,
      async resolve(listing) {
        return await ImportedUser.findOne({
          where: {
            id: listing.userId
          }
        });
      }
    },
    userAmenities: {
      type: new List(UserAmenities),
      async resolve(listing) {
        return await ImportedUserAmenities.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    userSafetyAmenities: {
      type: new List(UserSafetyAmenities),
      async resolve(listing) {
        return await ImportedUserSafetyAmenities.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    userSpaces: {
      type: new List(UserSpaces),
      async resolve(listing) {
        return await ImportedUserSpaces.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    settingsData: {
      type: new List(UserListingData),
      async resolve(listing) {
        return await ImportedUserListingData.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    houseRules: {
      type: new List(UserHouseRules),
      async resolve(listing) {
        return await ImportedUserHouseRules.findAll({
          where: {
            listId: listing.id
          }
        });

      }
    },
    listBedTypes: {
      type: new List(ListBedTypes),
      async resolve(listing) {
        return await BedTypes.findAll({
          where: {
            listId: listing.id
          }
        });
      }
    },
    listingData: {
      type: ListingData,
      async resolve(listing) {
        const { dates, isOneTotalToggle } = listing;
        const getListingData = await ImportedListingData.findOne({
          where: {
            listId: listing.id
          },
          raw: true,
        });
        const listingDataWithDates = {
          ...getListingData,
          dates,
          isOneTotalToggle
        };
        return listingDataWithDates;
      }
    },
    serviceFees: {
      type: new List(ServiceFeesType),
      async resolve() {
        return await ServiceFees.findAll();
      }
    },
    blockedDates: {
      type: new List(ListBlockedDatesType),
      async resolve(listBlock) {
        let today = getDateUsingTimeZone(listBlock.country, false);
        return await ListBlockedDates.findAll({
          where: {
            listId: listBlock.id,
            blockedDates: {
              $gte: today.format('YYYY-MM-DD')
            }
          },
          order: [['createdAt', 'DESC']],

        })
      }
    },
    fullBlockDates: {
      type: new List(ListBlockedDatesType),
      async resolve(listBlock) {
        let today = getDateUsingTimeZone(listBlock.country, false);
        return await ListBlockedDates.findAll({
          where: {
            listId: listBlock.id,
            blockedDates: {
              $gte: today.format('YYYY-MM-DD')
            },
            calendarStatus: 'blocked',
            dayStatus: 'full'
          }
        })
      }
    },
    viewListBlockedDates: {
      type: new List(ListBlockedDatesType),
      async resolve(listBlock) {
        let today = getDateUsingTimeZone(listBlock.country, false);
        let where = {
          listId: listBlock.id,
          blockedDates: {
            $gte: today.format('YYYY-MM-DD')
          },
          calendarStatus: 'blocked'
        }
        return await ListBlockedDates.findAll({
          where
        })
      }
    },
    listingSteps: {
      type: UserListingSteps,
      async resolve(listing) {
        return await ImportedUserListingSteps.findOne({
          where: {
            listId: listing.id
          }
        });
      }
    },
    recommend: {
      type: Recommend,
      async resolve(listing) {
        return await ImportedRecommend.findOne({
          where: {
            listId: listing.id
          }
        });
      }
    },
    reviewsCount: {
      type: IntType,
      async resolve(listing) {
        return await Reviews.count({
          where: {
            listId: listing.id,
            userId: listing.userId,
            isAdminEnable: true
          }
        });
      }
    },
    reviewsStarRating: {
      type: FloatType,
      async resolve(listing) {
        return await Reviews.sum('rating', {
          where: {
            listId: listing.id,
            userId: listing.userId,
            isAdminEnable: true
          }
        });
      }
    },
    reviews: {
      type: new List(ReviewsType),
      async resolve(listing) {
        return await Reviews.findAll({
          where: {
            listId: listing.id,
            userId: listing.userId,
            isAdminEnable: true
          },
          order: [['createdAt', 'DESC']],
          limit: 1
        });
      }
    },
    calendars: {
      type: new List(ListCalendarType),
      async resolve(listing) {
        return await ListCalendar.findAll({
          where: {
            listId: listing.id,
          },
        });
      }
    },
    wishListStatus: {
      type: BooleanType,
      async resolve(listing, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await WishList.count({
          where: {
            listId: listing.id,
            userId
          },
        });
        return (count) ? true : false
      }
    },
    isListOwner: {
      type: BooleanType,
      async resolve(listing, { }, request) {
        let userId = (request && request.user) ? request.user.id : undefined;
        let count = await Listing.count({
          where: {
            id: listing.id,
            userId
          },
        });
        return (count) ? true : false;
      }
    },
    userBedsTypes: {
      type: new List(UserBedTypes),
      async resolve(bedtypes) {
        return await BedTypes.findAll({
          where: {
            listId: bedtypes.id,
          }
        })
      }
    },
    listBlockedPrice: {
      type: new List(ListBlockedDatesType),
      async resolve(listBlock) {
        return await ListBlockedDates.findAll({
          where: {
            listId: listBlock.id,
            calendarStatus: 'available'
          }
        })
      }
    },
    submittedOn: {
      type: ListingHistoryType,
      async resolve(list) {
        return await ListingPermissionHistory.findOne({
          where: {
            listId: list.id,
            status: 'submitForverification',
          },
          order: [['createdAt', 'DESC']],
          limit: 1
        })
      }
    },
    listingHistory: {
      type: new List(ListingHistoryType),
      async resolve(list) {
        return await ListingPermissionHistory.findAll({
          attributes: ['status', 'createdAt', 'reason'],
          where: {
            listId: list.id,
            status: 'declined',
          },
          order: [['createdAt', 'DESC']],
        })
      }
    }
  },
});
export default ShowListingType;
