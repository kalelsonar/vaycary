// General
import React from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import * as FontAwesome from 'react-icons/lib/fa'
import cx from 'classnames';
import {
  Navbar
} from 'react-bootstrap';

// Internal Components
import AdminNavigation from '../siteadmin/AdminNavigation';
import Logo from '../Logo';

// External Components
import Toaster from '../Toaster';
import LoadingBar from 'react-redux-loading-bar';

class AdminHeader extends React.Component {
  static propTypes = {
    borderLess: PropTypes.bool
  };

  static defaultProps = {
    borderLess: false
  }

  render() {
    const { siteSettings, borderLess } = this.props;
    let borderClass;
    if (borderLess) {
      borderClass = s.commonHeaderBorderLess;
    }
    return (
      <div className={s.root}>
        <Toaster />
        <LoadingBar />
        <div className={s.container}>
          <Navbar fluid className={cx(s.commonHeaderAdmin, 'rentAllAdminHeader', 'rentallAdminHeaderNoBorder', 'hidden-xs')} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand className={cx('hidden-xs', s.homeLogo)}>
                <Logo link={"/siteadmin"} className={cx(s.brandAdmin, s.brandImg)} />
              </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
              <AdminNavigation />
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteSettings: state.siteSettings.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(AdminHeader)));
