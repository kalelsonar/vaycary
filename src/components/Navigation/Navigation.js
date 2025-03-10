import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

// Translation
import { injectIntl } from 'react-intl';

import NavigationBeforeLogin from '../NavigationBeforeLogin';
import NavigationAfterLogin from '../NavigationAfterLogin';

import { setUserLogout } from '../../actions/logout';
import {
  openLoginModal,
  openSignupModal
} from '../../actions/modalActions';

class Navigation extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    setUserLogout: PropTypes.any,
    openLoginModal: PropTypes.any,
    openSignupModal: PropTypes.any,
  };

  render() {
    const { className, isAuthenticated, setUserLogout, openLoginModal, openSignupModal, openClose, homeHeaderOnly, layoutType, whyHostSearchHide, homePage, page } = this.props;

    if (isAuthenticated === true) {
      return <NavigationAfterLogin
        className={className}
        setUserLogout={setUserLogout}
        openClose={openClose}
        homeHeaderOnly={homeHeaderOnly}
        layoutType={layoutType}
        whyHostSearchHide={whyHostSearchHide}
        homePage={homePage}
        page={page}
      />
    } else {
      return <NavigationBeforeLogin
        className={className}
        openLoginModal={openLoginModal}
        openSignupModal={openSignupModal}
        openClose={openClose}
        homeHeaderOnly={homeHeaderOnly}
        layoutType={layoutType}
        whyHostSearchHide={whyHostSearchHide}
        homePage={homePage}
        page={page}
      />;
    }
  }

}

const mapState = (state) => ({
  isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {
  setUserLogout,
  openLoginModal,
  openSignupModal
};

export default compose(
  injectIntl,
  connect(mapState, mapDispatch),
)(Navigation);