import React from "react";
import withStyles from "isomorphic-style-loader/withStyles";
import s from "./Test.css";

class Test extends React.Component {
  
  render() {
    return (
            <div className={s.b13}>ssdam  Radicalstart</div>
    );
  }
}

export default withStyles(s)(Test);