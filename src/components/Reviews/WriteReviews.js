import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Button from 'react-bootstrap/lib/Button';

import Link from '../Link';
import Loader from '../Loader';
import Avatar from '../Avatar';

import messages from '../../locale/messages';

import writeIcon from '/public/SiteIcons/writeIcon.svg';
import reviewIcon from '/public/SiteIcons/viewIcon.svg';
import noListImage from '/public/SiteImages/noReviewImage.svg';

import s from './Reviews.css';
import bt from '../../components/commonStyle.css';

class WriteReviews extends React.Component {

	static propTypes = {
		pendingData: PropTypes.shape({
			loading: PropTypes.bool,
			pendingReviews: PropTypes.arrayOf(PropTypes.shape({
				id: PropTypes.number,
				listId: PropTypes.number,
				hostId: PropTypes.string,
				guestId: PropTypes.string,
				hostData: PropTypes.shape({
					firstName: PropTypes.string,
					lastName: PropTypes.string,
					picture: PropTypes.string,
					profileId: PropTypes.number,
				}),
				guestData: PropTypes.shape({
					firstName: PropTypes.string,
					lastName: PropTypes.string,
					picture: PropTypes.string,
					profileId: PropTypes.number,
				}),
			}))
		}),
		userId: PropTypes.string,
		formatMessage: PropTypes.any,
	};

	render() {
		const { data: { loading, pendingReviews }, userId, loadMoreListing, isListLoading } = this.props;
		const { formatMessage } = this.props.intl;

		let showLoadMore = pendingReviews?.count === pendingReviews?.reservationData.length ? false : true;

		return (
			<>
				{
					loading && <Loader type={"text"} />
				}
				{
					!loading && (!pendingReviews || pendingReviews.count === 0) &&
					<div className={cx(s.textCenter, s.marginTop)}>
						<img src={noListImage} ClassName={s.mobWidth} />
						<div className={s.noListHeading}>
							<FormattedMessage {...messages.noReviewHeading} />
						</div>
						<div className={cx(s.noListSubHeading, 'textWhite')}>
							<FormattedMessage {...messages.noReviewSubHeding} />
						</div>
					</div>
				}
				{
					!loading && pendingReviews?.reservationData?.length > 0 &&
					<div className={cx(s.panelNolist, s.spaceTop6, 'bgBlack')}>
						{
							pendingReviews?.reservationData.map((item, index) => {
								let isHost = userId === item.hostId;
								if (item.guestData && item.hostData) {
									return (
										<ul className={cx(s.mediaDisplay, 'listLayoutArbic')}>
											<li>
												<div className={cx(s.listAvatarGrid, s.writePanel)}>
													<div className={cx(s.mediaContainer, s.textCenter, s.pullLeft, 'reviewsId')} >
														<Avatar
															source={isHost ? item.guestData.picture : item.hostData.picture}
															height={48}
															width={48}
															title={isHost ? item.guestData.firstName : item.hostData.firstName}
															className={s.profileAvatar}
															withLink
															linkClassName={cx(s.profileAvatarLink, s.noBackground)}
															profileId={isHost ? item.guestData.profileId : item.hostData.profileId}
														/>

													</div>
													<div className={cx(s.listDeatilsGrid, s.textAlignCenter, 'reviewDeatilsGridRTL', 'bgBlackTwo', 'dashRightBg')}>
														{item.listData ? <p className={s.writeReviewText}><FormattedMessage {...messages.submitReviewFor} /> <Link to={"/rooms/" + item.listId}>
															{item?.listTitle ? item?.listTitle : item?.listData?.title}
														</Link> </p> : <p className={s.writeReviewText}><FormattedMessage {...messages.listingNotAvailable} /></p>}
														<span className={s.writeReviewIcon}>
															<Link to={"/review/write/" + item.id}>
																<img src={writeIcon} className={cx(s.writeIconCss, 'writeIconRTL')} />
																<FormattedMessage {...messages.writeReview} />
															</Link>
															<Link to={"/users/trips/itinerary/" + item.id}>
																<img src={reviewIcon} className={cx(s.reviewIcon, 'reviewIconRTL')} />
																<FormattedMessage {...messages.viewLitneray} />
															</Link>
														</span>
													</div>
												</div>
											</li>
										</ul>
									);
								}
							})
						}
					</div>
				}
				{!loading && showLoadMore && <div className={cx(s.space2, s.textCenter, s.marginTop)}>
					<Button className={cx(s.btn, bt.btnPrimary, s.loadMoreBtn)} onClick={() => loadMoreListing()} disabled={isListLoading}>
						<FormattedMessage {...messages.loadMore} />...
					</Button>
				</div>}
			</>
		);
	}
}

const mapState = (state) => ({
	userId: state.account && state.account.data && state.account.data.userId,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(WriteReviews)));