import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row,
  Col,
  Tooltip
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CancellationPolicies.css';

// Locale
import messages from '../../locale/messages';

class Policy extends React.Component {

  static propTypes = {
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { siteName, data } = this.props;
    let splitLine = data && data.subContent && data.subContent.split('\n');
    let newSplitLine = splitLine && splitLine.filter(function (el) { return el; });

    return (
      <div>
        <div className={cx(s.textCss, s.lineBreak, s.topPadding, 'textWhite')}>
          {data.subTitle}
        </div>
        <div className={cx(s.boxOne, 'bgBlack')}>
          <h3 className={s.commonHeading}><FormattedMessage {...messages.before} /> {data.priorDays} <FormattedMessage {...messages.howManyday} />:</h3>
          <div className={cx(s.textCss, 'textWhite')}>
            {data.content1}
          </div>
        </div>
        <div className={cx(s.boxTwo, 'bgBlack')}>
          <h3 className={s.commonHeading}><FormattedMessage {...messages.checkIn} />:</h3>
          <div className={cx(s.textCss, s.lineBreak, 'textWhite')}>
            {data.content2}
          </div>
        </div>
        <div className={cx(s.boxThree, 'bgBlack')}>
          <h3 className={s.commonHeading}><FormattedMessage {...messages.checkOut} />:</h3>
          <div className={cx(s.textCss, s.lineBreak, 'textWhite')}>
            {data.content3}
          </div>
        </div>
        <div className={s.lineBorder} />
        <div className={cx(s.boxFour, 'bgBlack')}>
          <h3 className={s.commonHeading}><FormattedMessage {...messages.descriptionAdminLabel} />:</h3>
          <ul className={cx(s.subText, 'descriptionPolicyRTL')}>
            {
              newSplitLine && newSplitLine.length > 0 && newSplitLine.map((itemValue, indexes) => {
                return (
                  <li className={cx(s.bulletPoint, 'bulletPointRTL', 'textWhite', 'locationCssDarkMode')}>
                    <p className={cx(s.marginBottom24, s.dot)} dangerouslySetInnerHTML={{ __html: itemValue }} />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
export default injectIntl(withStyles(s)(Policy));
