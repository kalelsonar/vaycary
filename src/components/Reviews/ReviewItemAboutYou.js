import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import { Panel, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

// Redux
import { connect } from 'react-redux';

// Component
import ResponseItem from './ResponseItem';
import Avatar from '../Avatar/Avatar';
import Link from '../Link/Link';

// Locale
import messages from '../../locale/messages';
import StarRating from '../StarRating/StarRating';

class ReviewItemAboutYou extends React.Component {

	static propTypes = {
		formatMessage: PropTypes.any,
		picture: PropTypes.string,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		profileId: PropTypes.number,
		reviewContent: PropTypes.string,
		createdAt: PropTypes.string,
		response: PropTypes.object,
		otherUserResponse: PropTypes.bool,
		showUserName: PropTypes.bool,
		otherUserName: PropTypes.string,
		otherUserProfileId: PropTypes.number,
		isAdmin: PropTypes.bool,
		siteName: PropTypes.string
	};

	static defaultProps = {
		response: null,
		showUserName: false
	};

	render() {
		const { firstName, lastName, profileId, picture, otherUserName, otherUserProfileId, isAdmin, listData, listTitle } = this.props;
		const { reviewContent, createdAt, response, otherUserResponse, showUserName, siteName, rating, showReviewName } = this.props;
		let date = moment(createdAt).format('MM/DD/YYYY');
		const { formatMessage } = this.props.intl;

		let isGuestImage = response && response.authorData && response.authorData.picture;
		let isGuestProfileId = response && response.authorData && response.authorData.profileId;
		let showAvatar = showUserName == false ? picture : isGuestImage;
		// let isProfileId = showUserName == false ? profileId : isGuestProfileId;
		let isProfileId;
		if (!showUserName) {
			isProfileId = profileId
		} else {
			isProfileId = isGuestProfileId
		}

		return (
			<li>
				<div className={s.listAvatarGrid}>
					<div>
						{
							!isAdmin && <div className={cx(s.pullRight, s.mediaContainer, s.textCenter, 'reviewsId')} >
								<Avatar
									source={picture}
									height={48}
									width={48}
									title={firstName}
									className={s.profileAvatar}
									withLink
									linkClassName={cx(s.profileAvatarLink, s.noBackground)}
									profileId={profileId}
								/>
								{/* {
									showUserName && <div className={s.name}>
										<FormattedMessage {...messages.youLabel} />
									</div>
								} */}
							</div>
						}
						{
							isAdmin && <div className={cx(s.pullRight, s.mediaContainer, s.textCenter, 'reviewsId')} >
								<Avatar
									source={'../../../adminAvatar.png'}
									height={48}
									width={48}
									title={formatMessage(messages.verifiedBy) + ' ' + siteName}
									className={cx(s.profileAvatar, s.noBackground)}
									staticImage
								/>
								{/* <div className={s.name}>
									{formatMessage(messages.verifiedBy) + ' ' + siteName}
								</div> */}
							</div>
						}
					</div>
					<div className={cx(s.listDeatilsGrid, 'reviewDeatilsGridRTL', 'bgBlackTwo', 'dashRightBg')}>
						<div className={s.reviewBody}>
							{
								showUserName && <span className={s.textBold}>
									{listData &&
										<>
											<FormattedMessage {...messages.Youhadreviewsfor} />{' '}
											<Link to={"/rooms/" + listData.id}>{listTitle || listData.title}</Link>
										</>
									}
									{!listData &&
										<FormattedMessage {...messages.listingNotAvailable} />
									}
								</span>
							}

							{
								isAdmin && <div className={s.nameBold}>
									{formatMessage(messages.verifiedBy) + ' ' + siteName}
								</div>
							}

							{
								!isAdmin && !showUserName &&
								<div className={s.nameBold}>

									{listData &&
										<>
											<Link to={"/users/show/" + profileId}>{firstName}</Link><span>'{' '}<FormattedMessage {...messages.sreview} />{' '}</span>
											<Link to={"/rooms/" + listData.id}>{listTitle || listData.title}</Link>
										</>
									}
									{!listData &&
										<FormattedMessage {...messages.listingNotAvailable} />
									}
								</div>
							}
							{
								reviewContent && <div className={s.reviewFlex}>
									<div><StarRating /></div>
									<div>{rating}</div>
									<div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL', 'dateReviewCssDarkMode')}>{date}</div>
								</div>
							}
							<p className={cx(s.contentTop, { [s.noResponse]: !response })}>
								{
									reviewContent && (reviewContent.trim()).split("\n").map(function (content, index) {
										return (
											<span key={index}>
												{content}
												<br />
											</span>
										)
									})
								}
							</p>
							{
								response && <ResponseItem
									data={response}
									otherUserResponse={otherUserResponse}
									date={date}
									showReviewName={showReviewName}
								/>
							}

						</div>
					</div>
				</div>
			</li>
		);
	}
}

const mapState = state => ({
	siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItemAboutYou)));