import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

//Image
import history from '../../core/history';
import moreVerifyIcon from '/public/SiteIcons/15.svg';
class NoItem extends Component {

    static propTypes = {
        isLoggedInUser: PropTypes.bool.isRequired,
        formatMessage: PropTypes.any,
    };

    render() {
        const { isLoggedInUser, hideMoreVerification } = this.props;
        return (
            <>
                <p className={s.space2}>
                    <FormattedMessage {...messages.noVerifications} />
                </p>
                {
                    history.location.pathname != '/user/verification' && isLoggedInUser && !hideMoreVerification && <p className={s.noMargin}>
                        <Link to={"/user/verification"} className={cx(s.moreVerifi)}>
                            <FormattedMessage {...messages.addVerifications} />
                            <img src={moreVerifyIcon} className={cx(s.moreVerifiArrow, 'rightArrowItineraryRTL')} />
                        </Link>
                    </p>
                }
            </>
        );
    }
}

export default injectIntl(withStyles(s)(NoItem));