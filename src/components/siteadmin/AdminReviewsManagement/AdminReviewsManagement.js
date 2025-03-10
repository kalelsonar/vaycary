import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Confirm from 'react-confirm-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../../components/Link';
import StarRating from '../../StarRating';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import { deleteAdminReview } from '../../../actions/siteadmin/AdminReviews/deleteAdminReview';
import reviewsManagement from './reviewsManagement.graphql';

import s from './AdminReviewsManagement.css';
class AdminReviewsManagement extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    editUser: PropTypes.any,
    deleteAdminReview: PropTypes.any,
    title: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
      typing: false,
      typingTimeout: 0
    }
  }

  paginationData = (currentPage) => {
    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage, type: 'admin' };
    this.setState({ currentPage });
    refetch(variables);

  }

  handleClick = (searchList) => {
    const { reviewsManagement: { refetch } } = this.props;
    const { currentPage } = this.state;
    let variables = {
      currentPage: 1,
      searchList: searchList,
      type: 'admin'
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
      searchList: event.target.value,
      typing: false,
      typingTimeout: setTimeout(function () {
        self.handleClick(self.state.searchList);
      }, 450)
    });
  }

  deleteReview(id) {
    const { deleteAdminReview } = this.props;
    const { reviewsManagement: { refetch } } = this.props;

    let variables = { currentPage: 1,  type: 'admin' };
    deleteAdminReview(id);
    this.setState({ currentPage: 1 });
    refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.listId) },
      { data: formatMessage(messages.adminListTitle) },
      { data: formatMessage(messages.reviewContentLabel) },
      { data: formatMessage(messages.ratingReviewLabel) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { reviewsManagement: { loading, reviewsManagement } } = props;
    const { formatMessage } = props.intl;
    return reviewsManagement?.reviewsData?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value?.listId },
          {
            data: <a href={"/rooms/" + value?.listId} target="_blank">
              {value?.listData ? value?.listData?.title : 'List is missing'}</a>
          },
          { data: value?.reviewContent },
          { data: <StarRating className={s.reviewStar} value={value?.rating} name={'review'} starCount={5} /> },
          {
            data: <Link to={"/siteadmin/reviews/edit-review/" + value?.id}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          },
          {
            data: <div>
              <Confirm
                onConfirm={() => this.deleteReview(value?.id)}
                body={formatMessage(messages.areYouSureDeleteWishList)}
                confirmText={formatMessage(messages.confirmDelete)}
                cancelText={formatMessage(messages.cancel)}
                title={formatMessage(messages.deleteReviewLabel)}
              >
                <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /> </a>
              </Confirm>
            </div>
          }
        ]
      }
    });
  }

  render() {
    const { currentPage } = this.state;
    const { reviewsManagement: { reviewsManagement } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
               <CommonTable
                    title={formatMessage(messages.adminReviews)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                    isSearch
                    handleSearch={(e) => this.handleSearchChange(e)}
                />
          {
            reviewsManagement?.reviewsData?.length > 0 && <div>
              <CustomPagination
                total={reviewsManagement.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.reviews)}
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
  deleteAdminReview,
};

export default compose(injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: {
      variables: {
        currentPage: 1,
        searchList: '',
        type: 'admin'
      },
      fetchPolicy: 'network-only',
    }
  })
)(AdminReviewsManagement);