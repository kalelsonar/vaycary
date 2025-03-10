import moment from 'moment';
import { initialize } from 'redux-form';
import { calculateHostCancellation, cancellationGuestData, getPriceWithDiscount } from '../../helpers/cancellationData';
import { getDateRanges } from '../../helpers/dateRange';
import getCancellationData from '../../routes/siteadmin/cancellation/getCancellationData.graphql';
import { cancellationRule, typeCheck } from '../../helpers/cancellationCheck';

export default function GuestCancellationData(id, userType) {
  return async (dispatch, getState, { client }) => {
    try {
      let subtotal = 0, isCleaingPrice = 0, taxPrice = 0, totalNights = 0, priceForDays = 0, totalPrice = 0, finalPrice = 0, refundableNightPrice = 0, nonRefundableNightPrice = 0, updatedGuestFee = 0, updatedHostFee = 0, payoutToHost = 0;
      let bookingSpecialPricing = [], isSpecialPriceAssigned = false, cancellationGuestObj = {}, accomodation, guestFees, remainingNights, policyName, policyContent, priorDays, cancellation;
      let serviceFees = getState()?.book?.serviceFees, base = getState()?.currency?.base, rates = getState()?.currency?.rates, nonRefundableNights, type = 'priorCheckIn';

      const { data } = await client.query({
        query: getCancellationData,
        variables: { id },
        fetchPolicy: 'network-only'
      });

      if (data?.getCancellationData != undefined || data?.getCancellationData != null) {
        const { nights, interval } = getDateRanges({ checkIn: data?.getCancellationData?.checkIn, checkOut: data?.getCancellationData?.checkOut, country: data?.getCancellationData?.listData?.country });
        cancellation = data?.getCancellationData?.cancellation ? data?.getCancellationData?.cancellation : data?.getCancellationData?.listingData?.cancellation;
        let cancellationRuleObj = { accomodation, guestFees, nonRefundableNights, priorDays, policyName, remainingNights, interval, nights, policyContent }

        //helper to check the type
        type = typeCheck(interval, cancellation);

        //helper to get the cancellation rule
        cancellationRuleObj = cancellationRule(type, cancellationRuleObj, cancellation);
        cancellationRuleObj['interval'] = interval;
        cancellationRuleObj['nights'] = nights;

        if (type == 'priorCheckIn' || type == 'beforeCheckIn') {
          cancellationRuleObj['cleaningFeePercent'] = type == 'beforeCheckIn' && cancellation.id === 3 ? 0 : 100;
          cancellationRuleObj['taxFeePercent'] = type == 'beforeCheckIn' && cancellation.id === 3 ? 0 : 100;
          if (type == 'priorCheckIn') {
            cancellationRuleObj['cleaningFeePercent'] = 100;
            cancellationRuleObj['taxFeePercent'] = 100;
          }
        } else {
          cancellationRuleObj['remainingNights'] = (nights - 1) + interval;
          cancellationRuleObj['cleaningFeePercent'] = 0;
          cancellationRuleObj['taxFeePercent'] = 0;
        }

        if (data?.getCancellationData?.cleaningPrice) {
          isCleaingPrice = data?.getCancellationData?.cleaningPrice;
        } else {
          isCleaingPrice = 0;
        }

        if (data?.getCancellationData?.taxPrice) {
          taxPrice = data?.getCancellationData?.taxPrice;
        } else {
          taxPrice = 0;
        }

        data?.getCancellationData?.bookingSpecialPricing.map((item, key) => {
          let currentPrice;
          if (item?.blockedDates) {
            isSpecialPriceAssigned = true;
            currentPrice = Number(item?.isSpecialPrice);
          } else {
            currentPrice = Number(data?.getCancellationData?.basePrice);
          }
          bookingSpecialPricing.push({
            blockedDates: item,
            isSpecialPrice: currentPrice,
          });
        })

        if (userType == 'host') {
          if (isSpecialPriceAssigned) bookingSpecialPricing?.map((item, index) => {
            priceForDays = Number(priceForDays) + Number(item?.isSpecialPrice);
          });
          else priceForDays = Number(data?.getCancellationData?.basePrice) * Number(cancellationRuleObj?.nights - cancellationRuleObj?.nonRefundableNights);

          totalPrice = getPriceWithDiscount({
            basePrice: (data?.getCancellationData?.isSpecialPriceAverage || data?.getCancellationData?.basePrice),
            discount: data?.getCancellationData?.discount,
            nights: cancellationRuleObj?.nights
          });

          const { refundAmount, nonPayoutAmount, payoutAmount, refundDays, updatedHostFee, updatedGuestFee } = calculateHostCancellation({
            total: data?.getCancellationData?.total,
            basePrice: totalPrice,
            isCleaingPrice,
            nights: cancellationRuleObj?.nights,
            remainingNights: cancellationRuleObj?.remainingNights,
            guestServiceFee: data?.getCancellationData?.guestServiceFee,
            hostServiceFee: data?.getCancellationData?.hostServiceFee,
            taxPrice,
            hostServiceFeeType: data?.getCancellationData?.hostServiceFeeType,
            hostServiceFeeValue: data?.getCancellationData?.hostServiceFeeValue,
            interval: cancellationRuleObj?.interval
          })

          subtotal = data?.getCancellationData?.total + data?.getCancellationData?.guestServiceFee;
          totalNights = nights - refundDays;

          let cancellationData = {
            reservationId: data?.getCancellationData?.id,
            cancellationPolicy: cancellationRuleObj?.policyName,
            refundToGuest: refundAmount,
            payoutToHost: payoutAmount,
            guestServiceFee: updatedGuestFee,
            hostServiceFee: updatedHostFee,
            total: subtotal,
            currency: data?.getCancellationData?.currency,
            threadId: data?.getCancellationData?.messageThreadId?.id,
            cancelledBy: 'host',
            checkIn: data?.getCancellationData?.checkIn,
            checkOut: data?.getCancellationData?.checkOut,
            guests: data?.getCancellationData?.guests,
            hostName: data?.getCancellationData?.hostData?.firstName,
            guestName: data?.getCancellationData?.guestData?.firstName,
            listTitle: data?.getCancellationData?.listData.title,
            confirmationCode: data?.getCancellationData?.confirmationCode,
            guestEmail: data?.getCancellationData?.guestData?.userData?.id,
            userType,
            totalPrice,
            refundDays,
            nonPayoutAmount,
            payoutAmount,
            totalNights
          };
          dispatch(initialize('AdminCancellation', cancellationData));
        } else {
          finalPrice = getPriceWithDiscount({
            basePrice: (data?.getCancellationData?.isSpecialPriceAverage || data?.getCancellationData?.basePrice),
            discount: data?.getCancellationData?.discount,
            nights: cancellationRuleObj?.nights
          });

          if (isSpecialPriceAssigned) {
            bookingSpecialPricing.map((item, index) => {
              priceForDays = Number(priceForDays) + Number(item?.isSpecialPrice);
            });
          } else if (userType == 'guest') {
            if (interval <= 1) priceForDays = Number(data?.getCancellationData?.basePrice) * Number(cancellationRuleObj?.nights - cancellationRuleObj?.nonRefundableNights)
            else priceForDays = Number(data?.getCancellationData?.basePrice) * Number(cancellationRuleObj?.nights)
          }

          cancellationGuestObj = cancellationGuestData(
            cancellationRuleObj?.remainingNights,
            cancellationRuleObj?.nights,
            priceForDays,
            cancellationRuleObj?.accomodation,
            isCleaingPrice,
            data?.getCancellationData?.taxRate,
            data?.getCancellationData?.guestServiceFee,
            cancellationRuleObj?.guestFees,
            data?.getCancellationData?.discount,
            data?.getCancellationData?.hostServiceFee,
            taxPrice,
            finalPrice,
            data?.getCancellationData?.total,
            cancellationRuleObj?.policyName,
            cancellationRuleObj?.interval,
            cancellationRuleObj?.priorDays,
            cancellationRuleObj?.nonRefundableNights,
            data?.getCancellationData?.hostServiceFeeType,
            data?.getCancellationData?.hostServiceFeeValue,
            data?.getCancellationData?.currency,
            base,
            rates,
            serviceFees,
            cancellationRuleObj?.cleaningFeePercent,
            cancellationRuleObj?.taxFeePercent
          );

          refundableNightPrice = cancellationGuestObj?.refundableNightPrice;
          nonRefundableNightPrice = cancellationGuestObj?.nonRefundableNightPrice;
          updatedGuestFee = cancellationGuestObj?.updatedGuestFee;
          payoutToHost = cancellationGuestObj?.payoutToHost;
          updatedHostFee = cancellationGuestObj?.updatedHostFee;
          updatedGuestFee = cancellationGuestObj?.updatedGuestFee;
          subtotal = data?.getCancellationData?.total + data?.getCancellationData?.guestServiceFee;

          let cancellationData = {
            reservationId: data?.getCancellationData?.id,
            cancellationPolicy: cancellationRuleObj?.policyName,
            refundToGuest: refundableNightPrice,
            payoutToHost: payoutToHost,
            guestServiceFee: updatedGuestFee,
            hostServiceFee: updatedHostFee,
            total: subtotal,
            currency: data?.getCancellationData?.currency,
            threadId: data?.getCancellationData?.messageThreadId?.id,
            cancelledBy: 'guest',
            checkIn: data?.getCancellationData?.checkIn,
            checkOut: data?.getCancellationData?.checkOut,
            guests: data?.getCancellationData?.guests,
            guestName: data?.getCancellationData?.guestData?.firstName,
            hostName: data?.getCancellationData?.hostData?.firstName,
            listTitle: data?.getCancellationData?.listData.title,
            confirmationCode: data?.getCancellationData?.confirmationCode,
            hostEmail: data?.getCancellationData?.hostData.userData.id,
            userType,
            nonRefundableToGuest: nonRefundableNightPrice,
          };
          dispatch(initialize('AdminCancellation', cancellationData));
        }
      }
    } catch (error) {
      console.log("Something went wrong", error)
    }
  }
}