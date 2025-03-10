import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '../../../components/Link';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';
import messages from '../../../locale/messages';
import { debounce } from '../../../helpers/debounce';
import { FormattedMessage, injectIntl } from 'react-intl';
import { deleteUser } from '../../../actions/siteadmin/users';
import { updateBanServiceHistoryStatus } from '../../../actions/siteadmin/updateBanServiceHistoryStatus';
import usersQuery from './usersQuery.graphql';

import s from './UserManagement.css';
import bt from '../../../components/commonStyle.css';
class UserManagement extends React.Component {
  static propTypes = {
    userManagement: PropTypes.array,
    editUser: PropTypes.any,
    deleteUser: PropTypes.any,
    title: PropTypes.string.isRequired,
    updateBanServiceHistoryStatus: PropTypes.any.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      typing: false,
      typingTimeout: 0
    }
  }

  handleChange = async (e, userId, userMail, userName) => {
    const { updateBanServiceHistoryStatus } = this.props;
    const { currentPage, searchList } = this.props;
    let id = userId;
    let banStatus = e.target.value;
    await updateBanServiceHistoryStatus(id, banStatus, userMail, userName, currentPage, searchList);
  }

  handleDropDown = (e) => {
    const { userManagement: { refetch }, setStateVariable } = this.props
    let variables = {
      userType: e.target.value,
      currentPage: 1
    };
    setStateVariable({ userType: e.target.value, currentPage: 1 });
    refetch(variables)
  }

  paginationData = (currentPage) => {
    const { userManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable({ currentPage });
    refetch(variables);
  }

  handleSearchChange = (searchList) => {
    const { userManagement: { refetch }, setStateVariable, userType } = this.props;
    let variables = {
      currentPage: 1,
      searchList,
      userType
    };
    setStateVariable(variables);
    refetch(variables);
  }

  deleteChange = async (id, profileId, userTypes) => {
    const { deleteUser, setStateVariable } = this.props;
    const { userManagement: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    await deleteUser(id, profileId, userTypes);
    await setStateVariable({ currentPage: 1 });
    await refetch(variables);
  }


  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.profileID) },
      { data: formatMessage(messages.firstName) },
      { data: formatMessage(messages.lastName) },
      { data: formatMessage(messages.email) },
      { data: formatMessage(messages.phoneNumber) },
      { data: formatMessage(messages.createdDate) },
      { data: formatMessage(messages.viewLabel) },
      { data: formatMessage(messages.actionLabel) },
      { data: formatMessage(messages.delete) },
    ]
  }

  tbody = (props) => {
    const { userManagement: { userManagement } } = props;
    const { formatMessage } = props.intl;
    return userManagement?.usersData?.map((value, key) => {
      let banStatus = value?.userBanStatus, recordId = value?.id;
      let userMail = value?.email, userName = value?.profile?.firstName + ' ' + value?.profile?.lastName;
      let userTypes = 'admin';
      banStatus = banStatus === 1 ? "1" : "0";
      return {
        id: key,
        data: [
          { data: value?.profile?.profileId, },
          { data: value?.profile?.firstName },
          { data: value?.profile?.lastName },
          { data: value?.email },
          { data: value?.profile?.countryCode && value?.profile?.phoneNumber && value?.profile?.countryCode + value?.profile?.phoneNumber },
          { data: moment(value?.profile?.createdAt).format('MM/DD/YYYY') },
          {
            data: <Link to={"/siteadmin/profile-view/" + ((value?.profile) ? value?.profile?.profileId : '')} >
              <FormattedMessage {...messages.viewLabel} />
            </Link>
          },
          {
            data: <select name="userBanStatus" className={cx(bt.commonControlSelect, s.userVerticalAlign, s.btnMarginBottom)}
              onChange={(e) => this.handleChange(e, recordId, userMail, userName)} value={banStatus}>
              <option value="">{formatMessage(messages.selectLabel)}</option>
              <option value="1">{formatMessage(messages.banLabel)}</option>
              <option value="0">{formatMessage(messages.unBanLabel)}</option>
            </select>
          },
          {
            data: <Confirm
              onConfirm={() => this.deleteChange(value?.id, value?.profile?.profileId, userTypes)}
              body={formatMessage(messages.areYouSureDeleteWishList)}
              confirmText={formatMessage(messages.confirmDelete)}
              cancelText={formatMessage(messages.cancel)}
              title={formatMessage(messages.deletingUser)}>
              <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
            </Confirm>
          }
        ]
      }
    })
  }

  tableFilter = () => {
    const { formatMessage } = this.props.intl;
    return [
      { value: "", label: formatMessage(messages.allLabel) },
      { value: "1", label: formatMessage(messages.guestCapcity) },
      { value: "2", label: formatMessage(messages.host) }
    ]
  }

  render() {
    const { userManagement: { loading, userManagement } } = this.props;
    const { currentPage, searchList, userType } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommonTable
          title={formatMessage(messages.userManagement)}
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          isSearch
          filterOption={this.tableFilter()}
          handleFilter={(e) => this.handleDropDown(e)}
          handleSearch={(e) => debounce(this.handleSearchChange(e?.target?.value))}
          exportURL={ userManagement?.usersData?.length > 0 ? "/export-admin-data?type=users&usertype=" + userType + "&keyword=" + searchList : null}
        />
        {
          userManagement?.usersData?.length > 0 && <div>
            <CustomPagination
              total={userManagement.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.usersLabel)}
              isScroll
            />
          </div>
        }
      </div>
    );
  }
}
const mapState = (state) => ({
});
const mapDispatch = {
  updateBanServiceHistoryStatus,
  deleteUser
};
export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(usersQuery, {
    name: 'userManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
        userType: props.userType
      },
      fetchPolicy: 'network-only',
    })
  })
)(UserManagement);