import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Payment.css';
import cx from 'classnames';

// Locale
import messages from '../../../locale/messages';

//image
import icon from '/public/SiteIcons/paymentTick.svg';
class HouseRules extends Component {
  static propTypes = {
    houseRules: PropTypes.array.isRequired,
    hostDisplayName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { hostDisplayName, houseRules } = this.props;

    return (
      <div className={cx('bgBlack')}>
        <h3 className={cx(s.h3, s.space4)}>
          <span>{hostDisplayName}'s <FormattedMessage {...messages.houseRules} /></span>
        </h3>
        {
          houseRules.map((item, index) => {
            if (item.listsettings.isEnable === "1") {
              return (
                <div className={cx(s.houseRules, 'bgBlack')} key={index}>
                  <span className={cx(s.tickWidth)}><img src={icon} /></span>
                  <span className={cx(s.itemWidth, 'reviewTextRTL')}>{item.listsettings && item.listsettings.itemName}</span>
                </div>
              )
            }
          })
        }
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(HouseRules));

