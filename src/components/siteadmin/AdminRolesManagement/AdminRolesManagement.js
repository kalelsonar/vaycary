import React from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

import AdminRolesModal from '../AdminRolesModal';
import CommonTable from '../../CommonTable/CommonTable';
import Link from '../../Link';
import CustomPagination from '../../CustomPagination';

import adminRolesQuery from './adminRolesQuery.graphql';
import messages from '../../../locale/messages';
import { openAdminRolesModal } from '../../../actions/siteadmin/modalActions';
import { deleteAdminRole } from '../../../actions/siteadmin/AdminRoles/manageAdminRoles';

import s from './AdminRolesManagement.css';
import bt from '../../../components/commonStyle.css';

class AdminRolesManagement extends React.Component {

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  paginationData = (currentPage) => {
    const { data: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  handleModalOpen = (value) => {
    const { openAdminRolesModal } = this.props;
    if (value) openAdminRolesModal('edit', value)
    else openAdminRolesModal('add')
  }

  handleDelete = async (id) => {
    const { data: { refetch } } = this.props;
    const { deleteAdminRole, setStateVariable } = this.props;
    let variables = { currentPage: 1 };
    await deleteAdminRole(id);
    this.setState({ currentPage: 1 });
    await setStateVariable(variables);
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.name) },
      { data: formatMessage(messages.descriptionAdminLabel) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { data: { getAllAdminRoles } } = props;

    return getAllAdminRoles?.results?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value?.id, },
          { data: value?.name },
          { data: value?.description },
          { data: <Link noLink onClick={() => this.handleModalOpen(value)}><FormattedMessage {...messages.editLabel} /></Link> },
          { data: <Link noLink onClick={() => this.handleDelete(value?.id)}><FormattedMessage {...messages.delete} /></Link> }
        ]
      }
    })
  }

  render() {
    const { currentPage } = this.props;
    const { data: { getAllAdminRoles } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <AdminRolesModal paginationData={this.paginationData} currentPage={currentPage} />
        <CommonTable
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          title={formatMessage(messages.manageAdminRoles)}
          addAction={this.handleModalOpen}
          redirectionLabel={formatMessage(messages.addNewLabel)}
        />
        {
          getAllAdminRoles?.count > 0 &&
          <CustomPagination
            total={getAllAdminRoles?.count}
            currentPage={currentPage}
            defaultCurrent={1}
            defaultPageSize={10}
            change={this.paginationData}
            paginationLabel={formatMessage(messages.roles)}
            isScroll
          />
        }
      </div>
    )
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  openAdminRolesModal,
  deleteAdminRole
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(adminRolesQuery, {
    options: (props) => ({
      variables: {
        currentPage: props.currentPage
      },
      fetchPolicy: 'network-only'
    })
  }),
)(AdminRolesManagement);