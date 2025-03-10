import React, { Component } from "react";
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import ListingItem from "../ListingItem/ListingItem";
import { calculateTotalPrice } from "../../../helpers/calculateTotalPrice";
import cs from "../../../components/commonStyle.css";
import s from "./SearchResults.css";

class ListingItemsData extends Component {
  render() {
    const { results, guests, base, rates } = this.props;
    return (
      <div className={cx(cs.displayFlex, cs.flexWrap, 'listItempopUpSection')}>
        {results.map((item, listIndex) => {
          const calculatedValues = calculateTotalPrice({
            listingData: item?.listingData, listBlockedDates: item?.blockedDates, serviceFees: item?.serviceFees, base, rates
          });
          return (
            <div className={cx(s.listItem, 'listItempopUp')} key={item?.id}>
              <ListingItem
                id={item?.id}
                basePrice={item?.listingData?.basePrice}
                currency={item?.listingData?.currency}
                title={item?.title}
                beds={item?.beds}
                personCapacity={item?.personCapacity}
                roomType={item?.settingsData[0]?.listsettings?.itemName}
                coverPhoto={item?.coverPhoto}
                listPhotos={item?.listPhotos}
                bookingType={item?.bookingType}
                reviewsCount={item?.reviewsCount}
                reviewsStarRating={item?.reviewsStarRating}
                wishListStatus={item?.wishListStatus}
                isListOwner={item?.isListOwner}
                personCount={guests}
                oneTotalPrice={item?.listingData?.oneTotalPrice}
                listBlockedDates={item?.blockedDates}
                serviceFees={item?.serviceFees}
                calculatedValues={calculatedValues}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
const mapState = (state) => ({
  base: state?.currency?.base,
  rates: state?.currency?.rates
});
export default withStyles(s, cs)(connect(mapState)(ListingItemsData));