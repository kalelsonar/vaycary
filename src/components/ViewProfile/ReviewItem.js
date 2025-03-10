import React, { Component } from 'react'
import PropTypes from 'prop-types';
import moment from 'moment';
import {
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';
import { injectIntl, FormattedMessage } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Component
import ResponseItem from './ResponseItem';
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import StarRating from '../StarRating/StarRating';

class ReviewItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        picture: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        profileId: PropTypes.number,
        reviewContent: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        response: PropTypes.object,
        location: PropTypes.string,
        isAdmin: PropTypes.bool,
        siteName: PropTypes.string
    };

    static defaultProps = {};

    render() {
        const { firstName, lastName, profileId, picture, location, isAdmin, siteName } = this.props;
        const { reviewContent, createdAt, response, rating, listData, showUserName } = this.props;
        const { formatMessage } = this.props.intl;
        let date = moment(createdAt).format('DD/MM/YYYY');

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
            <div className={s.panelBody}>
                <div>
                    {
                        !isAdmin && <div className={cx(s.avatarWrapper, 'avatarWrapperAR')}>
                            <Avatar
                                source={picture}
                                height={68}
                                width={68}
                                title={firstName}
                                className={s.profileAvatar}
                                withLink
                                linkClassName={cx(s.profileAvatarLink, s.noBackground)}
                                profileId={profileId}
                            />
                            <div className={cx(s.textCenter, s.profileName)}>
                                <Link to={"/users/show/" + profileId}>{firstName}</Link>
                            </div>
                        </div>
                    }
                    {
                        isAdmin && <div className={cx(s.avatarWrapper, 'avatarWrapperAR')}>
                            <Avatar
                                source={'../../../adminAvatar.png'}
                                height={68}
                                width={68}
                                title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                                className={cx(s.profileAvatar, s.noBackground)}
                                staticImage
                            />
                            {/* <div className={cx(s.textCenter, s.profileName)}>
                                {formatMessage(messages.verifiedBy) + ' ' + siteName}
                            </div> */}
                        </div>
                    }
                </div>
                <div className={cx(s.messageContent, 'dashRightBg')}>
                    <div className={s.commentContainer}>

                        {
                            showUserName && <span className={cx(s.textBold, s.writtenReviewTitle)}>
                                <FormattedMessage {...messages.Youhadreviewsfor} />{' '}
                                <Link to={"/users/show/" + otherUserProfileId}>{otherUserName}</Link>:
                            </span>
                        }

                        {
                            isAdmin && <div className={s.guestName}>
                                {formatMessage(messages.verifiedBy) + ' ' + siteName}
                            </div>
                        }

                        {
                            !isAdmin && !showUserName &&
                            <div className={s.guestName}>
                                {listData &&
                                    <>
                                        {firstName}<span>{' '} <FormattedMessage {...messages.sreview} /></span>  <Link to={"/rooms/" + listData.id}>{listData.title}</Link>
                                    </>
                                }
                                {!listData &&
                                    <FormattedMessage {...messages.listingNotAvailable} />
                                }
                            </div>
                        }

                        <div className={s.reviewFlex}>
                            <StarRating />
                            <div>{rating}</div>
                            <div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL', 'dateReviewCssDarkMode')}>{date}</div>
                        </div>
                        <p className={cx(s.contentTop, s.contentBorder, { [s.noResponse]: !response })}>
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
                                date={date}
                            />
                        }
                    </div>
                </div>
            </div>

        );
    }
}

const mapState = state => ({
    siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ReviewItem)));