import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';

import CountDown from '../../CountDown';
import Link from '../../Link';
import fetch from '../../../core/fetch';

import { bookingProcess } from '../../../actions/booking/bookingProcess';
import messages from '../../../locale/messages';
import showToaster from '../../../helpers/showToaster';

import s from '../ViewMessage.css';
import bt from '../../../components/commonStyle.css';


class GuestActions extends Component {
    static propTypes = {
        actionType: PropTypes.string.isRequired,
        hostDisplayName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        startDate: PropTypes.string.isRequired,
        endDate: PropTypes.string.isRequired,
        personCapacity: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        reservationId: PropTypes.number,
        formatMessage: PropTypes.any,
    };

    constructor(props) {
        super(props);
        this.preBook = this.preBook.bind(this);
    }

    async preBook() {
        const { bookingProcess, threadId, listId, startDate, endDate, personCapacity, listPublishStatus } = this.props;
        const preApprove = true;
        let query = `query checkReservation ($checkIn: String,$checkOut: String,$listId: Int ){
            checkReservation(checkIn: $checkIn, checkOut:$checkOut, listId:$listId ){
              id
              listId
              hostId
              guestId
              checkIn
              checkOut
              status
              errorMessage
            }
          }`;

        const params = {
            listId: listId,
            checkIn: startDate,
            checkOut: endDate,
        };

        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: params,
            }),
            credentials: 'include',
        });
        const { data } = await resp.json();

        if (data && data.checkReservation) {
            if (data.checkReservation.status == "200") {
                if (listPublishStatus) {
                    bookingProcess(listId, personCapacity, startDate, endDate, preApprove, true, threadId)
                } else {
                    showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.checkReservation?.errorMessage })
                }
            }
            else if (data.checkReservation.status == "400") {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.checkReservation?.errorMessage })
            } else {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.checkReservation?.errorMessage })
            }
        }
    }

    // Inquiry
    inquiry(hostDisplayName) {
        const { listId } = this.props;
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'bgBlackTwo')}>
                <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.messageAction1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction2} /></h4>
                <p className={cx(s.marginNone, s.contentSubText)}>
                    <FormattedMessage {...messages.messageActionInfo} />
                </p>
                <div className={s.contentSectionBtn}>
                    <Link to={"/rooms/" + listId} className={cx(s.linkBtn, bt.btnPrimary)}><FormattedMessage {...messages.RequestToBook} /></Link>
                </div>
            </div>
        );
    }

    // Request to book
    requestToBook(hostDisplayName) {
        const { reservationId } = this.props;
        const { createdAt } = this.props;
        let startDate = moment();
        let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
        let distance = Number(next24Hours - startDate);
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'darkModeInfoContentBg')}>
                {
                    distance > 0 &&
                    <div>
                        <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.messageAction3} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} /></h4>
                        <p className={cx(s.marginNone, s.contentSubText)}>
                            {/* <FormattedMessage {...messages.cancelInfo} /> */}
                            <FormattedMessage {...messages.cancelInfoBooking} />
                        </p>
                    </div>
                }

                {
                    distance < 0 && <h4><FormattedMessage {...messages.bookingExpiredTitle} /></h4>
                }
            </div>
        );
    }

    // Request to book/ Inquiry declined
    declined() {
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'darkModeInfoContentBg')}>
                <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.requestDeclined} /></h4>
                <p className={cx(s.marginNone, s.contentSubText)}><FormattedMessage {...messages.guestDeclinedInfo} /></p>
            </div>
        );
    }

    // Request to book / Pre-approved by host
    approved(hostDisplayName) {
        const { createdAt } = this.props;
        let startDate = moment();
        let next24Hours = moment(createdAt).add(23, 'hours').add(59, 'minutes');
        let distance = Number(next24Hours - startDate);
        let options = { endDate: next24Hours };
        if (distance < 0) {
            return this.expired();
        } else {
            return (
                <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'darkModeInfoContentBg')}>
                    <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.requestApprovedAction1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} /></h4>
                    <p className={cx(s.marginNone, s.contentSubText)}>
                        <FormattedMessage {...messages.requestTimeInfo1} /> <CountDown options={options} /> <FormattedMessage {...messages.requestTimeInfo2} />
                    </p>
                    <div className={s.contentSectionBtn}>
                        <Button className={bt.btnPrimary} onClick={() => this.preBook()}>
                            <FormattedMessage {...messages.book} />
                        </Button>
                    </div>
                </div>
            );
        }
    }

    // Booking confirmed by host/ instant booking
    bookingConfirmed(hostDisplayName) {
        const { reservationId, isCancelButtonShown } = this.props;
        if (!isCancelButtonShown) return <span></span>;
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'bgBlackTwo')}>
                <h4 className={s.contentBlockHeading}>
                    <FormattedMessage {...messages.bookingConfirmedInfo1} /> {hostDisplayName} <FormattedMessage {...messages.messageAction4} />
                </h4>
                <p className={cx(s.marginNone, s.contentSubText)}><FormattedMessage {...messages.bookingCanceledInfo} /></p>
                <div className={s.contentSectionBtn}>
                    <Link to={"/cancel/" + reservationId + "/guest"} className={cx(s.linkBtn, bt.btnPrimary)}>
                        <FormattedMessage {...messages.cancelTrip} />
                    </Link>
                </div>
            </div>
        );
    }

    // Pre-approved or approved by host is expired
    expired() {
        const { listId } = this.props;
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'bgBlackTwo')}>
                <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.bookingExpiredTitle} /></h4>
                <p className={cx(s.marginNone, s.contentSubText)}>
                    <FormattedMessage {...messages.bookingExpiredInfo} />
                </p>
                <div className={s.contentSectionBtn}>
                    <Link to={"/rooms/" + listId} className={cx(s.linkBtn, bt.btnPrimary)}>
                        <FormattedMessage {...messages.gotoListing} />
                    </Link>
                </div>
            </div>
        );
    }

    // Booking is cancelled by host
    cancelled() {
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'bgBlackTwo')}>
                <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.bookingRequestCancel1} /></h4>
                <p className={cx(s.marginNone, s.contentSubText)}>
                    <FormattedMessage {...messages.bookingRequestCancel2} />
                </p>
            </div>
        );
    }

    completed() {
        return (
            <div className={cx(s.spaceBottom15, s.contextPadding, s.infoContentBlock, 'bgBlackTwo')}>
                <h4 className={s.contentBlockHeading}><FormattedMessage {...messages.tripCompleted} /></h4>
                <p className={cx(s.marginNone, s.contentSubText)}>
                    <FormattedMessage {...messages.tripCompleted} />
                </p>
            </div>
        );
    }

    render() {
        const { actionType, hostDisplayName } = this.props;

        if (actionType === 'inquiry') {
            return this.inquiry(hostDisplayName);
        } else if (actionType === 'preApproved') {
            return this.approved(hostDisplayName);
        } else if (actionType === 'declined') {
            return this.declined();
        } else if (actionType === 'intantBooking' || actionType === 'approved' || actionType === 'instantBooking') {
            return this.bookingConfirmed(hostDisplayName);
        } else if (actionType === 'requestToBook') {
            return this.requestToBook(hostDisplayName);
        } else if (actionType === 'expired') {
            return this.expired();
        } else if (actionType === 'cancelledByHost' || actionType === 'cancelledByGuest') {
            return this.cancelled();
        } else if (actionType === 'completed') {
            return this.completed();
        }
    }
}

const mapState = (state) => ({});

const mapDispatch = {
    bookingProcess,
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(GuestActions)));