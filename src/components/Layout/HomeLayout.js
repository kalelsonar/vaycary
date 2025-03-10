import React from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import HomeHeader from '../Header/HomeHeader';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';

import s from './Layout.css';

function HomeLayout(props) {
  return (
    <div>
      <HomeHeader
        borderLess={true}
        layoutType={props.layoutType}
        homeHeaderOnly={true}
      />
      <main>{props.children}</main>
      <Footer />
      <CookiesDisclaimer />
    </div>
  )
}

export default compose(withStyles(s))(HomeLayout);