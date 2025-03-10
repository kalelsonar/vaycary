import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { formValueSelector } from "redux-form";
import InfiniteScroll from "react-infinite-scroll-loader-y";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import { graphql, compose } from "react-apollo";
import { InView } from 'react-intersection-observer';

import ListingItem from "../ListingItem";
import Loader from "../../Loader/Loader";
import GetSearchResults from "./GetSearchResults.graphql";
import { getSearchResults } from "../../../actions/getSearchResults";
import { calculateTotalPrice } from "../../../helpers/calculateTotalPrice";
import { searchLimit } from '../../../config';

import s from "./SearchResults.css";
import cs from '../../../components/commonStyle.css';

class InfiniteScrollResults extends React.Component {
  static propTypes = {
    results: PropTypes.array,
    total: PropTypes.number,
    isResultLoading: PropTypes.bool,
    personalized: PropTypes.shape({
      isOneTotalToggle: PropTypes.bool,
    }),
  };

  static defaultProps = {
    results: [],
    showMap: false,
    showMapLoader: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isScrollMoreLoader: false
    };
  }

  handleInViewChange = (inView) => {
    if (inView) this.scrollMore();
  };

  scrollMore = async () => {
    const {
      getSearchResults,
      getSearchResultData: { fetchMore },
      results,
      dates,
      personCapacity,
      lat,
      lng,
      roomType,
      bedrooms,
      bathrooms,
      beds,
      amenities,
      safetyAmenities,
      spaces,
      houseRules,
      priceRange,
      geography,
      bookingType,
      geoType,
      searchByMap,
      sw_lat,
      sw_lng,
      ne_lat,
      ne_lng,
      totalPrice,
      total,
    } = this.props;

    const offset = results?.length || 0;
    this.setState({ isScrollMoreLoader: true });
    await fetchMore({
      query: GetSearchResults,
      variables: {
        offset,
        loadCount: searchLimit,
        dates,
        personCapacity,
        lat,
        lng,
        roomType,
        bedrooms,
        bathrooms,
        beds,
        amenities,
        safetyAmenities,
        spaces,
        houseRules,
        priceRange,
        geography,
        bookingType,
        geoType,
        searchByMap,
        sw_lat,
        sw_lng,
        ne_lat,
        ne_lng,
        isOneTotalToggle: totalPrice,
      },
      updateQuery: async (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          await getSearchResults({
            count: total,
            results,
          });
          this.setState({ isScrollMoreLoader: false });
          return {
            SearchListing: {
              count: total,
              results,
            },
          };
        }

        await getSearchResults({
          count: fetchMoreResult?.SearchListing?.count,
          results: [
            ...results,
            ...fetchMoreResult?.SearchListing?.results,
          ],
        });
        this.setState({ isScrollMoreLoader: false });
        return {
          SearchListing: {
            count: fetchMoreResult?.SearchListing?.count,
            results: [
              ...results,
              ...fetchMoreResult?.SearchListing?.results,
            ],
          },
        };
      },
    });
  };

  render() {
    const { results, guests, total, base, rates } = this.props;
    const { isScrollMoreLoader } = this.state;

    return (
      <>
        <InfiniteScroll
          loader={isScrollMoreLoader ? <Loader type={"text"} /> : <></>}
          dataLength={results?.length}
          loadMore={() => this.scrollMore()}
          hasMore={(results?.length) < total}
          loadFirstSetOnInit={!results.length}
          startPage={Math.ceil(results?.length / searchLimit)}
        >
          <div className={cx(cs.displayFlex, cs.flexWrap, 'listItempopUpSection')}>
            {results?.length > 0 && results?.map((item) => {
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
        </InfiniteScroll>
        <InView onChange={this.handleInViewChange}>
        </InView>
      </>
    );
  }
}

const selector = formValueSelector("SearchForm");

const mapState = (state) => ({
  results: state?.search?.data,
  dates: selector(state, "dates"),
  totalPrice: selector(state, "totalPrice"),
  initialLoad: selector(state, "initialLoad"),
  total: state?.search?.count,
  lat: selector(state, "lat"),
  lng: selector(state, "lng"),
  roomType: selector(state, "roomType"),
  bedrooms: selector(state, "bedrooms"),
  bathrooms: selector(state, "bathrooms"),
  beds: selector(state, "beds"),
  amenities: selector(state, "amenities"),
  safetyAmenities: selector(state, "safetyAmenities"),
  bookingType: selector(state, "bookingType"),
  spaces: selector(state, "spaces"),
  houseRules: selector(state, "houseRules"),
  priceRange: selector(state, "priceRange"),
  geoType: selector(state, "geoType"),
  searchByMap: selector(state, "searchByMap"),
  sw_lat: selector(state, "sw_lat"),
  sw_lng: selector(state, "sw_lng"),
  ne_lat: selector(state, "ne_lat"),
  ne_lng: selector(state, "ne_lng"),
  isResultLoading: state?.search?.isResultLoading,
  showMap: state?.personalized?.showMap,
  showMapLoader: state?.loader?.showMapLoading,
  personCapacity: Number(selector(state, "personCapacity")),
  isOneTotalToggle: state?.personalized?.isOneTotalToggle,
  base: state?.currency?.base,
  rates: state?.currency?.rates,
  geography: selector(state, 'geography')
});

const mapDispatch = {
  getSearchResults,
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(GetSearchResults, {
    name: "getSearchResultData",
    options: (props) => ({
      variables: {
        personCapacity: props.personCapacity,
        dates: props.dates,
        lat: props.lat,
        lng: props.lng,
        roomType: props.roomType,
        bedrooms: props.bedrooms,
        bathrooms: props.bathrooms,
        beds: props.beds,
        amenities: props.amenities,
        safetyAmenities: props.safetyAmenities,
        spaces: props.spaces,
        houseRules: props.houseRules,
        priceRange: props.priceRange,
        geography: props.geography,
        bookingType: props.bookingType,
        geoType: props.geoType,
        searchByMap: props.searchByMap,
        sw_lat: props.sw_lat,
        sw_lng: props.sw_lng,
        ne_lat: props.ne_lat,
        ne_lng: props.ne_lng,
      },
      ssr: false,
      fetchPolicy: "network-only",
    }),
  })
)(InfiniteScrollResults);
