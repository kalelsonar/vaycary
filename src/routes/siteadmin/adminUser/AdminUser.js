import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AdminUserManagement from '../../../components/siteadmin/AdminUserManagement';
import s from './AdminUser.css';
class AdminUser extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getAllAdminRoles: PropTypes.array,
    })
  };

  static defaultProps = {
    data: {
      loading: true
    },
    adminRoles: {
      getAllAdminRoles: []
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

    return <AdminUserManagement
      setStateVariable={this.setStateVariable}
      currentPage={currentPage} />
  }
}

export default withStyles(s)(AdminUser);