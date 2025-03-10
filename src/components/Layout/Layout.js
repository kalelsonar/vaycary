import React from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';

function Layout(props) {
  return (
    <div>
      <Header page={props.page} guests={props.guests} whyHostHeader={props.whyHostHeader} whyHostSearchHide={props.whyHostSearchHide} viewListingHeader={props.viewListingHeader} />
      <main>{props.children}</main>
      <Footer />
      <CookiesDisclaimer />
    </div>
  )
}
export default compose(
  withStyles(s),
)(Layout);
