import React from "react";
import PropTypes from "prop-types";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import Header from "../Header";
import CookiesDisclaimer from "../CookiesDisclaimer";

import s from "./Layout.css";
class NewListLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.overFlowHidden}>
        <Header />
        <div className={s.paddingTop}>{this.props.children}</div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(NewListLayout);
