import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import {
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../ViewMessage.css';
import * as FontAwesome from 'react-icons/lib/fa';

//Component
import PaymentDetails from './PaymentDetails';
import CancelDetails from './CancelDetails';

// Locale
import messages from '../../../locale/messages';

// Image
import arrowImage from '/public/viewMessage/tripArrow.svg'

class TripDetails extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		listId: PropTypes.number.isRequired,
		userType: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		startDate: PropTypes.string.isRequired,
		endDate: PropTypes.string.isRequired,
		personCapacity: PropTypes.number.isRequired,
		basePrice: PropTypes.number.isRequired,
		cleaningPrice: PropTypes.number.isRequired,
		currency: PropTypes.string.isRequired,
		monthlyDiscount: PropTypes.number,
		weeklyDiscount: PropTypes.number,
		cancelData: PropTypes.shape({
			guestServiceFee: PropTypes.number,
			hostServiceFee: PropTypes.number,
			refundToGuest: PropTypes.number,
			payoutToHost: PropTypes.number,
			total: PropTypes.number,
			currency: PropTypes.string,
		}),
		reservationData: PropTypes.any,
	};

	static defaultProps = {
		title: '',
		startDate: null,
		endDate: null,
		personCapacity: 0,
		reservationData: null
	};

	render() {
		const { title, startDate, endDate, personCapacity, listId, reservationData } = this.props;
		const { formatMessage } = this.props.intl;
		const { basePrice, cleaningPrice, weeklyDiscount, monthlyDiscount, userType, currency, cancelData } = this.props;
		let checkIn = startDate != null ? moment(startDate).format('MM/DD/YYYY') : '';
		let checkOut = startDate != null ? moment(endDate).format('MM/DD/YYYY') : '';

		let isCancelled = false;
		if (cancelData) {
			isCancelled = true;
		}
		return (
			<div className={cx(s.space4, s.sidebarContainer)}>
				<div className={cx(s.spaceBottom10, s.marginTopNone)}>
					<h4><FormattedMessage {...messages.tripDetails} /></h4>
				</div>
				<div>
					{/* <Link to={"/rooms/" + listId} className={s.timeText}> */}
					<a href={"/rooms/" + listId} target="_blank">
						{title}
					</a>
					{/* </Link> */}
				</div>
				<div>
					<hr className={s.horizondalLine} />
					<div className={cx(s.spaceTop3, s.space3)}>
						<div className={s.tripCheckinCheckout}>
							<div className={s.noPaddingRight}>
								<div className={cx(s.spaceBottom10, s.textBold, s.tripDetailHeading)}>
									<span><FormattedMessage {...messages.checkIn} /></span>
								</div>
								<div className={cx(s.tripDetailGrey, 'darkModeTextWhite', s.checkDate)}>{checkIn}</div>
							</div>
							<div className={cx(s.tripArrowSec, 'commonIconRTL')}>
								<img src={arrowImage} alt='' />
							</div>
							<div className={cx(s.pullRight, s.textLeft, 'viewMessageCheckOutSection')}>
								<div className={cx(s.spaceBottom10, s.textBold, s.tripDetailHeading)}>
									<span><FormattedMessage {...messages.checkOut} /></span>
								</div>
								<div className={cx(s.tripDetailGrey, 'darkModeTextWhite', s.checkDate)}>{checkOut}</div>
							</div>
						</div>
					</div>
					<hr className={s.horizondalLine} />
				</div>
				<div>
					<div className={cx(s.spaceBottom10, s.textBold, s.tripDetailHeading)}>
						<span><FormattedMessage {...messages.guests} /></span>
					</div>
					<div className={cx(s.space3, s.tripDetailGrey, 'darkModeTextWhite')}>
						<span>{personCapacity} {personCapacity > 1 ? formatMessage(messages.guestsCapcity) : formatMessage(messages.guestCapcity)}</span>
					</div>
					{
						!isCancelled && reservationData && <PaymentDetails
							userType={userType}
							startDate={startDate}
							endDate={endDate}
							basePrice={basePrice}
							cleaningPrice={cleaningPrice}
							weeklyDiscount={weeklyDiscount}
							monthlyDiscount={monthlyDiscount}
							currency={currency}
							reservationData={reservationData}
						/>
					}

					{
						isCancelled && <CancelDetails
							userType={userType}
							cancelData={cancelData}
							reservationData={reservationData}
						/>
					}

				</div>
			</div>
		);
	}
}

export default injectIntl(withStyles(s)(TripDetails));

