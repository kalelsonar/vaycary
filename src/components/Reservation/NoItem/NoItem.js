import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
} from 'react-bootstrap';
import s from './NoItem.css';
import bt from '../../../components/commonStyle.css';
import Link from '../../Link';
// Internal Helpers
import history from '../../../core/history';

// Locale
import messages from '../../../locale/messages';

//Image
import noListImage from '/public/SiteImages/noReservation.svg';
import noTripImage from '/public/SiteImages/noTripImg.svg';


class NoItem extends React.Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/s');
  }

  render() {
    const { userType, type, isTrip } = this.props;
    return (
      <div>
        <div className={s.textCenter}>
          <img src={isTrip ? noTripImage : noListImage} />
          <div className={cx(s.noListSubHeading, 'textWhite')}>
            {
              userType === 'host' && <div>
                {type == 'current' &&
                  <FormattedMessage {...messages.noUpcomingReservation} />

                }
                {type != 'current' &&
                  <FormattedMessage {...messages.noPreviousReservation} />
                }
              </div>
            }
            {
              userType === 'guest' && <div>
                {type == 'current' && <span><FormattedMessage {...messages.noUpcomingTrips} /></span>}
                {type != 'current' && <span><FormattedMessage {...messages.noPreviousTrips} /></span>}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(NoItem));