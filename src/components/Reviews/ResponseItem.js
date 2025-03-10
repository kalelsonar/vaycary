import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Panel, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';

// Component
import Avatar from '../Avatar';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import StarRating from '../StarRating/StarRating';

class ResponseItem extends React.Component {

    static propTypes = {
        data: PropTypes.shape({
            authorData: PropTypes.shape({
                picture: PropTypes.string,
                firstName: PropTypes.string,
                lastName: PropTypes.string,
                profileId: PropTypes.number,
            }),
        }),
        otherUserResponse: PropTypes.bool,
        formatMessage: PropTypes.any,
    };

    static defaultProps = {
        otherUserResponse: false,
    };

    render() {
        const { data: { authorData: { firstName, lastName, profileId, picture } } } = this.props;
        const { data: { reviewContent, rating }, otherUserResponse, date, showReviewName } = this.props;
        const { formatMessage } = this.props.intl;
        return (
            <div className={s.responseFlex}>
                <div className={cx(s.reviewBody, s.pullLeft, 'floatRight')}>
                    <Avatar
                        source={picture}
                        height={48}
                        width={48}
                        title={firstName}
                        className={s.profileAvatar}
                        withLink
                        linkClassName={cx(s.avatarDisplay, s.profileAvatarLink)}
                        profileId={profileId}
                    />
                </div>
                <div className={s.reviewBody}>
                    {/* <span className={cx(s.textBold, s.nameBold)}>{otherUserResponse ? firstName : formatMessage(messages.your)} <FormattedMessage {...messages.response} />:</span> */}
                    <span className={cx(s.textBold, s.nameBold)}>{otherUserResponse ? firstName : (showReviewName ? firstName : formatMessage(messages.your))} <FormattedMessage {...messages.response} />:</span>
                    {
                        reviewContent && <div className={s.reviewFlex}>
                            <div><StarRating /></div>
                            <div>{rating}</div>
                            <div className={cx(s.dateReviewCss, 'textWhite', 'dateReviewCssRTL', 'dateReviewCssDarkMode')}>{date}</div>
                        </div>
                    }
                    <p className={cx(s.wordbreak, s.writePanel)}>
                        {
                            reviewContent
                        }
                    </p>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(ResponseItem));