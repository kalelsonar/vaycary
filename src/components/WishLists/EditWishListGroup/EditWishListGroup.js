// Plugin.
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

// Components.
import Loader from '../../../components/Loader';
import Link from '../../Link';
import WishListGroupModal from '../WishListGroupModal';
import DeleteWishlistModal from '../WishListGroupModal/DeleteWishlistModal';
import NotFound from '../../../routes/notFound/NotFound';
import CommonListingItems from '../../Common/ImageUploadComponent/CommonListingItems/CommonListingItems';

// Actions and Helpers.
import { openAddWishListGroupModal, openDeleteWishlistModal } from '../../../actions/WishList/modalActions';
import messages from '../../../locale/messages';
import getWishListGroupQuery from './getWishListGroup.graphql';

import goIcon from '/public/SiteIcons/goWishIcon.svg';
import deleteIcon from '/public/SiteIcons/deleteWishIcon.svg';
import editIcon from '/public/SiteIcons/editingWishIcon.svg';

// Style
import s from './EditWishListGroup.css';
import bt from '../../../components/commonStyle.css';

class EditWishListComponent extends React.Component {
	static propTypes = {
		data: PropTypes.shape({
			loading: PropTypes.bool,
			getWishListGroup: PropTypes.any
		}),
	};

	static defaultProps = {
		data: { loading: true }
	}

	handleClick = () => {
		history.push('/siteadmin/popularlocation/add')
	}

	render() {
		const { data: { loading, getWishListGroup } } = this.props;
		const { formatMessage } = this.props.intl;
		const { openAddWishListGroupModal, openDeleteWishlistModal } = this.props;

		let initialValues = {};

		if (getWishListGroup?.id) {
			initialValues = {
				id: getWishListGroup?.id,
				name: getWishListGroup?.name,
				isPublic: getWishListGroup?.isPublic,
				userId: getWishListGroup?.userId
			};
		}

		if (getWishListGroup === null) return <NotFound />

		return (
			<>
				<WishListGroupModal actionType={'edit'} />
				<DeleteWishlistModal wishlistGroupId={getWishListGroup?.id} />
				<Grid fluid>
					<Row>
						<Col xs={12} sm={12} md={12} lg={12}>
							{
								loading && <>
									<Loader type="text" />
								</>
							}
							{
								!loading && getWishListGroup && <div className={cx(s.landingContent, s.noPadding)}>
									<div className={s.wishFlex}>
										<>
											<Link to={"/wishlists"} className={cx(s.button, s.resposiveBtn, s.innerPadding, s.goToALLText)}>
												<img src={goIcon} className={cx(s.goToALLArrowIcon, s.iconCss, 'iconRotateRTL')} />{formatMessage(messages.goToAllLists)}
											</Link>
										</>

										<div className={cx(s.noPadding, s.textRight, s.btnFlex, 'footerBtnFlexRTL')}>
											<div className={cx(s.displayInlineBlock, 'shareIconRtl')}>
												<Button className={cx(s.button, s.noMargin, s.resposiveBtn, s.pullRghtNone)}
													onClick={() => openAddWishListGroupModal(initialValues, 'EditWishListGroupForm')}>
													<img src={editIcon} className={cx(s.iconCss, 'iconCssRTL')} /> <span className={s.textDecoration}><FormattedMessage {...messages.editLabel} /></span>
												</Button>
											</div>
											<div className={cx(s.displayInlineBlock, 'shareIconRtl')}>
												<Button className={cx(s.button, s.modalCaptionLink, s.noMargin, bt.btnLarge, s.resposiveBtn, s.responsiveDeleteBtn, s.deleteBtnMargin)}
													onClick={() => openDeleteWishlistModal()}>
													<img src={deleteIcon} className={cx(s.iconCss, 'iconCssRTL')} /> <span className={s.textDecoration}><FormattedMessage {...messages.delete} /></span>
												</Button>
											</div>
										</div>
									</div>
									<h2 className={cx(s.landingTitle, s.innerPadding)}>
										{getWishListGroup?.name}
									</h2>
									{
										!loading && getWishListGroup && <>

											{
												getWishListGroup?.wishLists && getWishListGroup?.wishLists?.length > 0 && getWishListGroup?.wishListCount > 0 && <>
													{
														getWishListGroup?.wishLists?.map((item, index) => {
															if (item?.listData != null) {
																return (
																	<div key={index} className={s.listingSection}>
																		<CommonListingItems
																			id={item?.listData?.id}
																			title={item?.listData?.title}
																			basePrice={item?.listData?.listingData?.basePrice}
																			roomType={item?.listData?.settingsData[0]?.listsettings?.itemName}
																			coverPhoto={item?.listData?.coverPhoto}
																			listPhotos={item?.listData?.listPhotos}
																			wishListStatus={item?.listData?.wishListStatus}
																			currency={item.listData.listingData.currency}
																			bookingType={item.listData.bookingType}
																			reviewsCount={item.listData.reviewsCount}
																			reviewsStarRating={item.listData.reviewsStarRating}
																			beds={item.listData.beds}
																			userId={item.listData.userId}
																			isListingSwiper
																		/>
																	</div>
																)
															}
														})
													}
												</>
											}
											{
												getWishListGroup && getWishListGroup.wishListCount == 0 && <div>
													<h3 className={cx(s.innerPadding, s.errorCss)}>{formatMessage(messages.noWishlistsHomes)}</h3>
													<Link to={'/s'} className={bt.btnPrimary}>{formatMessage(messages.startExplore)}</Link>
												</div>

											}
										</>
									}
								</div>
							}
						</Col>
					</Row>
				</Grid>
			</>
		)
	}
}

const mapState = (state) => ({
	account: state.account.data
});

const mapDispatch = {
	openAddWishListGroupModal,
	openDeleteWishlistModal
};

export default compose(
	injectIntl,
	withStyles(s, bt),
	connect(mapState, mapDispatch),
	graphql(getWishListGroupQuery,
		{
			options: (props) => ({
				variables: {
					profileId: props.profileId,
					id: props.wishListId
				},
				fetchPolicy: 'network-only',
			})
		}
	)
)(EditWishListComponent);
