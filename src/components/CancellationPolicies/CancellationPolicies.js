import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';
import {
  Panel
} from 'react-bootstrap';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

// Component
import Policy from './Policy';
import Link from '../Link';

// Locale
import messages from '../../locale/messages';

class CancellationPolicy extends React.Component {

  static propTypes = {
    policyType: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  render() {
    const { policyType, siteName, cancellationInfo, data } = this.props;
    let policy = policyType;
    if (policyType != 'Flexible' && policyType != 'Moderate' && policyType != 'Strict') {
      policy = 'Flexible'
    }

    return (
      <div className={s.landingContainer}>
        <h1 className={cx(s.landingTitle)}><FormattedMessage {...messages.cancellationPolicies} /></h1>
        <p className={cx(s.textGray, 'textWhite')}>
          {cancellationInfo}
        </p>
        <div className={cx("transactionPanel", s.panelHeader, 'bgBlackTwo')}
        >
            <ul className={cx('list-inline', s.noMargin, 'cancellPanelRTL', s.borderBottomTab)}>
              {
                data && data.map(function (value, key) {
                  return (
                    <li className={cx((policyType === value.policyName ? s.active : ''))}>
                      <Link to={"/cancellation-policies/" + encodeURIComponent(value.policyName)} className={cx(s.tabItem, 'textWhite')}>
                        {value.policyName}
                      </Link>
                    </li>
                  )
                })
              }
            </ul>
          {
            data && data.map(function (value, key) {
              if (policyType === value.policyName) {
                return (
                  <Policy siteName={siteName} data={value} />
                )
              }
            })
          }
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName,
  cancellationInfo: state.siteSettings.data.cancellationInfo,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CancellationPolicy)));
