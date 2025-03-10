import React from 'react';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import Confirm from 'react-confirm-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import Link from '../../../../components/Link';
import CommonTable from '../../../CommonTable/CommonTable';
import CustomPagination from '../../../CustomPagination';

import { deleteWhyHostReview } from '../../../../actions/siteadmin/WhyHostReview/deleteWhyHostReview';
import { debounce } from '../../../../helpers/debounce';
import messages from '../../../../locale/messages';
import reviewsManagement from './reviewsManagement.graphql';

import s from './AdminReviewsManagement.css';
import bt from '../../../../components/commonStyle.css';

class AdminReviewsManagement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currentPage: 1,
      searchList: '',
    }

  }

  paginationData = (currentPage) => {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable({ currentPage });
    refetch(variables);
  }

  handleSearchChange(searchList) {
    const { reviewsManagement: { refetch }, setStateVariable } = this.props;
    let variables = {
      currentPage: 1,
      searchList,
    };
    setStateVariable(variables);
    refetch(variables);
  }

  deleteReview = async ({ reviewId }) => {
    const { deleteWhyHostReview, setStateVariable } = this.props;
    const { reviewsManagement: { refetch } } = this.props;
    let variables = { currentPage: 1 };
    await deleteWhyHostReview({ reviewId });
    await setStateVariable({ currentPage: 1 });
    await refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.userNameLabel) },
      { data: formatMessage(messages.reviewContentLabel) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { reviewsManagement: { getWhyHostAllReviews } } = props;
    const { formatMessage } = props.intl;
    return getWhyHostAllReviews?.results?.map((review, key) => {
      return {
        id: key,
        data: [
          { data: review?.id },
          { data: review?.userName },
          { data: review?.reviewContent },
          {
            data: <Link to={"/siteadmin/whyHost/review/edit/" + review?.id}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          },
          {
            data: <div>
              <Confirm
                onConfirm={() => this.deleteReview({ reviewId: review?.id })}
                body={formatMessage(messages.areYouSureDeleteWishList)}
                confirmText={formatMessage(messages.confirmDelete)}
                cancelText={formatMessage(messages.cancel)}
                title={formatMessage(messages.deleteReviewLabel)}
              >
                <a href="javascript:void(0)">
                  <FormattedMessage {...messages.delete} />
                </a>
              </Confirm>
            </div>
          }
        ]
      }
    })
  }

  render() {
    const { currentPage } = this.props;
    const { reviewsManagement: { getWhyHostAllReviews } } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <div>
          <CommonTable
            title={formatMessage(messages.whyBecomeHostBlock2)}
            thead={this.thead}
            tbody={() => this.tbody(this.props)} 
            isSearch
            handleSearch={(e) => debounce(this.handleSearchChange(e?.target?.value))}
            isLink
            linkURL={'/siteadmin/whyHost/review/add'}
            linkLabel={formatMessage(messages.addNewLabel)}
          />
          {
            getWhyHostAllReviews?.results?.length > 0
            && <div>
              <CustomPagination
                total={getWhyHostAllReviews.count}
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
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
  deleteWhyHostReview,
};

export default compose(injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(reviewsManagement, {
    name: 'reviewsManagement',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(AdminReviewsManagement);