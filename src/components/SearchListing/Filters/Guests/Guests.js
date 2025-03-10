import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "react-intl";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Button from "react-bootstrap/lib/Button";
import cx from "classnames";
import {
  Field,
  reduxForm,
  formValueSelector,
  change,
  submit as submitForm,
} from "redux-form";
import { connect } from "react-redux";

import IncrementBtnCircle from "../../../IncrementBtnCircle";

import submit from "../../SearchForm/submit";
import messages from "../../../../locale/messages";

import s from "./Guests.css";

class Guests extends Component {
  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool,
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      personCapacity: [],
    },
    smallDevice: false,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleSubmit = async () => {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    await change("currentPage", 1);
    submitForm("SearchForm");
    handleTabToggle("guests", !isExpand);
  };

  handleReset = () => {
    const {
      fieldsSettingsData: { personCapacity },
    } = this.props;
    const { change } = this.props;
    if (personCapacity?.length > 0 && personCapacity[0]?.startValue)
      change("personCapacity", personCapacity[0]?.startValue);
    else change("personCapacity", null);
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  };

  setBtnWrapperRef = (node) => {
    this.btnWrapperRef = node;
  };

  handleClickOutside = (event) => {
    const { className, handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change("currentPage", 1);
      submitForm("SearchForm");
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle("guests", !isExpand);
      }
    }
  };

  renderIncrementButton = (field) => <IncrementBtnCircle {...field} />;

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const {
      fieldsSettingsData: { personCapacity },
      guests,
      smallDevice,
    } = this.props;
    const { formatMessage } = this.props.intl;

    let buttonLabel = formatMessage(messages.guest);

    if (guests && Number(guests) > 0 && personCapacity?.length > 0) {
      buttonLabel = guests + " ";
      buttonLabel =
        buttonLabel +
        (Number(guests) > 1
          ? personCapacity[0]?.otherItemName
          : personCapacity[0]?.itemName);
    }

    return (
      <div>
        {
          <div>
            <div
              className={cx(
                s.displayTableCell,
                s.captionTitle,
                s.fullWidth
              )}
            >
              <FormattedMessage {...messages.guests} />
              {
                guests == 1 ? <div className={s.smallText}><FormattedMessage {...messages.addGuestText} /></div> : <div className={s.smallText}><FormattedMessage {...messages.addGuests} /></div>
              }
            </div>
            <div
              className={cx(
                s.displayTableCell,
                s.fullWidth,
                "paymentGuestFilter"
              )}
            >
              <Field
                name="personCapacity"
                type="text"
                component={this.renderIncrementButton}
                maxValue={personCapacity[0]?.endValue}
                minValue={personCapacity[0]?.startValue}
                incrementBy={1}
              />
            </div>
            <div
              className={cx(
                s.searchFilterPopoverFooter,
                s.displayTable,
                s.applyBtnDesktopNoPaddingRight,
                "bgBlack"
              )}
            >
              <div className={cx("hidden-xs hidden-sm", s.displayTableCell)}>
                {guests > 0 && (
                  <Button
                    bsStyle="link"
                    className={cx(s.btnLink, 'darkModeGuestClearBtn')}
                    onClick={this.handleReset}
                  >
                    <FormattedMessage {...messages.clear} />
                  </Button>
                )}
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

Guests = reduxForm({
  form: "SearchForm", // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(Guests);

// Decorate with connect to read form values
const selector = formValueSelector("SearchForm"); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state?.listingFields?.data,
  guests: selector(state, "personCapacity"),
});

const mapDispatch = {
  change,
  submitForm,
};

export default injectIntl(
  withStyles(s)(connect(mapState, mapDispatch)(Guests))
);
