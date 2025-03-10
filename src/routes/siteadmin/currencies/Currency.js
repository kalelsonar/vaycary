import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CurrencyManagement from '../../../components/siteadmin/CurrencyManagement';
import s from './Currency.css';

class Currency extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getCurrencies: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  setStateVariable = (variables) => {
    this.setState(variables);
  }

  render() {
    const { currentPage } = this.state;

    return <CurrencyManagement
      setStateVariable={this.setStateVariable}
      currentPage={currentPage}
    />
  }
}

export default withStyles(s)(Currency);