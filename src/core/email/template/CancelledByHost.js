import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import EmailSignature from './EmailSignature';
import CurrencyView from '../modules/CurrencyView';
import { PRIMARYCOLOR } from '../../../constants';
//Helper
import { getDateUsingTimeZone } from '../../../helpers/dateRange';
class CancelledByHost extends Component {
	static propTypes = {
		content: PropTypes.shape({
			hostName: PropTypes.string.isRequired,
			guestName: PropTypes.string.isRequired,
			checkIn: PropTypes.string.isRequired,
			confirmationCode: PropTypes.number.isRequired,
			listTitle: PropTypes.string.isRequired,
			refundToGuest: PropTypes.number.isRequired,
			currency: PropTypes.string.isRequired
		}).isRequired
	};

	static defaultProps = {
		content: {
			refundToGuest: 0
		}
	};

	render() {
		const textStyle = {
			color: '#282828',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px',
		};

		const { content: { guestName, hostName, confirmationCode, checkIn, listTitle, refundToGuest, currency, logo, country, siteName } } = this.props;
		let checkInDate = checkIn != null ? moment(checkIn).format('ddd, Do MMM, YYYY') : '',
			momentStartDate = moment(checkIn).startOf('day');
		let today = getDateUsingTimeZone(country, false), interval = momentStartDate.diff(today, 'days'), isPastDay = false;
		if (interval < 0) {
			isPastDay = true;
		}
		return (
			<Layout>
				<Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" logo={logo} siteName={siteName} />
				<div>
					<Table width="100%" >
						<TBody>
							<TR>
								<TD style={textStyle}>
									<EmptySpace height={20} />
									<div>
										Hi {guestName},
									</div>
									<EmptySpace height={20} />
									<div>
										We regret to inform you that your host {hostName} has unfortunately cancelled your reservation
										{' '}{confirmationCode} at {listTitle} {isPastDay ? 'started' : 'starting'} on {checkInDate}.
										{
											refundToGuest > 0 && <span>
												{' '}As per the cancellation policy you will be refunded <CurrencyView amount={refundToGuest} currency={currency} /> and notified.
											</span>
										}

									</div>
									<EmptySpace height={40} />
									<EmailSignature siteName={siteName} />
								</TD>
							</TR>
						</TBody>
					</Table>
					<EmptySpace height={40} />
				</div>
				<Footer siteName={siteName} />
				<EmptySpace height={20} />
			</Layout>
		);
	}
}

export default CancelledByHost;
