// GrpahQL
import {
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
  GraphQLFloat as FloatType,
} from 'graphql';

// GraphQL Type
import EditListingType from '../types/EditListingType';

// Sequelize models
import { Listing, UserHouseRules, ListingData, ListBlockedDates, ListPhotos, Currencies } from '../../data/models';

const updateListingStep3 = {

  type: EditListingType,

  args: {
    id: { type: IntType },
    houseRules: { type: new List(IntType) },
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
    blockedDates: { type: new List(StringType) },
    bookingType: { type: new NonNull(StringType) },
    cancellationPolicy: { type: IntType },
    taxRate: { type: FloatType },
  },

  async resolve({ request, response }, {
    id,
    houseRules,
    bookingNoticeTime,
    checkInStart,
    checkInEnd,
    maxDaysNotice,
    minNight,
    maxNight,
    basePrice,
    cleaningPrice,
    tax,
    currency,
    weeklyDiscount,
    monthlyDiscount,
    blockedDates,
    bookingType,
    cancellationPolicy,
    taxRate,
  }) {

    let isListUpdated = false;

    // Check whether user is logged in
    if (request.user || request.user.admin) {

      let where = { id };
      if (!request.user.admin) {
        where = {
          id,
          userId: request.user.id
        }
      };

      // Confirm whether the Listing Id is available
      const isListingAvailable = await Listing.findById(id);

      if (isListingAvailable != null) {

        // Currency
        let getCurrenice = await Currencies.findOne({
          where: {
            isBaseCurrency: true
          }
        });

        let currencyValue = currency ? currency : getCurrenice?.symbol;

        // Update Booking Type
        if (bookingType) {
          const updateBookingType = await Listing.update({
            bookingType,
            lastUpdatedAt: new Date()
          }, {
              where
            })
        }

        // House Rules
        if (houseRules) {
          const removeHouseRules = await UserHouseRules.destroy({
            where: {
              listId: id
            }
          });
          if (houseRules?.length > 0) {
            houseRules.map(async (item, key) => {
              let updateHouseRules = await UserHouseRules.create({
                listId: id,
                houseRulesId: item
              })
            });
          }
        }


        // Check if record already available for this listing
        const isListingIdAvailable = await ListingData.findOne({ where: { listId: id } });

        if (isListingIdAvailable != null) {
          // Update Record
          const updateData = ListingData.update({
            bookingNoticeTime,
            checkInStart,
            checkInEnd,
            maxDaysNotice,
            minNight,
            maxNight,
            basePrice,
            cleaningPrice,
            tax,
            currency: currencyValue,
            weeklyDiscount,
            monthlyDiscount,
            cancellationPolicy,
            taxRate,
          },
            {
              where: {
                listId: id
              }
            });
          isListUpdated = true;
        } else {
          // Create New Record
          const createData = ListingData.create({
            listId: id,
            bookingNoticeTime,
            checkInStart,
            checkInEnd,
            maxDaysNotice,
            minNight,
            maxNight,
            basePrice,
            cleaningPrice,
            tax,
            currency: currencyValue,
            weeklyDiscount,
            monthlyDiscount,
            cancellationPolicy,
            taxRate,
          });

          if (createData) {
            isListUpdated = true;
          }
        }


        if (isListUpdated) {
          const photosCount = await ListPhotos.count({ where: { listId: id } });
          if (photosCount > 0) {
            const updateListingStatus = await Listing.update({
              isReady: true
            }, {
                where: { id }
              });
          }
          return {
            status: 'success'
          }
        } else {
          return {
            status: 'failed'
          }
        }

      } else {
        return {
          status: 'notAvailable'
        }
      }

    } else {
      return {
        status: "notLoggedIn",
      };
    }

  },
};

export default updateListingStep3;