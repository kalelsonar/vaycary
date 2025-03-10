import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';

import { graphql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';

import {
	Label
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Inbox.css';

// Component
import Avatar from '../../Avatar';
import Link from '../../Link';

// Redux Action
import { readMessage } from '../../../actions/message/readMessage';

// Locale
import messages from '../../../locale/messages';

// Graphql 
import GetAllThreadQuery from '../AllThreadsQuery.graphql';
class InboxItem extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		type: PropTypes.string.isRequired,
		status: PropTypes.string.isRequired,
		threadId: PropTypes.number.isRequired,
		profileId: PropTypes.number.isRequired,
		picture: PropTypes.string,
		displayName: PropTypes.string.isRequired,
		content: PropTypes.string.isRequired,
		createdAt: PropTypes.string.isRequired,
		startDate: PropTypes.string,
		endDate: PropTypes.string,
		sentBy: PropTypes.string.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		country: PropTypes.string.isRequired,
		read: PropTypes.bool.isRequired,
		account: PropTypes.shape({
			userId: PropTypes.string.isRequired
		}),
		readMessage: PropTypes.any.isRequired
	};

	static defaultProps = {
		createdAt: null,
		startDate: null,
		endDate: null,
		picture: null,
		status: null,
		sentBy: null,
		read: false
	}

	label(status, noStyle) {
		let style, label;
		switch (status) {
			case 'inquiry':
				label = <FormattedMessage {...messages.messageStatus1} />
				style = 'info';
				break;
			case 'preApproved':
				label = <FormattedMessage {...messages.messageStatus2} />
				style = 'primary';
				break;
			case 'declined':
				label = <FormattedMessage {...messages.messageStatus3} />
				style = 'danger';
				break;
			case 'approved':
				label = <FormattedMessage {...messages.messageStatus4} />
				style = 'success';
				break;
			case 'pending':
				label = <FormattedMessage {...messages.messageStatus5} />
				style = 'warning';
				break;
			case 'cancelledByHost':
				label = <FormattedMessage {...messages.messageStatus6} />
				style = 'danger';
				break;
			case 'cancelledByGuest':
				label = <FormattedMessage {...messages.messageStatus7} />
				style = 'danger';
				break;
			case 'intantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'instantBooking':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'confirmed':
				label = <FormattedMessage {...messages.messageStatus8} />
				style = 'success';
				break;
			case 'expired':
				label = <FormattedMessage {...messages.messageStatus9} />
				style = 'danger';
				break;
			case 'requestToBook':
				label = <FormattedMessage {...messages.messageStatus10} />
				style = 'primary';
				break;
			case 'completed':
				label = <FormattedMessage {...messages.inboxCompleted} />
				style = 'success';
				break;
		}
		if (noStyle) {
			return label;
		}
		return <Label bsStyle={style}>{label}</Label>
	}

	render() {
		const { type, threadId, profileId, picture, displayName, content, createdAt, startDate, endDate } = this.props;
		const { city, state, country, status, sentBy, read } = this.props;
		const { formatMessage } = this.props.intl;
		const { account: { userId } } = this.props;
		const { readMessage } = this.props;
		let createdDate = createdAt != null ? moment(createdAt).format('MM/DD/YYYY') : '';
		let start = startDate != null ? '(' + moment(startDate).format('MM/DD/YYYY') : '';
		let end = endDate != null ? ' - ' + moment(endDate).format('MM/DD/YYYY') + ')' : '';
		let isRead;
		if (userId !== sentBy && read === false) {
			isRead = s.threadSubjectUnread;
		}

		return (
			<div className={s.listAvatarFlex}>
				<div className={cx(s.threadAvatar, 'inboxAvatar')}>
					<Avatar
						source={picture}
						height={75}
						width={75}
						title={displayName}
						className={s.profileAvatar}
						withLink
						linkClassName={s.profileAvatarLink}
						profileId={profileId}
					/>
				</div>
				<div className={cx(s.listDeatilsGrid, 'dashRightBg')}>
					<div className={s.nameWidth}>
						<Link to={"/users/show/" + profileId} className={cx(s.listTitle, 'textWhite')}>
							{displayName}
						</Link>
						<p className={cx(s.cityText, s.noMargin, 'textWhite')}>{createdDate}</p>
					</div>
					<div className={s.titleWidth}>
						<Link
							to={"/message/" + threadId + "/" + type}
							className={cx(s.listTitle, s.greenColor)}
							onClick={() => readMessage(threadId, type)}
						>
							<div>
								<span className={cx({ [s.threadSubjectUnread]: userId !== sentBy && read === false, 'threadSubjectUnreadRTL': userId !== sentBy && read === false }, 'textWhite', s.statusText)}>{content != null ? content : this.label(status, true)}</span>
								<p className={cx(s.cityText, s.linkDecoration, s.spaceTop10, 'textWhite')}>{city}, {state}, {country}</p>
								<p className={cx(s.cityText, s.noMargin, s.linkDecoration, 'textWhite')}>{start} {end}</p>
							</div>
						</Link>

					</div>
					<div className={cx('messageStatus', s.nameWidth)}>
						{this.label(status)}
					</div>
				</div>
			</div>
		);
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	readMessage
};


export default compose(
	injectIntl,
	withStyles(s),
	connect(mapState, mapDispatch),
	graphql(GetAllThreadQuery, {
		name: 'GetAllThreads',
		options: {
			ssr: false,
			pollInterval: 5000,
			fetchPolicy: 'network-only',
		}
	})
)(InboxItem);