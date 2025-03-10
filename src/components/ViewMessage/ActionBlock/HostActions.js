import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormattedMessage, injectIntl } from "react-intl";
import moment from "moment";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import * as FontAwesome from "react-icons/lib/fa";

// component
import CountDown from "../../CountDown";
import Link from "../../Link";

// action
import { sendMessageAction } from "../../../actions/message/sendMessageAction";
import messages from "../../../locale/messages";

// style
import s from "../ViewMessage.css";
import bt from "../../../components/commonStyle.css";

class HostActions extends Component {
  static propTypes = {
    actionType: PropTypes.string.isRequired,
    sendMessageAction: PropTypes.any.isRequired,
    threadId: PropTypes.number.isRequired,
    reservationId: PropTypes.number,
    threadType: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    personCapacity: PropTypes.number.isRequired,
    guestDisplayName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
    hostDisplayName: PropTypes.string.isRequired,
  };

  async sendMessage(type) {
    const {
      sendMessageAction,
      threadId,
      threadType,
      startDate,
      endDate,
      personCapacity,
      reservationId,
    } = this.props;

    sendMessageAction(
      threadId,
      threadType,
      null,
      type,
      startDate,
      endDate,
      personCapacity,
      reservationId,
      null,
      null,
      null,
      null
    );
  }

  // Inquiry
  inquiry(guestDisplayName) {
    const { createdAt, loading } = this.props;
    let startDate = moment();
    let next24Hours = moment(createdAt).add(23, "hours").add(59, "minutes");
    let distance = next24Hours - startDate;
    let options = { endDate: next24Hours };
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        {distance > 0 ? (
          <div>
            <h4 className={s.contentBlockHeading}>
              <FormattedMessage {...messages.hostAction1} /> {guestDisplayName}{" "}
              <FormattedMessage {...messages.hostAction2} />
            </h4>
            <p className={cx(s.marginNone, s.contentSubText)}>
              <FormattedMessage {...messages.hostAction3} /> {guestDisplayName}{" "}
              <FormattedMessage {...messages.hostAction4} />
            </p>
            <p className={cx(s.spaceTop2, s.timerSection)}>
              <span>
                <FontAwesome.FaClockO className={cx(s.textGray, s.timerIcon)} />
              </span>
              <span>
                <FormattedMessage {...messages.hostResponseTime1} />{" "}
                <CountDown options={options} />{" "}
                <FormattedMessage {...messages.hostResponseTime2} />
              </span>
            </p>

            <div className={s.contentSectionBtn}>
              <Button
                className={bt.btnPrimary}
                disabled={loading}
                onClick={() => this.sendMessage("preApproved")}
              >
                <FormattedMessage {...messages.preApprove} />
              </Button>
            </div>
          </div>
        ) : (
          <h4>
            <FormattedMessage {...messages.requestBookExpire} />
          </h4>
        )}
      </div>
    );
  }

  // Request to book
  requestToBook(guestDisplayName) {
    const { createdAt, listPublishStatus, loading } = this.props;
    let startDate = moment();
    //let next24Hours = moment(createdAt).add(24, 'hours');
    let next24Hours = moment(createdAt).add(23, "hours").add(59, "minutes");
    let distance = next24Hours - startDate;
    let options = { endDate: next24Hours };

    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        {distance > 0 && (
          <div>
            <h4 className={s.contentBlockHeading}>
              {guestDisplayName} <FormattedMessage {...messages.guestRequest} />
            </h4>
            <p className={cx(s.marginNone, s.contentSubText)}>
              <FormattedMessage {...messages.hostAction3} /> {guestDisplayName}{" "}
              <FormattedMessage {...messages.hostAction4} />
            </p>
            <p className={cx(s.marginNone, s.contentSubText, s.spaceTop2)}>
              <FormattedMessage {...messages.hostResponseTime1} />{" "}
              <CountDown options={options} />{" "}
              <FormattedMessage {...messages.hostResponseTime2} />
            </p>
          </div>
        )}
        {distance > 0 && listPublishStatus && (
          <div className={s.contentSectionBtn}>
            <Button
              className={cx(bt.btnPrimary)}
              disabled={loading}
              onClick={() => this.sendMessage("approved")}
            >
              <FormattedMessage {...messages.approve} />
            </Button>
            <Button
              className={cx(bt.btnPrimaryBorder, s.btnRight, "requestBookBtn")}
              disabled={loading}
              onClick={() => this.sendMessage("declined")}
            >
              <FormattedMessage {...messages.decline} />
            </Button>
          </div>
        )}
        {distance < 0 && (
          <h4 className={s.contentBlockHeading}>
            {" "}
            <FormattedMessage {...messages.requestBookExpire} />
          </h4>
        )}
      </div>
    );
  }

  // Inquiry pre-approved
  approved() {
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.requestApproved} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          <FormattedMessage {...messages.timeToExpire} />
        </p>
      </div>
    );
  }

  // Request to book/ Inquiry declined
  declined() {
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.requestDeclined} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          <FormattedMessage {...messages.declinedInfo} />
        </p>
      </div>
    );
  }

  // Booking confirmed by host/ instant booking
  bookingConfirmed() {
    const { reservationId, isCancelButtonShown, isAdminAuthenticated } =
      this.props;
    if (!isCancelButtonShown) return <span></span>;
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.bookingIsConfirmed} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          <FormattedMessage {...messages.contactGuest} />
        </p>
        <div className={s.contentSectionBtn}>
          {!isAdminAuthenticated && (
            <Link
              to={"/cancel/" + reservationId + "/host"}
              className={cx(s.linkBtn, bt.btnPrimary)}
            >
              <FormattedMessage {...messages.cancelTrip} />
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Pre-approved or approved by host is expired
  expired(guestDisplayName) {
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.bookingIsExpired} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          {guestDisplayName}'s{" "}
          <FormattedMessage {...messages.bookingIsExpired1} />
        </p>
      </div>
    );
  }

  // Booking is cancelled by host
  cancelled(guestDisplayName) {
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.bookingRequestCancel1} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          {guestDisplayName}'s{" "}
          <FormattedMessage {...messages.bookingRequestCancel3} />
        </p>
      </div>
    );
  }

  completed() {
    return (
      <div
        className={cx(
          s.spaceBottom15,
          s.contextPadding,
          s.infoContentBlock,
          "darkModeInfoContentBg"
        )}
      >
        <h4 className={s.contentBlockHeading}>
          <FormattedMessage {...messages.reservationIsCompleted} />
        </h4>
        <p className={cx(s.marginNone, s.contentSubText)}>
          <FormattedMessage {...messages.reservationIsCompletedDescription} />
        </p>
      </div>
    );
  }

  render() {
    const { actionType, guestDisplayName } = this.props;
    if (actionType === "inquiry") {
      return this.inquiry(guestDisplayName);
    } else if (actionType === "preApproved") {
      return this.approved();
    } else if (actionType === "declined") {
      return this.declined();
    } else if (
      actionType === "intantBooking" ||
      actionType === "approved" ||
      actionType === "instantBooking"
    ) {
      return this.bookingConfirmed();
    } else if (actionType === "requestToBook") {
      return this.requestToBook(guestDisplayName);
    } else if (actionType === "expired") {
      return this.expired(guestDisplayName);
    } else if (
      actionType === "cancelledByHost" ||
      actionType === "cancelledByGuest"
    ) {
      return this.cancelled(guestDisplayName);
    } else if (actionType === "completed") {
      return this.completed();
    }
  }
}

const mapState = (state) => ({
  loading: state.loader.hostAction,
  isAdminAuthenticated: state.runtime.isAdminAuthenticated,
});

const mapDispatch = {
  sendMessageAction,
};

export default injectIntl(
  withStyles(s, bt)(connect(mapState, mapDispatch)(HostActions))
);
