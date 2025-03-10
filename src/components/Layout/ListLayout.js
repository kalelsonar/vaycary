import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Header from '../Header';
import ListHeader from '../Header/List';
import CookiesDisclaimer from '../CookiesDisclaimer';

import s from './Layout.css';
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    step: PropTypes.number.isRequired,
    formPage: PropTypes.string.isRequired
  };

  render() {
    const { step, formPage, listId, formBaseURI, listingSteps } = this.props;
    let show;
    if (step == 1) {
      show = listingSteps && listingSteps.step1 != 'completed' ? true : false;
    } else if (step == 2) {
      show = listingSteps && listingSteps.step2 != 'completed' ? true : false;
    } else if (step == 3) {
      show = listingSteps && listingSteps.step3 != 'completed' ? true : false;
    }
    return (
      <div className={s.overFlowHidden}>
        {show ? <>  <Header />
          <div className={s.paddingTop}>
            {this.props.children}
          </div></> : <>
          <ListHeader
            step={step}
            formPage={formPage}
            listId={listId}
            formBaseURI={formBaseURI}
          />
          {this.props.children}
        </>
        }
        <CookiesDisclaimer />
      </div>
    );
  }
}

const mapState = (state) => ({
  listingSteps: state.location.listingSteps
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Layout)));