
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NoResults.css';
import cx from 'classnames';
// Locale
import messages from '../../../locale/messages';

//Image
import noImage from '/public/SiteImages/noResultImage.svg';

class NoResults extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <img src={noImage} className='noResultImg' />
        <div className={s.noHeading}>
          <FormattedMessage {...messages.noResultsTitle} />
        </div>
        <div className={cx(s.noSubHeading, 'textWhite')}>
          <FormattedMessage {...messages.noResultsSubTitle} />
        </div>
        <div className={cx(s.noSubHeading, 'textWhite')}>
          <FormattedMessage {...messages.noResultsTerms1} />
        </div>

      </div>
    );
  }
}

export default injectIntl(withStyles(s)(NoResults));