import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import moment from 'moment';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewProfile.css';

// Component
import Avatar from '../Avatar';
import StarRating from '../StarRating/StarRating';

// Locale
import messages from '../../locale/messages';

class ResponseItem extends React.Component {

    static propTypes = {
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            authorData: PropTypes.shape({
                picture: PropTypes.string,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                profileId: PropTypes.number.isRequired,
            }),
        }),
    };

    render() {
        const { data: { authorData: { firstName, profileId, picture } } } = this.props;
        const { data: { reviewContent, rating, createdAt } } = this.props;
        let date = moment(createdAt).format('MM/DD/YYYY');

        return (
            <div>
                <div className={cx(s.reviewBody, s.pullLeft, 'floatRight')}>
                    <Avatar
                        source={picture}
                        height={34}
                        width={34}
                        title={firstName}
                        className={s.profileAvatar}
                        withLink
                        linkClassName={cx(s.avatarDisplay, s.profileAvatarLink)}
                        profileId={profileId}
                    />
                </div>
                <div className={s.reviewBody}>
                    <div className={s.responseTitle}><FormattedMessage {...messages.responseFrom} /></div>
                    {
                        reviewContent && <div className={s.reviewFlex}>
                            <div><StarRating /></div>
                            <div>{rating}</div>
                        </div>
                    }
                    <div className={cx(s.responseDate, 'textWhite')}>{date}</div>
                    <p className={s.wordbreak}>
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