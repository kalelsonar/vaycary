/* Plugin. */
import React from "react";
import * as FontAwesome from 'react-icons/lib/fa';
import { FormattedMessage, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import { connect } from "react-redux";
import cx from 'classnames';

/* Component */
import WishListIcon from "../../../WishListIcon/WishListIcon";
import StarRating from "../../../StarRating/StarRating";
import CurrencyConverter from "../../../CurrencyConverter/CurrencyConverter";
import CommonListingPhotos from '../CommonListingPhotos/CommonListingPhotos'

/* Action and Helpers */
import messages from "../../../../locale/messages";
import { formatURL } from "../../../../helpers/formatURL";

/* Style. */
import s from './CommonListingItems.css';

class CommonListingItems extends React.Component {

    static propTypes = {
        id: PropTypes.number,
        photo: PropTypes.string.isRequired,
        beds: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        basePrice: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
        bookingType: PropTypes.string.isRequired,
        listPhotos: PropTypes.array.isRequired,
        coverPhoto: PropTypes.number,
        reviewsCount: PropTypes.number,
        reviewsStarRating: PropTypes.number,
        wishListStatus: PropTypes.bool
    };

    render() {
        const { key, id, wishListStatus, basePrice, currency, bookingType, isViewListing, title } = this.props;
        const { account, reviewsCount, userId, reviewsStarRating, roomType, beds, coverPhoto, listPhotos, isListingSwiper } = this.props;
        let currentUser = account?.userId;

        let starRatingValue = 0;
        (reviewsCount > 0 && reviewsStarRating > 0) ? starRatingValue = Math.round(reviewsStarRating / reviewsCount) : starRatingValue = 0;

        let isWhisListIcon = false;
        if (userId == currentUser) isWhisListIcon = true;

        return (
            <div>
                <div className={cx(s.imgContainer)}>
                    {
                        !isWhisListIcon && <WishListIcon listId={id} key={key} isChecked={wishListStatus} isViewListing={isViewListing} />
                    }
                    <div className={cx(s.parent, 'listingDarkModeBg')}>
                        <div className={cx(s.children)}>
                            <div className={cx(s.content)}>
                                    <CommonListingPhotos
                                        id={id}
                                        title={title}
                                        className={cx(s.imageContent)}
                                        coverPhoto={coverPhoto}
                                        listPhotos={listPhotos}
                                        photoType={"x_medium"}
                                        bgImage
                                        lazyLoad
                                        placeholderClassName={cx(s.imageContent)}
                                        isListingSwiper={isListingSwiper}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.infoContainer}>
                    <a className={s.linkContainer} href={"/rooms/" + formatURL(title) + '-' + id} target={'_blank'}>
                        <div className='homeSliderRtl'>
                            <div className={cx(s.textStrong, s.spaceTop2, s.textEllipsis, 'listingInfoRTL', s.pricingText, s.infoSpace, 'textWhite')}>
                                <div>
                                    <CurrencyConverter
                                        amount={basePrice}
                                        from={currency}
                                    />
                                    {' '} <span className={s.nightText}>/ <FormattedMessage {...messages.perNight} /></span>
                                    {
                                        bookingType === "instant" && <span><FontAwesome.FaBolt className={s.instantIcon} /></span>
                                    }
                                </div>
                                {starRatingValue > 0 && <div className={cx(s.textEllipsis, s.infoReview, s.infoText, 'small-star-rating', 'textWhite')}>
                                    <StarRating className={cx(s.reviewStar, 'floatRight')} value={starRatingValue} name={'review'} />
                                    <span className={cx(s.reviewText, 'reviewTextRTL')}>
                                        {starRatingValue}
                                    </span>
                                </div>}
                            </div>
                            <div className={cx(s.textEllipsis, s.infoTitle, 'listingInfoRTL', 'textWhite')}>
                                <span className={'textReversing'}>{title}</span>
                            </div>
                            <div className={cx(s.textEllipsis, s.infoDesc, 'textWhite')}>
                                <span className='roomTypeRtl'>{roomType}</span>
                                {beds > 0 && <span><span>&nbsp;/&nbsp;</span>{beds} {beds > 1 ? <FormattedMessage {...messages.beds} /> : <FormattedMessage {...messages.bed} />}</span>}
                            </div>
                        </div>
                    </a>
                </div>
            </div >
        )
    }
};

const mapState = (state) => ({
    account: state.account.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CommonListingItems)));