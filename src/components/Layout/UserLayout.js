import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import SubnavBar from '../SubnavBar';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { hideMenu } = this.props;

    return (
      <div className={cx(s.overFlowHidden, 'dashboardLayout')}>
        <Header />
        <div className={s.paddingTop}>
          {!hideMenu && <SubnavBar />}
          {this.props.children}
          <Footer />
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(UserLayout);
