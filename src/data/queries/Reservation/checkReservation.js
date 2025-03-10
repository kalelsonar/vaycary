import { GraphQLString as StringType, GraphQLInt as IntType } from "graphql";
import moment from "moment";
import ReservationType from "../../types/ReservationType";
import { ListBlockedDates, Listing } from "../../models";
import showErrorMessage from "../../../helpers/showErrorMessage";

const checkReservation = {
  type: ReservationType,

  args: {
    checkIn: { type: StringType },
    checkOut: { type: StringType },
    listId: { type: IntType },
  },

  async resolve({ request }, { checkIn, checkOut, listId }) {
    if (request.user && request.user.id) {
      let convertStart, convertEnd, isBlocked = [], checkInSecondHalf = [], checkOutFirstHalf = [];
      let startDate, endDate;
      convertStart = new Date(checkIn);
      convertEnd = new Date(checkOut);
      convertStart.setHours(0, 0, 0, 0);
      convertEnd.setHours(23, 59, 59, 999);

      startDate = moment(convertStart).format("YYYY-MM-DD");
      endDate = moment(convertEnd).format("YYYY-MM-DD");

      const isListingAvailable = await Listing?.findAll({
        where: {
          id: listId,
          isPublished: true,
        },
      });

      if (isListingAvailable?.length == 0) {
        return {
          errorMessage:
            showErrorMessage({ errorCode: 'isListingAvailable' }),
          status: "400",
        };
      }

      const checkAvailableDates = await ListBlockedDates?.findAll({
        where: {
          listId,
          blockedDates: {
            $between: [startDate, endDate],
          },
          calendarStatus: {
            $notIn: ["available"],
          },
        },
      });

      if (checkAvailableDates?.length > 0) {
        checkInSecondHalf = checkAvailableDates?.filter(
          (o) =>
            moment(o?.blockedDates).format("YYYY-MM-DD") ==
            moment(startDate).format("YYYY-MM-DD") &&
            o?.dayStatus == "firstHalf"
        );
        checkOutFirstHalf = checkAvailableDates?.filter(
          (o) =>
            moment(o?.blockedDates).format("YYYY-MM-DD") ==
            moment(endDate).format("YYYY-MM-DD") &&
            o?.dayStatus == "secondHalf"
        );

        if (
          checkAvailableDates?.length > 0 &&
          (checkInSecondHalf?.length === 1 || checkOutFirstHalf?.length === 1)
        ) {
          return {
            status: "200",
          };
        } else {
          return {
            errorMessage: showErrorMessage({ errorCode: 'checkAvailableDates' }),
            status: "400",
          };
        }
      } else {
        return {
          status: "200",
        };
      }
    } else {
      return {
        status: "notLoggedIn",
      };
    }
  },
};

export default checkReservation;
