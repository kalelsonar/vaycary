import React from 'react';
import { flowRight as compose } from 'lodash';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Document.css';

// Component
import DocumentVerification from '../../../components/siteadmin/DocumentVerification';
import Loader from '../../../components/Loader';

class Document extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
    };
    this.setStateVariable = this.setStateVariable.bind(this);
  }

  setStateVariable(variables) {
    this.setState(variables)
  }

  render() {
    const { currentPage, searchList } = this.state;

    return <DocumentVerification
      currentPage={currentPage}
      searchList={searchList}
      setStateVariable={this.setStateVariable} />;
  }

}

export default compose(
  withStyles(s),
)(Document);




