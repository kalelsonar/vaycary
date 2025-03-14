// Plugin.
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Component.
import ViewProfile from '../../components/ViewProfile';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';

// GraphQL.
import ProfileQuery from './Profile.graphql';
import UserReviewsQuery from './UserReviews.graphql';

// Styles.
import s from './Profile.css';

class Profile extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    profileId: PropTypes.number,
    isUser: PropTypes.bool,
    userBanStatusValue: PropTypes.number,
  };
  static defaultProps = {
    isUser: false,
    userBanStatusValue: 0,
  };
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }
  loadMore() {
    const { profileData: { showUserProfile, fetchMore }, profileId } = this.props;
    fetchMore({
      query: UserReviewsQuery,
      variables: {
        ownerType: 'others',
        offset: showUserProfile.reviews.length,
        profileId,
        loadCount: 5,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          showUserProfile: {
            ...previousResult.showUserProfile,
            reviews: [...previousResult.showUserProfile.reviews, ...fetchMoreResult.userReviews.results],
          },
        };
      },
    });
  }
  render() {
    const { title, profileId, isUser, profileData: { loading, showUserProfile } } = this.props;
    let userBanStatusValue;

    if (showUserProfile) userBanStatusValue = showUserProfile.profileBanStatus.userBanStatus;
    if (!loading && !showUserProfile || userBanStatusValue) return <NotFound />

    return (
      <div className={'dashBoardContainer'}>
        {
          loading ?
            <Loader type={"text"} />
            :
            <div>
              <ViewProfile
                data={showUserProfile}
                isUser={isUser}
                loadMore={this.loadMore}
                profileId={profileId}
              />
            </div>
        }
      </div>
    );
  }
}
export default compose(
  withStyles(s),
  graphql(ProfileQuery,
    {
      name: 'profileData',
      options: (props) => ({
        variables: {
          profileId: props.profileId,
          isUser: props.isUser,
        },
        fetchPolicy: 'network-only',
      })
    }
  ),
)(Profile);
