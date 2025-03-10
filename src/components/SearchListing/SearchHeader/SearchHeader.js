import React, { Component } from "react";
import { injectIntl } from "react-intl";
import {
  reduxForm,
  getFormValues,
} from "redux-form";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import cx from "classnames";

import PlacesSuggest from "../PlacesSuggest";
import WebFilter from "./WebFilter";
import MobileFilter from "./MobileFilter";

import { openMoreFiltersModal } from "../../../actions/modalActions";
import history from "../../../core/history";

import filterIcon from '/public/SiteIcons/moreFilterIcon.svg';

import s from "./SearchHeader.css";

class SearchHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        guests: false,
        homeType: false,
        price: false,
        instantBook: false,
        moreFilters: false,
      },
      overlay: false,
      smallDevice: false,
      verySmallDevice: false,
      tabletDevice: false,
    };
  }

  componentDidMount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      window.removeEventListener("resize", this.handleResize);
    }
  }

  handleResize = (e) => {
    const { tabs } = this.state;
    let isBrowser, smallDevice, verySmallDevice, tabletDevice;
    isBrowser = typeof window !== "undefined";
    smallDevice = isBrowser
      ? window.matchMedia("(max-width: 767px)").matches
      : false;
    verySmallDevice = isBrowser
      ? window.matchMedia("(max-width: 480px)").matches
      : false;
    tabletDevice = isBrowser
      ? window.matchMedia("(max-width: 1024px)").matches
      : false;

    for (let key in tabs) {
      tabs[key] = false;
    }

    this.setState({
      smallDevice,
      verySmallDevice,
      tabs,
      overlay: false,
      tabletDevice,
    });
  };

  handleTabToggle = (currentTab, isExpand) => {
    const { showForm, showResults, showFilter } = this.props;
    const { tabs, smallDevice } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }

    this.setState({
      tabs,
      overlay: isExpand,
    });

    if (smallDevice) {
      if (isExpand) {
        showFilter();
      } else {
        showResults();
      }
    }
  };

  handleOpen = () => {
    const { openMoreFiltersModal } = this.props;
    openMoreFiltersModal();
  };

  handleClick = () => {
    const { personalized } = this.props;
    let updatedURI, uri = '/s?';
    if (personalized.location) {
      uri = uri + '&address=' + personalized.location;
    }
    updatedURI = encodeURI(uri);
    history.push(updatedURI);
  }


  renderPlacesSuggest = ({ input, label }) => {
    return <PlacesSuggest label={label}  handleSubmit={this.handleClick}/>;
  };

  render() {
    const { searchSettings, formValues, showResults, showFilter, fieldsSettingsData: { roomType } } = this.props;
    const { tabs, smallDevice, verySmallDevice, tabletDevice } = this.state;

    let isActiveFilter = false, isActiveMoreFilter = false;
    if (
      (formValues?.beds ||
        formValues?.bedrooms ||
        formValues?.bathrooms ||
        formValues?.amenities?.length ||
        formValues?.safetyAmenities?.length ||
        formValues?.spaces?.length ||
        formValues?.houseRules?.length ||
        formValues?.bookingType == "instant" ||
        formValues?.priceRange
      )
    ) {
      isActiveMoreFilter = true;
      isActiveFilter = true;
    }

    if (
      (smallDevice || verySmallDevice || tabletDevice) &&
      (formValues?.bookingType ||
        formValues?.priceRange ||
        formValues?.dates ||
        formValues?.personCapacity > 1)
    ) {
      isActiveFilter = true;
      isActiveMoreFilter = true;
    }

    return (
      <div>
        <div
          className={cx(s.searchHeaderContainerBox, 'searchHeaderContainerBoxRTL', {
            [s.fullResponsiveContainer]:
              tabs?.dates == true ||
              tabs?.guests == true ||
              tabs?.moreFilters == true,
          })}
        >
          <div
            className={cx(
              s.searchHeaderContainer,
              s.responsiveNoPadding,
              "bgBlack",
              "searchHeaderPlaceSuggest"
            )}
          >
            {
              (smallDevice || verySmallDevice) && <MobileFilter
                renderPlacesSuggest={this.renderPlacesSuggest}
                filterIcon={filterIcon}
                handleOpen={this.handleOpen}
                isActiveMoreFilter={isActiveMoreFilter}
                isActiveFilter={isActiveFilter}
              />
            }
            <WebFilter
              roomType={roomType}
              handleOpen={this.handleOpen}
              filterIcon={filterIcon}
              handleTabToggle={this.handleTabToggle}
              isExpand={tabs?.moreFilters}
              searchSettings={searchSettings}
              smallDevice={smallDevice}
              tabletDevice={tabletDevice}
              verySmallDevice={verySmallDevice}
              showFilter={showFilter}
              showResults={showResults}
              isActiveMoreFilter={isActiveMoreFilter}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchHeader = reduxForm({
  form: "LocationSearchForm", // a unique name for this form
  destroyOnUnmount: false,
})(SearchHeader);

const mapState = (state) => ({
  formValues: getFormValues("SearchForm")(state),
  fieldsSettingsData: state?.listingFields?.data,
  personalized: state?.personalized,
});

const mapDispatch = {
  openMoreFiltersModal,
};
export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(SearchHeader))
);
