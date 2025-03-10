import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// Component 
import Link from '../../Link';

import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';

import bt from '../../../components/commonStyle.css';
import s from './SideMenu.css';
class SideMenu extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  handleClick() {
    history.push('/become-a-host');
  }

  componentDidMount() {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (history.location) {
      this.setState({
        location: history.location.pathname
      });
    }
  }


  render() {
    const { location } = this.state;
    return (
      <div>
        <ul className={cx('sideMenuBorder', 'listLayoutArbic')}>
          <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/rooms" })}>
            <Link to={'/rooms'} className={cx('sideNavitem', 'sideNav')}>
              <FormattedMessage {...messages.yourListings} />
            </Link>
          </li>
          <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/reservation/current" })}
            onClick={() => this.setState({ location: history.location.pathname })}
          >
            <Link to={'/reservation/current'} className={cx('sideNavitem', 'sideNav')}>
              <FormattedMessage {...messages.upcomingReservations} />
            </Link>
          </li>
          <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/reservation/previous" })}
            onClick={() => this.setState({ location: history.location.pathname })}
          >
            <Link to={'/reservation/previous'} className={cx('sideNavitem', 'sideNav')}>
              <FormattedMessage {...messages.previousReservations} />
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default injectIntl(withStyles(s, bt)(SideMenu));