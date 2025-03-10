import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/lib/Button";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from "classnames";
import * as FontAwesome from "react-icons/lib/fa";
import ReactGoogleMapLoader from "react-google-maps-loader";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";

import SearchResults from "../../components/SearchListing/SearchResults";
import MapResults from "../../components/SearchListing/MapResults";
import Loader from "../../components/Loader";
import SearchHeader from "../../components/SearchListing/SearchHeader";

import messages from "../../locale/messages";
import { googleMapAPI } from "../../config";
import {
  showMap,
  showResults,
  showForm,
  showFilter,
} from "../../actions/mobileSearchNavigation";
import { getListingFields } from "../../actions/getListingFields";

//Images
import mapIcon from '/public/SiteIcons/searchMapIcon.svg';
import mapListingIcon from '/public/SiteIcons/searchMapListing.svg';

import cs from '../../components/commonStyle.css';
import s from "./Search.css";

class Search extends React.Component {
  static propTypes = {
    initialFilter: PropTypes.object,
    searchSettings: PropTypes.object,
    filterToggle: PropTypes.bool,
    showMap: PropTypes.func.isRequired,
    showResults: PropTypes.func.isRequired,
    showForm: PropTypes.func.isRequired,
    formatMessage: PropTypes.func,
    mapListingView: PropTypes.shape({
      searchMap: PropTypes.bool,
      searchResults: PropTypes.bool,
      searchForm: PropTypes.bool,
    }),
    getListingFields: PropTypes.func,
  };

  static defaultProps = {
    mapListingView: {
      searchMap: false,
      searchResults: true,
      searchForm: false,
      searchFilter: false,
    },
    isMapShow: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      smallDevice: false,
      load: false,
    };
  }

  UNSAFE_componentWillMount() {
    const { getListingFields } = this.props;
    // Get listing settings fields data
    getListingFields();
  }

  componentDidMount() {
    const { showResults } = this.props;
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }

    this.setState({
      load: true,
    });
    showResults()
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleResize = (e) => {
    const { showResults } = this.props;
    const isBrowser = typeof window !== "undefined";
    const smallDevice = isBrowser
      ? window.matchMedia("(max-width: 1199px)").matches
      : false;
    this.setState({ smallDevice });
  };

  mobileNavigation() {
    const {
      mapListingView: { searchMap, searchResults },
      showMap,
      showResults,
      showForm,
    } = this.props;

    let leftNavigation, rightNavigation;
    if (searchResults) {
      leftNavigation = (
        <Button
          className={cx(s.filterButton, s.locationBtn, "bgBlack", cs.displayFlex, cs.alignCenter, cs.fontWeightMedium)}
          bsStyle="link"
          onClick={() => showMap()}
        >
          <img src={mapIcon} className={s.filterButtonIcons} />
          <FormattedMessage {...messages.showMap} />
        </Button>
      );
      rightNavigation = (
        <Button
          className={cx(s.filterButton)}
          bsStyle="link"
          onClick={() => showForm()}
        >
          <FormattedMessage {...messages.filters} />
          <FontAwesome.FaSliders />
        </Button>
      );
    }

    if (searchMap) {
      leftNavigation = (
        <Button className={cx(s.filterButton, 'bgBlack', cs.displayFlex, cs.alignCenter, cs.fontWeightMedium)} bsStyle="link" onClick={() => showResults()}>
          <img src={mapListingIcon} className={s.filterButtonIcons} />
          <FormattedMessage {...messages.mapListing} />{" "}
        </Button>
      );
      rightNavigation = (
        <Button
          className={cx(s.filterButton, "bgBlack", cs.fontWeightMedium)}
          bsStyle="link"
          onClick={() => showForm()}
        >
          <FormattedMessage {...messages.filters} />
          <FontAwesome.FaSliders />
        </Button>
      );
    }

    return (
      <div className={cx(s.mobileNavigation, "mobileNavigationRTL", cs.displayFlex, cs.alignCenter, cs.justifyContentCenter)}>
        {leftNavigation}
      </div>
    );
  }

  render() {
    const {
      mapListingView: { searchMap, searchResults, searchForm, searchFilter },
      searchSettings,
      initialFilter,
      filterToggle,
      isMapShow,
      showFilter,
      showResults,
      extendMap,
    } = this.props;

    const { smallDevice, load } = this.state;

    let DesktopResults = true;
    if (filterToggle === true) {
      DesktopResults = false;
    }
    const isBrowser = typeof window !== "undefined";

    if (!load || !isBrowser) {
      return (
        <div className={s.searchLoaderContainer}>
          <Loader type={"text"} />
        </div>
      );
    }

    return (
      <div>
        {!smallDevice && <SearchHeader searchSettings={searchSettings} />}
        {smallDevice && !searchMap && (
          <SearchHeader
            showFilter={showFilter}
            showResults={showResults}
            searchSettings={searchSettings}
          />
        )}
        <div
          className={cx(s.searchResultContainer, 'searchPage')}
        >
          {!smallDevice && !searchMap && !extendMap && DesktopResults && (
            <>
              <SearchResults />
            </>
          )}

          {smallDevice && searchResults && (
            <>
              <SearchResults />
            </>
          )}
        </div>

        {!smallDevice && isMapShow && searchMap && (
          <div
            className={cx(
              s.searchMapContainer,
              "searchMapSection searchMapSectionRtl",
              { [s.searchMapContainerShow]: extendMap == true },
              { ["searchMapContainerShowRTL"]: extendMap == true }
            )}
          >
            <ReactGoogleMapLoader
              params={{
                key: googleMapAPI, // Define your api key here
                libraries: "places,geometry,markerwithlabel", // To request multiple libraries, separate them with a comma
              }}
              render={(googleMaps) =>
                googleMaps && (
                  <MapResults
                    initialFilter={initialFilter}
                    searchSettings={searchSettings}
                  />
                )
              }
            />
          </div>
        )}

        {smallDevice && searchMap && (
          <div
            className={cx(
              s.searchMapContainer,
              "searchMapSection searchMapSectionRtl"
            )}
          >
            <MapResults
              initialFilter={initialFilter}
              searchSettings={searchSettings}
              smallDevice={smallDevice}
            />
          </div>
        )}

        {!searchForm && this.mobileNavigation()}

      </div>
    );
  }
}

const selector = formValueSelector("SearchForm");

const mapState = (state) => ({
  filterToggle: state?.toggle?.filterToggle,
  mapListingView: state?.mapListingView?.data,
  isMapShow: state?.personalized?.showMap,
  extendMap: state?.personalized?.extendMap,
  results: state?.search?.data,
});

const mapDispatch = {
  showMap,
  showResults,
  showForm,
  getListingFields,
  showFilter,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Search))
);