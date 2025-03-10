import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Button from "react-bootstrap/lib/Button";
import cx from "classnames";
import { reduxForm, change, submit as submitForm, getFormValues } from "redux-form";
import { connect } from "react-redux";

import RoomsBeds from "./RoomsBeds";
import CheckboxListItems from "./CheckboxListItems";
import Price from "./Price";
import InstantBook from "./InstantBook";
import Guests from "../Guests/Guests";
import Dates from "../Dates/Dates";

import messages from "../../../../locale/messages";
import submit from "../../SearchForm/submit";
import { openMoreFiltersModal, closeMoreFiltersModal } from "../../../../actions/modalActions";
import { setPersonalizedValues } from "../../../../actions/personalized";
import s from "./MoreFilters.css";

class MoreFilters extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      roomType: [],
      essentialsAmenities: [],
      safetyAmenities: [],
      spaces: [],
      houseRules: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      tabs: {
        dates: false,
        guests: false,
        price: false,
        instantBook: false,
        moreFilters: false,
      },
      overlay: false,
      smallDevices: false,
      verySmallDevice: false,
      tabletDevices: false,
    };
  }

  componentDidMount() {
    const { isExpand } = this.props;
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }
    if (isExpand) {
      document.querySelector("body").setAttribute("style", "overflow: hidden");
    }
  }

  componentWillUnmount() {
    let isBrowser = typeof window !== "undefined";
    if (isBrowser) {
      window.removeEventListener("resize", this.handleResize);
    }
    document.querySelector("body").removeAttribute("style");
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { isExpand } = nextProps;
    if (isExpand) {
      document.querySelector("body").setAttribute("style", "overflow: hidden");
    } else {
      document.querySelector("body").removeAttribute("style");
    }
  }

  handleResize = (e) => {
    const { tabs } = this.state;
    let isBrowser, smallDevices, verySmallDevice, tabletDevices;
    isBrowser = typeof window !== "undefined";
    smallDevices = isBrowser ? window.matchMedia("(max-width: 767px)").matches : false;
    verySmallDevice = isBrowser ? window.matchMedia("(max-width: 480px)").matches : false;
    tabletDevices = isBrowser ? window.matchMedia("(max-width: 1024px)").matches : false;

    for (let key in tabs) {
      tabs[key] = false;
    }

    this.setState({
      smallDevices,
      verySmallDevice,
      tabs,
      overlay: false,
      tabletDevices,
    });
  };

  handleTabToggle = (currentTab, isExpand) => {
    const { tabs } = this.state;
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
  };

  handleSubmitForm = async () => {
    const { closeMoreFiltersModal, handleSubmit, change } = this.props;
    await change("currentPage", 1);
    handleSubmit();
    window.scrollTo({
      top: 0,
      left: 0
    });
    closeMoreFiltersModal();
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  handleOpen = async () => {
    const { openMoreFiltersModal } = this.props;
    openMoreFiltersModal();
  };


  handleReset = async () => {
    const { change, smallDevice, tabletDevice, setPersonalizedValues, fieldsSettingsData } = this.props;
    await Promise.all([
      change("amenities", []),
      change("safetyAmenities", []),
      change("spaces", []),
      change("houseRules", []),
      change("bathrooms", 0),
      change("bedrooms", 0),
      change("beds", 0),
      change("bookingType", ""),
      change("priceRange", null),
      change("priceRangeLabel", null)
    ]);

    if (smallDevice || tabletDevice) {
      await Promise.all([
        change("roomType", []),
        change("priceRange", null),
        change("priceRangeLabel", null),
        change("bookingType", ""),
        change("dates", null)
      ]);
      setPersonalizedValues({ name: 'startDate', value: null });
      setPersonalizedValues({ name: 'endDate', value: null });
      setPersonalizedValues({ name: 'isOneTotalToggle', value: false });
      setPersonalizedValues({ name: 'totalPrice', value: false });
      if (fieldsSettingsData?.personCapacity?.length > 0 && fieldsSettingsData?.personCapacity[0]?.startValue) {
        change("personCapacity", fieldsSettingsData?.personCapacity[0]?.startValue);
      } else {
        change("personCapacity", 0);
      }
    }
  };


  render() {
    const { className, formValues, searchSettings, smallDevice, tabletDevice } = this.props;
    const { tabs, smallDevices, verySmallDevices } = this.state;
    const { fieldsSettingsData: { essentialsAmenities, safetyAmenities, spaces, houseRules } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={className} ref={this.setWrapperRef}>
        <div className={s.filterSection}>
          <div>
            {smallDevice ? (
              <div>
                <Dates
                  handleTabToggle={this.handleTabToggle}
                  isExpand={tabs?.dates}
                  smallDevice={smallDevices}
                  verySmallDevice={verySmallDevices}
                />
                <hr className={s.divider} />
                <Guests />
                <hr className={s.divider} />
                <Price
                  className={cx(s.filters, "visible-xs", s.space4, s.showTabletSection)}
                  searchSettings={searchSettings}
                  smallDevice={smallDevice}
                  tabletDevice={tabletDevice}
                />
                <InstantBook
                  className={cx(s.filters, "visible-xs", s.space4, s.showTabletSection)}
                  smallDevice={smallDevice}
                  tabletDevice={tabletDevice}
                />
              </div>
            ) : (
              <div>
                <Price
                  className={cx(s.filters, s.space4)}
                  searchSettings={searchSettings}
                  smallDevice={smallDevice}
                  tabletDevice={tabletDevice}
                />
                <InstantBook
                  className={cx(s.filters, s.space4)}
                  smallDevice={smallDevice}
                  tabletDevice={tabletDevice}
                />
              </div>
            )}
            <RoomsBeds className={cx(s.filters, s.space4)} />
            <CheckboxListItems
              className={cx(s.filters, s.space4)}
              fieldName={"amenities"}
              options={essentialsAmenities}
              captionTitle={formatMessage(messages.aminities)}
              showLabel={formatMessage(messages.showAmenities)}
              hideLabel={formatMessage(messages.closeAmenities)}
              isActive={formValues?.amenities?.length > 0}
              showImage={true}
            />
            <CheckboxListItems
              className={cx(s.filters, s.space4)}
              fieldName={"safetyAmenities"}
              options={safetyAmenities}
              captionTitle={formatMessage(messages.safetyamenities)}
              showLabel={formatMessage(messages.showAmenities)}
              hideLabel={formatMessage(messages.closeAmenities)}
              isActive={formValues?.safetyAmenities?.length > 0}
              showImage={true}
            />
            <CheckboxListItems
              className={cx(s.filters, s.space4)}
              fieldName={"spaces"}
              options={spaces}
              captionTitle={formatMessage(messages.sharedSpaces)}
              showLabel={formatMessage(messages.showAllFacilities)}
              hideLabel={formatMessage(messages.closeFacilities)}
              isActive={formValues?.spaces?.length > 0}
              showImage={true}
            />
            <CheckboxListItems
              fieldName={"houseRules"}
              options={houseRules}
              captionTitle={formatMessage(messages.houseRules)}
              showLabel={formatMessage(messages.showAllHouseRules)}
              hideLabel={formatMessage(messages.closeHouseRules)}
              isActive={formValues?.houseRules?.length > 0}
            />
          </div>
        </div>
        <div className={s.footerSection}>
          <Button
            bsStyle="link"
            className={cx(s.btnLink, s.linkText, "bgBlack")}
            onClick={() => this.handleReset()}
          >
            <FormattedMessage {...messages.clear} />
          </Button>
          <Button
            className={cx(s.btn, s.btnSecondary, s.applyBtn)}
            onClick={this.handleSubmitForm}
          >
            <FormattedMessage {...messages.applyFilters} />
          </Button>
        </div>
      </div>
    );
  }
}

MoreFilters = reduxForm({
  form: "SearchForm",
  onSubmit: submit,
  destroyOnUnmount: false,
})(MoreFilters);

const mapState = (state) => ({
  fieldsSettingsData: state?.listingFields?.data,
  formValues: getFormValues("SearchForm")(state),
});

const mapDispatch = {
  change,
  submitForm,
  openMoreFiltersModal,
  closeMoreFiltersModal,
  setPersonalizedValues
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(MoreFilters)));
