import moment from 'moment';
import { convert } from './currencyConvertion';

export function calculateTotalPrice({ listingData, listBlockedDates, serviceFees, base, rates }) {

  let basePrice, cleaningPrice, weeklyDiscount, monthlyDiscount, currency, dates;
  let serviceFee = 0, priceForDays = 0, isAverage = 0, isDayTotal = 0, bookingSpecialPricing = [];
  let dayDifference, discount, totalWithoutServiceFee = 0, startSlot = null, endSlot = null;

  basePrice = listingData?.basePrice;
  cleaningPrice = listingData?.cleaningPrice;
  weeklyDiscount = listingData?.weeklyDiscount;
  monthlyDiscount = listingData?.monthlyDiscount;
  currency = listingData?.currency;
  dates = listingData?.dates;

  if (dates) {
    const dateParts = dates.split(" AND ");
    if (dateParts?.length === 2) {
      startSlot = moment(dateParts[0].replace(/[']/g, '').trim(' '));
      endSlot = moment(dateParts[1].replace(/[']/g, '').trim(' '));
    }
  }

  const specialPrice = listBlockedDates
    .filter(entry => entry.calendarStatus === "available")
    .map(entry => ({
      blockedDate: entry?.blockedDates,
      isSpecialPrice: entry?.isSpecialPrice,
      dayStatus: entry?.dayStatus
    }));

  if (startSlot && endSlot) {
    dayDifference = endSlot.diff(startSlot, 'days');
    if (dayDifference > 0) {
      let stayedNights = [];
      // Find stayed nights
      for (let i = 0; i < dayDifference; i++) {
        let currentDate = moment(startSlot).add(i, 'day');
        stayedNights.push(currentDate);
      }
      if (stayedNights?.length > 0) {
        stayedNights.map((item, key) => {
          let isSpecialPricing;
          if (item) {
            let pricingRow;
            isSpecialPricing = specialPrice.find((o) => {
              if (o?.dayStatus == 'full' || o?.dayStatus == 'secondHalf') {
                return moment(item).format('MM/DD/YYYY') == moment(o.blockedDate).format('MM/DD/YYYY')
              }
            })
            const currentPrice = isSpecialPricing && isSpecialPricing?.isSpecialPrice ? Number(isSpecialPricing.isSpecialPrice) : Number(basePrice);
            // Price object
            pricingRow = {
              blockedDates: item,
              isSpecialPrice: currentPrice,
            };
            bookingSpecialPricing.push(pricingRow);
          }
        });
      }
    }
    priceForDays = bookingSpecialPricing.reduce(
      (total, item) => total + Number(item.isSpecialPrice), 0
    );
    discount = 0;
  }

  isAverage = Number(priceForDays) / Number(dayDifference);
  isDayTotal = isAverage.toFixed(2) * dayDifference;
  priceForDays = isDayTotal;

  if (dayDifference >= 7) {
    if (monthlyDiscount > 0 && dayDifference >= 28) {
      discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100;
    } else {
      discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100;
    }
  }
  totalWithoutServiceFee = (isDayTotal + cleaningPrice) - discount;

  if (serviceFees && serviceFees.length > 0) {
    const guestType = serviceFees[0].guestType;
    const guestValue = serviceFees[0].guestValue;
    const guestCurrency = serviceFees[0].currency;
    serviceFee = guestType === "percentage"
      ? totalWithoutServiceFee * (Number(guestValue) / 100)
      : convert(base, rates, guestValue, guestCurrency, currency);
  }

  const oneTotalPrice = (priceForDays + serviceFee + cleaningPrice) - discount;

  return {
    oneTotalPrice,
    isAverage,
    dayDifference,
    isDayTotal,
    discount,
    cleaningPrice,
    serviceFee,
    currency,
  };
}