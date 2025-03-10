import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminRolesManagement from '../../../components/siteadmin/AdminRolesManagement';
import s from './AdminRoles.css';

class AdminRoles extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllAdminRoles: PropTypes.array,
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

    return <AdminRolesManagement
      setStateVariable={this.setStateVariable}
      currentPage={currentPage}
    />
  }
}

export default withStyles(s)(AdminRoles);