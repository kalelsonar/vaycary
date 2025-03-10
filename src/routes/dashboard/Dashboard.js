import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Dashboard from '../../components/Dashboard';
import s from './Dashboard.css';
class Progressbar extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <>
        <Dashboard />
      </>
    );
  }
}

export default withStyles(s)(Progressbar);
