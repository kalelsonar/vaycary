import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import CommentModal from './CommentModal/CommentModal';
import HistoryModal from './HistoryModal/HistoryModal';
import CustomPagination from '../../CustomPagination/CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import listingsQuery from './listingsQuery.graphql'
import { approveListing } from '../../../actions/Listing/ManagePublishStatus';
import { openCommentModal, closeCommentModal, openHistoryModal } from '../../../actions/modalActions';
import showToaster from '../../../helpers/showToaster';

import s from './ListingApprovalManagement.css';

class ListingApprovalManagement extends React.Component {

  static propTypes = {
    getAllPermissionListings: PropTypes.array,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
    this.paginationData = this.paginationData.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleApprove = this.handleApprove.bind(this);
    this.handleDecline = this.handleDecline.bind(this);
  }

  async handleApprove(event, listId) {
    const { getAllPermissionListings: { refetch }, openCommentModal } = this.props;
    const { approveListing } = this.props;
    const { currentPage } = this.state;
    let variables = { currentPage };

    if (event.target.value === 'approved') {
      await approveListing(listId, event.target.value);
      refetch(variables);
    } else if (event.target.value === 'declined') {
      openCommentModal(listId);
    }
  }

  async handleDecline(listId, comment) {
    const { getAllPermissionListings: { refetch }, closeCommentModal } = this.props;
    const { approveListing } = this.props;
    const { currentPage } = this.state;
    let variables = { currentPage };
    if (comment) {
      await approveListing(listId, 'declined', comment);
      refetch(variables);
      closeCommentModal();
    } else {
      showToaster({ messageId: 'commandReason', toasterType: 'error' })
    }
  }

  paginationData(currentPage) {
    const { getAllPermissionListings: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }
  handleClick(searchList) {
    const { getAllPermissionListings: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList
    };
    this.setState({ currentPage: 1 });
    refetch(variables);
  }
  handleSearchChange = (e) => {
    const self = this;
    if (self.state.typingTimeout) {
      clearTimeout(self.state.typingTimeout);
    }
    self.setState({
      searchList: e.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  thead = () => {
    const { formatMessage } = this.props.intl
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.adminTitleLabel) },
      { data: formatMessage(messages.hostNameLabel) },
      { data: formatMessage(messages.hostEMailLabel) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.submittedOn) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.viewLabel) },
      { data: formatMessage(messages.history) }
    ]
  }

  tbody = (props) => {
    const { getAllPermissionListings: { loading, getAllPermissionListings }, openHistoryModal } = props;
    const { formatMessage } = props.intl;
    return getAllPermissionListings?.results?.map((value, key) => {
      let viewListing = "/rooms/" + value?.id;
      let editListing = '/become-a-host/' + value?.id + '/home';
      let status = value?.listApprovalStatus;
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.title },
          { data: value?.user.profile.firstName },
          { data: value?.user.email },
          {
            data: <select className={cx(s.formSelect, s.formSelectNew)} onChange={(e) => this.handleApprove(e, value?.id)} value={status}>
              <option value="pending">{formatMessage(messages.messageStatus5)}</option>
              <option value="approved">{formatMessage(messages.approved)}</option>
              <option value="declined">{formatMessage(messages.declined)}</option>
            </select>
          },
          { data: value?.submittedOn && moment(value?.submittedOn?.createdAt).format('MM/DD/YYYY') },
          {
            data: <a href={editListing} target="_blank" >
              <FormattedMessage {...messages.editLabel} />
            </a>
          },
          {
            data: <a href={viewListing} target="_blank" >
              <FormattedMessage {...messages.viewLabel} />
            </a>
          },
          {
            data: status === 'declined' && <a onClick={() => openHistoryModal(value?.listingHistory)}>
              <FormattedMessage {...messages.viewLabel} />
            </a>
          }
        ]
      }
    })
  }

  render() {
    const { getAllPermissionListings: { loading, getAllPermissionListings }, openHistoryModal } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommentModal handleDecline={this.handleDecline} />
        <HistoryModal />
        <CommonTable
          title={formatMessage(messages.listingApproval)}
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          isSearch
          handleSearch={(e) => this.handleSearchChange(e)}
        />
        <div>
          {
            getAllPermissionListings && getAllPermissionListings.results && getAllPermissionListings.results.length > 0
            && <div>
              <CustomPagination
                total={getAllPermissionListings.count}
                currentPage={getAllPermissionListings.currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.requests)}
              />
            </div>
          }
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  approveListing,
  openCommentModal,
  closeCommentModal,
  openHistoryModal
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllPermissionListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ListingApprovalManagement);