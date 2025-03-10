import React from 'react';
import PropTypes from 'prop-types';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Col,
  Panel
} from 'react-bootstrap';
import bt from '../../../components/commonStyle.css';
import s from './NoItem.css';

import Link from '../../Link';

// Internal Helpers
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';
import noListImage from '/public/SiteImages/noListImage.svg';

class NoItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/become-a-host');
  }

  render() {

    return (
      <Panel className={cx(s.panelEmpty, 'managelisitinempty', 'bgBlackTwo')}>
        <Col xs={12} sm={8} md={12} lg={12} className={cx(s.space4, s.panelSpace)}>
          <div className={s.textCenter}>
            <img src={noListImage} />
            <div className={s.noListHeading}>
              <FormattedMessage {...messages.noListHeading} />
            </div>
            <div className={s.noListSubHeading}>
              <FormattedMessage {...messages.noListSmall} />
            </div>
            <Link to={'/become-a-host?mode=new'} className={cx(bt.btnPrimary, s.addNewBtn)}>
              <FormattedMessage {...messages.addNewlisting} />
            </Link>
          </div>
        </Col>
      </Panel>
    );
  }
}

export default injectIntl(withStyles(s, bt)(NoItem));

