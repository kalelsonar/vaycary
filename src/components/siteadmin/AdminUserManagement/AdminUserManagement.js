import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import AdminUserModal from '../AdminUserModal';
import Link from '../../Link';
import CommonTable from '../../CommonTable/CommonTable';
import CustomPagination from '../../CustomPagination/CustomPagination';

import messages from '../../../locale/messages';
import adminUserQuery from './adminUserQuery.graphql';
import adminRolesQuery from './adminRolesQuery.graphql';
import { openAdminUserModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminUser } from '../../../actions/siteadmin/AdminUser/manageAdminUser';

import s from './AdminUserManagement.css';
import bt from '../../../components/commonStyle.css';

class AdminUserManagement extends React.Component {

  static defaultProps = {
    data: [],
    roles: []
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  handleDelete = async (id) => {
    const { deleteAdminUser, setStateVariable } = this.props;
    const { data: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminUser(id);
    await setStateVariable(variables);
    await refetch(variables);
  }

  handleModalOpen = async (value) => {
    const { openAdminUserModal } = this.props;
    if (value) openAdminUserModal('edit', value)
    else openAdminUserModal('add')
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.sNoLabel) },
      { data: formatMessage(messages.emailLabel) },
      { data: formatMessage(messages.adminRoleLabel) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { data: { getAllAdminUsers } } = props;

    return getAllAdminUsers?.results?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: key + 1, },
          { data: value?.email },
          { data: value?.adminRole?.name },
          { data: <Link noLink onClick={() => this.handleModalOpen(value)}><FormattedMessage {...messages.editLabel} /></Link> },
          { data: <Link noLink onClick={() => this.handleDelete(value?.id)}><FormattedMessage {...messages.delete} /></Link> }
        ]
      }
    })
  }

  paginationData = (currentPage) => {
    const { setStateVariable } = this.props;
    const { data: { refetch } } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  render() {
    const { currentPage } = this.props;
    const { formatMessage } = this.props.intl;
    const { data: { getAllAdminUsers } } = this.props;
    const { adminRoles: { getAllAdminRoles } } = this.props;


    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <AdminUserModal roles={getAllAdminRoles} paginationData={this.paginationData} currentPage={currentPage} />
        <CommonTable
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          title={formatMessage(messages.manageAdminUsers)}
          addAction={this.handleModalOpen}
          redirectionLabel={formatMessage(messages.addNewLabel)}
        />
        {
          getAllAdminUsers?.count > 0 &&
          <div>
            <CustomPagination
              total={getAllAdminUsers?.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.usersLabel)}
            />
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  openAdminUserModal,
  deleteAdminUser
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(adminUserQuery, {
    options: (props) => ({
      variables: {
        currentPage: props.currentPage
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(adminRolesQuery, {
    name: 'adminRoles',
    options: {
      fetchPolicy: 'network-only',
      ssr: true
    }
  })
)(AdminUserManagement);