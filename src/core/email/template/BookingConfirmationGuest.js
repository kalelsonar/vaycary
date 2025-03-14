import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table, TBody, TR, TD } from 'oy-vey';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import EmailSignature from './EmailSignature';
import { url } from '../../../config';
import { PRIMARYCOLOR } from '../../../constants';

class BookingConfirmationGuest extends Component {
	static propTypes = {
		content: PropTypes.shape({
			hostName: PropTypes.string.isRequired,
			guestName: PropTypes.string.isRequired,
			listTitle: PropTypes.string.isRequired,
			listCity: PropTypes.string.isRequired,
			threadId: PropTypes.number.isRequired,
		}).isRequired
	};

	render() {
		const textStyle = {
			color: '#282828',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px',
		};

		const linkText = {
			color: PRIMARYCOLOR,
			fontSize: '16px',
			textDecoration: 'none',
			cursor: 'pointer',
		}


		const { content: { guestName, hostName, listTitle, listCity, threadId, logo, siteName } } = this.props;
		let contactURL = url + '/message/' + threadId + '/guest';

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
										Pack your bags - you are going to {listCity}
									</div>
									<EmptySpace height={20} />
									<div>
										{hostName} has confirmed your request at {listTitle}. Please review details of your trip and
										{' '}<a style={linkText} href={contactURL}>contact host</a>{' '} to coordinate check-in time and key exchange.
									</div>
									<EmptySpace height={20} />
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

export default BookingConfirmationGuest;
