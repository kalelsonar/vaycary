import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './Transaction.css';

// Locale
import messages from '../../locale/messages';

//Image
import image from '/public/SiteImages/noTransactionImage.svg';
class NoTransaction extends Component {
    static propTypes = {
        formatMessage: PropTypes.any,
    };

    render() {
        const { noText } = this.props;
        return (
            <>
                <div className={s.center}>
                    <img src={image} className={s.widthMobile} />
                    <div className={cx(s.noRecordText, s.noListHeading)}><FormattedMessage {...messages.noTransactionText} /></div>
                    <div className={cx(s.noListSubHeading, 'textWhite')}>{noText}</div>
                </div>

            </>
        );
    }
}

export default injectIntl(NoTransaction);