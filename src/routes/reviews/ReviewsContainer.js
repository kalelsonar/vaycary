import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Reviews from '../../components/Reviews';
import ReviewsByYou from '../../components/Reviews/ReviewsByYou';
import SideMenuTrips from '../../components/ManageListing/SideMenuTrips';

import UserReviewsQuery from './UserReviews.graphql';
import PendingReviewsQuery from './PendingReviews.graphql';
import messages from '../../locale/messages';

import s from './ReviewsContainer.css';

class ReviewsContainer extends React.Component {
  static propTypes = {
    userReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.array
    }),
    pendingReviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      load: true,
      isReviewLoading: false,
      isListLoading: false,
    }
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;

    if (locale !== prevLocale) {
      this.setState({ load: false });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => this.setState({ load: true }), 1);
    }
  }

  loadMore = async (ownerType, current, searchKey) => {
    const { userReviewsData: { userReviews, fetchMore } } = this.props;
    this.setState({ isReviewLoading: true });
    fetchMore({
      query: UserReviewsQuery,
      variables: {
        ownerType,
        offset: userReviews.results.length,
        loadCount: 3,
        current,
        searchKey
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return {
            userReviews: {
              totalCount: previousResult.userReviews.totalCount,
              results: previousResult.userReviews.results,
            }
          }
        }
        return {
          userReviews: {
            totalCount: fetchMoreResult.userReviews.totalCount,
            results: [...previousResult.userReviews.results, ...fetchMoreResult.userReviews.results],
          }
        };
      },
    }).then(() => this.setState({ isReviewLoading: false }))
  }

  loadMoreListing = () => {
    const { pendingReviewsData: { pendingReviews, fetchMore } } = this.props;
    this.setState({ isListLoading: true });
    fetchMore({
      query: PendingReviewsQuery,
      variables: {
        offset: pendingReviews.reservationData.length,
        loadCount: 10,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return {
            pendingReviews: {
              reservationData: previousResult.pendingReviews.reservationData,
            }
          }
        }
        return {
          pendingReviews: {
            reservationData: [...previousResult.pendingReviews.reservationData, ...fetchMoreResult.pendingReviews.reservationData],
          }
        };
      }
    }).then(() => this.setState({ isListLoading: false }));
  };

  render() {
    const { userReviewsData, pendingReviewsData, type } = this.props;
    const { formatMessage } = this.props.intl;
    const { load, isReviewLoading, isListLoading } = this.state;

    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <SideMenuTrips
                  menuItemOne={formatMessage(messages.reviewsAboutYou)}
                  menuItemTwo={formatMessage(messages.reviewPanelTitle2)}
                  linkOne={'/user/reviews/about-you'}
                  linkTwo={'/user/reviews/you'}
                />
                {load && type == 'about-you' && <Reviews
                  reviewsData={userReviewsData}
                  loadMore={this.loadMore}
                  isReviewLoading={isReviewLoading}
                />}
                {
                  load && type == 'you' && <ReviewsByYou
                    reviewsData={userReviewsData}
                    pendingData={pendingReviewsData}
                    loadMore={this.loadMore}
                    loadMoreListing={this.loadMoreListing}
                    isListLoading={isListLoading}
                    isReviewLoading={isReviewLoading}
                  />
                }
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(UserReviewsQuery,
    {
      name: 'userReviewsData',
      options: (props) => ({
        variables: {
          ownerType: 'others',
          current: 'responded'
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
  graphql(PendingReviewsQuery,
    {
      name: 'pendingReviewsData',
      options: (props) => ({
        fetchPolicy: 'network-only',
      })
    }
  ),
)(ReviewsContainer);
