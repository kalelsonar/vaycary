import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
import { graphql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import { removeListing } from '../../../actions/siteadmin/ListingManagement/removeListing';
import { addListToRecommended, removeListFromRecommended } from '../../../actions/siteadmin/ListingManagement/manageRecommend';
import messages from '../../../locale/messages';
import listingsQuery from './listingsQuery.graphql';
import s from './ListingManagement.css';
class ListingManagement extends React.Component {

  static propTypes = {
    getAllListings: PropTypes.array,
    addListToRecommended: PropTypes.func.isRequired,
    removeListFromRecommended: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
  }

  paginationData = (currentPage) => {
    const { getAllListings: { refetch } } = this.props;
    let variables = { currentPage };
    this.setState({ currentPage });
    refetch(variables);
  }

  handleClick = (searchList) => {
    const { getAllListings: { refetch } } = this.props;
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

  deleteListing = async (id, type) => {
    const { removeListing } = this.props;
    const { getAllListings: { refetch } } = this.props;

    let variables = { currentPage: 1 };
    await removeListing(id, type);
    this.setState({ currentPage: 1 });
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.adminTitleLabel) },
      { data: formatMessage(messages.hostNameLabel) },
      { data: formatMessage(messages.hostEMailLabel) },
      { data: formatMessage(messages.address) },
      { data: formatMessage(messages.city) },
      { data: formatMessage(messages.stateLabel) },
      { data: formatMessage(messages.country) },
      { data: formatMessage(messages.createdDate) },
      { data: formatMessage(messages.recommendLabel) },
      { data: formatMessage(messages.publishedLabel) },
      { data: formatMessage(messages.ready) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.viewLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { getAllListings: { getAllListings }, removeListFromRecommended, addListToRecommended } = props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = props.intl;

    return getAllListings?.usersData?.map((value, key) => {
      let viewListing = "/rooms/" + value?.id, editListing = '/become-a-host/' + value.id + '/home';
      let isPublished = value?.isPublished ? 'Yes' : 'No', isReady = value?.isReady ? 'Yes' : 'No';
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.title },
          { data: value?.user?.profile?.firstName },
          { data: value?.user?.email },
          {
            data: (value?.street && value?.city && value?.state && value?.country && value?.zipcode) &&
              `${value?.street}, ${value?.buildingName ? (value?.buildingName + ", ") : ''}${value?.city}, ${value?.state}, ${value?.country}, ${value?.zipcode}`
          },
          { data: value?.city },
          { data: value?.state },
          { data: value?.country },
          { data: moment(value?.createdAt).format('MM/DD/YYYY') },
          {
            data: <a href="javascript:void(0)" onClick={() => value?.recommend ? removeListFromRecommended(value?.id, currentPage, searchList) : addListToRecommended(value.id, currentPage, searchList)} >
              {value?.recommend ? <FormattedMessage {...messages.remove} /> : <FormattedMessage {...messages.setLabel} />}
            </a>
          },
          { data: isPublished },
          { data: isReady },
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
            data: <Confirm
              onConfirm={() => this.deleteListing(value?.id, "admin")}
              body={formatMessage(messages.areYouSureDeleteWishList)}
              confirmText={formatMessage(messages.confirmDelete)}
              cancelText={formatMessage(messages.cancel)}
              title={formatMessage(messages.deletingListingTitle)}
            >
              <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
            </Confirm>
          }
        ]
      }
    })
  }

  render() {
    const { getAllListings: { getAllListings } } = this.props;
    const { currentPage, searchList } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <CommonTable
            title={formatMessage(messages.listingsManagement)}
            thead={this.thead}
            tbody={() => this.tbody(this.props)}
            isSearch
            handleSearch={(e) => this.handleSearchChange(e)}
            exportURL={getAllListings?.usersData?.length > 0 ? `/export-admin-data?type=listings&keyword=${searchList}` : null}
          />
          <div>
            {
              getAllListings?.usersData?.length > 0 && <div>
                <CustomPagination
                  total={getAllListings.count}
                  currentPage={currentPage}
                  defaultCurrent={1}
                  defaultPageSize={10}
                  change={this.paginationData}
                  paginationLabel={formatMessage(messages.lists)}
                  isScroll
                />
              </div>
            }
          </div>
        </div>
      </div>
    );
  }

}

const mapState = (state) => ({});

const mapDispatch = {
  removeListing,
  addListToRecommended,
  removeListFromRecommended
};
export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(listingsQuery, {
    name: 'getAllListings',
    options: {
      variables: {
        currentPage: 1,
        searchList: ''
      },
      fetchPolicy: 'network-only',
    }
  })
)(ListingManagement);