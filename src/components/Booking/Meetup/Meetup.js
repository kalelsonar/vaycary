import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
	Button,
	Grid,
	Row,
	Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// Component
import Avatar from '../../Avatar';

// Locale
import messages from '../../../locale/messages';

import bt from '../../../components/commonStyle.css';
import s from './Meetup.css';
class Meetup extends Component {
	static propTypes = {
		hostDisplayName: PropTypes.string.isRequired,
		hostPicture: PropTypes.string,
		guestDisplayName: PropTypes.string,
		guestPicture: PropTypes.string,
		nextPage: PropTypes.any.isRequired,
		emailVerified: PropTypes.bool.isRequired,
		formatMessage: PropTypes.any,
	};

	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const { nextPage, emailVerified, guestPicture } = this.props;
		if (guestPicture === null) {
			nextPage('avatar');
		} else if (!emailVerified) {
			nextPage('verification');
		} else {
			nextPage('payment');
		}
	}

	render() {
		const { hostDisplayName, hostPicture, guestDisplayName } = this.props;

		return (
			<Grid fluid className={s.container}>
				<Row>
					<Col xs={12} sm={12} md={12} lg={12}>
						<h2 className={cx(s.titleText, s.space5, 'textWhite')}>
							<FormattedMessage {...messages.meetupTitle} /> {hostDisplayName}
						</h2>
						<div>
							<div className={s.userAvatarSection}>
								<Avatar
									source={hostPicture}
									title={hostDisplayName}
									className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
								/>
							</div>
							<div className={cx(s.userAvatarSection, s.rightAvatar, 'rightAvatarRTL')}>
								<Avatar
									isUser
									title={guestDisplayName}
									className={cx(s.profileImage, s.mediaPhoto, s.mediaRound)}
								/>
							</div>
							<p className={cx(s.space2, s.spaceTop2, s.textLead)}>
								<FormattedMessage {...messages.meetupInfo1} />
							</p>
							<p className={cx(s.space3, s.textLead)}>
								<FormattedMessage {...messages.meetupInfo2} />
							</p>
							<Button className={cx(bt.btnPrimary, bt.btnLarge, s.btnWidth)} onClick={this.handleClick}>
								<FormattedMessage {...messages.next} />
							</Button>
						</div>
					</Col>
				</Row>
			</Grid>
		);
	}
}

export default injectIntl(withStyles(s, bt)(Meetup));