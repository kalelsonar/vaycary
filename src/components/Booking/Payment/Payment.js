import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import Row from "react-bootstrap/lib/Row"
import Col from "react-bootstrap/lib/Col"
import cx from "classnames"
import withStyles from "isomorphic-style-loader/lib/withStyles"
import { FormattedMessage } from "react-intl"
import { injectIntl } from "react-intl"
import { connect } from "react-redux"

// Component
import PaymentDetails from "./PaymentDetails"
import PaymentForm from "./PaymentForm"
import ListCoverPhoto from "../../ListCoverPhoto"
import StarRating from "../../StarRating"

// Helper
import { convert } from "../../../helpers/currencyConvertion"
// Locale
import messages from "../../../locale/messages"

import s from "./Payment.css"
class Payment extends Component {
  static propTypes = {
    listId: PropTypes.number.isRequired,
    hostId: PropTypes.string.isRequired,
    guestId: PropTypes.string.isRequired,
    guestEmail: PropTypes.string.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    hostPicture: PropTypes.string,
    coverPhoto: PropTypes.string,
    listTitle: PropTypes.string.isRequired,
    allowedPersonCapacity: PropTypes.number.isRequired,
    listType: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    houseRules: PropTypes.arrayOf(
      PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string.isRequired,
        }),
      })
    ),
    checkIn: PropTypes.object.isRequired,
    checkOut: PropTypes.object.isRequired,
    guests: PropTypes.number.isRequired,
    basePrice: PropTypes.number.isRequired,
    cleaningPrice: PropTypes.number,
    tax: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    weeklyDiscount: PropTypes.number,
    monthlyDiscount: PropTypes.number,
    listPhotos: PropTypes.array,
    serviceFees: PropTypes.shape({
      guest: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
      host: PropTypes.shape({
        type: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    base: PropTypes.string.isRequired,
    rates: PropTypes.object.isRequired,
    bookingType: PropTypes.string.isRequired,
    policyName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  }

  render() {
    const {
      guestEmail,
      hostDisplayName,
      hostProfileId,
      isPreApprove,
      hostPicture,
      coverPhoto,
      listPhotos,
      bookingType,
      policyName,
      policyContent,
    } = this.props
    const {
      listId,
      listTitle,
      listType,
      city,
      state,
      country,
      allowedPersonCapacity,
      houseRules,
      hostId,
      guestId,
    } = this.props
    const {
      guests,
      checkIn,
      checkOut,
      guestPicture,
      taxRate,
      threadId,
      basePrice,
      cleaningPrice,
      tax,
    } = this.props
    const {
      serviceFees,
      base,
      rates,
      specialPricing,
      bookingData,
      razorpayPayment,
      currency,
      weeklyDiscount,
      monthlyDiscount,
    } = this.props
    const { formatMessage } = this.props.intl

    let guestServiceFee = 0,
      hostServiceFee = 0,
      priceForDays = 0,
      hostServiceFeeType = "",
      hostServiceFeeValue = 0
    let discount = 0,
      discountType,
      total = 0,
      totalWithoutFees = 0,
      totalWithoutTax = 0,
      taxPrice = 0,
      starRatingValue = 0
    let momentStartDate,
      momentEndDate,
      dayDifference,
      isAverage = 0,
      currentDay,
      bookingSpecialPricing = [],
      isSpecialPriceAssigned = false
    let isDayTotal = 0,
      taxRateFee = 0,
      totalWithoutServiceFee = 0,
      discountLessBasePrice = 0

    if (checkIn && checkOut) {
      momentStartDate = moment(checkIn)
      momentEndDate = moment(checkOut)
      dayDifference = momentEndDate?.diff(momentStartDate, "days")

      //New
      if (dayDifference > 0) {
        let stayedNights = [],
          i,
          currentDate
        // Find stayed nights
        for (i = 0; i < dayDifference; i++) {
          currentDate = moment(checkIn).add(i, "day")
          stayedNights?.push(currentDate)
        }

        if (stayedNights?.length > 0) {
          stayedNights.map((item, key) => {
            let isSpecialPricing, currentPrice, pricingRow
            if (item) {
              currentDay = moment(item).format("dddd").toLowerCase()
              isSpecialPricing =
                specialPricing?.length > 0 &&
                specialPricing.find(
                  (o) =>
                    moment(item).format("MM/DD/YYYY") ==
                    moment(o.blockedDates).format("MM/DD/YYYY")
                )

              if (
                isSpecialPricing?.isSpecialPrice &&
                (isSpecialPricing?.dayStatus == "secondHalf" ||
                  isSpecialPricing?.dayStatus == "full")
              ) {
                isSpecialPriceAssigned = true
                currentPrice = Number(isSpecialPricing?.isSpecialPrice)
              } else {
                currentPrice = Number(basePrice)
              }
              // Price object
              pricingRow = {
                blockedDates: item,
                isSpecialPrice: currentPrice,
              }
              bookingSpecialPricing?.push(pricingRow)
            }
          })
        }
      }
      priceForDays = bookingSpecialPricing.reduce(
        (total, item) => total + Number(item.isSpecialPrice),
        0
      )
    }

    isAverage = Number(priceForDays) / Number(dayDifference)
    isDayTotal = isAverage?.toFixed(2) * dayDifference
    priceForDays = isDayTotal

    if (dayDifference >= 7) {
      if (monthlyDiscount > 0 && dayDifference >= 28) {
        discount = (Number(priceForDays) * Number(monthlyDiscount)) / 100
        discountType =
          monthlyDiscount + formatMessage(messages.monthlyPriceDiscount)
      } else {
        if (weeklyDiscount > 0) {
          discount = (Number(priceForDays) * Number(weeklyDiscount)) / 100
          discountType =
            weeklyDiscount + formatMessage(messages.weeklyPriceDiscount)
        }
      }
    }
    discountLessBasePrice = isDayTotal - discount
    taxRateFee =
      taxRate > 0
        ? (discountLessBasePrice + cleaningPrice) * (Number(taxRate) / 100)
        : 0
    totalWithoutServiceFee = isDayTotal + cleaningPrice - discount
    totalWithoutTax = isDayTotal - discount

    // if (tax) taxPrice = totalWithoutTax * (Number(tax) / 100)
    let texPercentage = tax;
        if(tax){
            if ( (totalWithoutServiceFee / dayDifference) > 7500) {
              taxPrice = totalWithoutServiceFee * (Number(18) / 100);
                texPercentage = 18;
            } else {
              taxPrice = totalWithoutServiceFee * (Number(12) / 100);
                texPercentage = 12;
            }
        }

    let serviceTex = 0;
    if (serviceFees) {
      guestServiceFee =
        serviceFees.guest.type === "percentage"
          ? totalWithoutServiceFee * (Number(serviceFees.guest.value) / 100)
          : convert(
              base,
              rates,
              serviceFees.guest.value,
              serviceFees.guest.currency,
              currency
            )
      serviceTex = guestServiceFee * 0.18;
      if (serviceFees?.host?.type === "percentage") {
        hostServiceFeeType = serviceFees.host.type
        hostServiceFeeValue = serviceFees.host.value
        hostServiceFee =
          totalWithoutServiceFee * (Number(serviceFees.host.value) / 100)
        serviceTex = hostServiceFee * 0.18;
      } else {
        hostServiceFeeType = serviceFees?.host?.type
        hostServiceFeeValue = serviceFees?.host?.value
        hostServiceFee = convert(
          base,
          rates,
          serviceFees?.host?.value,
          serviceFees?.host?.currency,
          currency
        )
        serviceTex = hostServiceFee * 0.18;
      }
    }

    let checkInStart = bookingData?.listingData?.checkInStart
    let checkInEnd = bookingData?.listingData?.checkInEnd

    console.log({priceForDays , guestServiceFee , cleaningPrice , taxPrice, discount})
    console.log(serviceTex);
    total = priceForDays + guestServiceFee + cleaningPrice + taxPrice + serviceTex - discount
    totalWithoutFees = priceForDays + cleaningPrice + taxPrice - discount

    let checkInDate =
      checkIn != null
        ? moment(moment(checkIn).format("YYYY-MM-DD")).format("ddd, Do MMM")
        : ""
    let checkOutDate =
      checkOut != null
        ? moment(moment(checkOut).format("YYYY-MM-DD")).format("ddd, Do MMM")
        : ""

    if (bookingData.reviewsCount > 0 && bookingData.reviewsStarRating > 0) {
      starRatingValue = Math.round(
        bookingData.reviewsStarRating / bookingData.reviewsCount
      )
    }

    let initialValues = {
      listId,
      listTitle,
      hostId,
      guestId,
      guests,
      checkIn,
      checkOut,
      basePrice,
      currency,
      cleaningPrice,
      taxPrice,
      discount,
      discountType,
      guestServiceFee,
      hostServiceFee,
      total: totalWithoutFees,
      bookingType,
      paymentType: razorpayPayment ? "3" : "1",
      guestEmail,
      isSpecialPriceAssigned,
      bookingSpecialPricing: JSON.stringify(bookingSpecialPricing),
      isSpecialPriceAverage: isAverage.toFixed(2),
      dayDifference,
      taxRate: taxRateFee,
      checkInStart,
      checkInEnd,
      hostServiceFeeType,
      hostServiceFeeValue,
      priceForDays,
      totalValue: total,
      threadId,
    }

    return (
      <Row>
        <Col lg={7} md={7}>
          <PaymentForm
            hostDisplayName={hostDisplayName}
            houseRules={houseRules}
            allowedPersonCapacity={allowedPersonCapacity}
            initialValues={initialValues}
            listId={listId}
            guestPicture={guestPicture}
            hostPicture={hostPicture}
            hostProfileId={hostProfileId}
            isPreApprove={isPreApprove}
          />
        </Col>
        <Col lg={5} md={5} className={s.positionSticky}>
          <div className={cx(s.summaryCard, s.colCenter)}>
            <div className={s.postionRelative}>
              <div className={s.secondSection}>
                <div
                  className={cx(
                    s.displayInline,
                    s.avatarWidth,
                    s.vtrMiddle,
                    "avatarWidthPaymentRTL",
                    s.vtrTopSm
                  )}
                >
                  <ListCoverPhoto
                    className={cx(s.bannerImage, s.backgroundCover)}
                    coverPhoto={coverPhoto}
                    listPhotos={listPhotos}
                    photoType={"x_medium"}
                    bgImage
                  />
                </div>
                <div
                  className={cx(s.displayInline, s.contentWidth, s.vtrMiddle)}
                >
                  {starRatingValue > 0 && (
                    <div className={s.reviewFlex}>
                      <div className={s.reviewFlex}>
                        <span className={cx(s.starCss, "starCssRTL")}>
                          <StarRating name={"review"} value={starRatingValue} />
                        </span>
                        <span>{starRatingValue}</span>
                      </div>
                      <span className={s.dotsCss}>&#8226;</span>
                      <span>
                        {bookingData?.reviewsCount}{" "}
                        {bookingData?.reviewsCount > 1 ? (
                          <FormattedMessage {...messages.reviews} />
                        ) : (
                          <FormattedMessage {...messages.review} />
                        )}
                      </span>
                    </div>
                  )}
                  <div
                    className={cx(s.textLarge, s.colorWhite, s.propertyText)}
                  >
                    <span>{listTitle}</span>
                  </div>
                  <div
                    className={cx(
                      s.textMuted,
                      s.colorWhite,
                      s.listItem,
                      "textWhite"
                    )}
                  >
                    <ul className={cx(s.listStyle, "listStyleRTL")}>
                      <li>
                        {listType}
                        {bookingData?.beds > 0 && (
                          <span>
                            <span>&nbsp;-&nbsp;</span>
                            {bookingData?.beds}{" "}
                            {bookingData?.beds > 1
                              ? formatMessage(messages.beds)
                              : formatMessage(messages.bed)}
                          </span>
                        )}
                      </li>
                    </ul>
                    <div className={s.colorWhite}>
                      {" "}
                      {city}, {state}, {country}{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <PaymentDetails
              basePrice={basePrice}
              cleaningPrice={cleaningPrice}
              currency={currency}
              taxPrice={taxPrice + serviceTex}
              discountType={discountType}
            />
          </div>
          <div className={s.policyCss}>
            <span className={s.checkInText}>
              <FormattedMessage {...messages.cancellationPolicy} />:{" "}
            </span>
            <a
              href={"/cancellation-policies/" + policyName}
              target="_blank"
              className={s.policyColor}
            >
              {policyName}
            </a>
            <div className={cx(s.checkInText)}>{policyContent}</div>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapState = (state) => ({
  razorpayPayment: state?.book?.razorpayPayment,
  specialPricing: state?.viewListing?.specialPricing,
})

const mapDispatch = {}

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Payment))
)


// Surajsinh