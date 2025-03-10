import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

//Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SideMenuTrips.css';
import cx from 'classnames';

import {
  Col
} from 'react-bootstrap';

// Locale
import messages from '../../../locale/messages';

// Component
import Link from '../../Link';
import history from '../../../core/history';

class SideMenuTrips extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      location: ''
    }
  }

  handleClick() {
    history.push('/become-a-host');
  }

  handleSelect = async () => {
    const { handleClick } = this.props;
    await handleClick()
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
    const { menuItemOne, menuItemTwo, linkOne, linkTwo } = this.props;
    return (
      <div>
        <ul className={cx('sideMenuBorder', 'listLayoutArbic')}>
          <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === linkOne })} onClick={() => this.handleSelect()}>
            <Link to={linkOne} className={cx('sideNavitem', 'sideNav')}>
              {menuItemOne}
            </Link>
          </li>
          <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === linkTwo })} onClick={() => this.handleSelect()}>
            <Link to={linkTwo} className={cx('sideNavitem', 'sideNav')}>
              {menuItemTwo}
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withStyles(s)(SideMenuTrips);