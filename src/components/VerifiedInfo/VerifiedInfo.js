import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';

// Redux
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VerifiedInfo.css';

// Component
import Accounts from './Accounts';
import Loader from '../Loader';

// Locale
import messages from '../../locale/messages';

class VerifiedInfo extends Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    verifiedInfoData: PropTypes.shape({
      loading: PropTypes.bool,
      getUserVerifiedInfo: PropTypes.object,
    }),
    userId: PropTypes.string,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    verifiedInfoData: {
      loading: true
    },
    account: {
      userId: null
    }
  };

  template(content) {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <h3 className={s.titleText}>{formatMessage(messages.verifiedInfo)}</h3>
        {content}
      </div>
    );
  }

  render() {
    const { verifiedInfoData: { loading, getUserVerifiedInfo }, account, userId, showOwnProfile, hideMoreVerification } = this.props;

    let isLoggedInUser = false;
    if (account != null) {
      isLoggedInUser = account.userId === userId ? true : false;
    }

    if (loading) {
      return this.template(
        <Loader type={"text"} />
      );
    }

    return this.template(
      <Accounts items={getUserVerifiedInfo} isLoggedInUser={isLoggedInUser} showOwnProfile={showOwnProfile} hideMoreVerification={hideMoreVerification} />
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
});

const mapDispatch = {
};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
        query getUserVerifiedInfo($userId : String !) {
          getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            status
          }
        }
      `,
    {
      name: 'verifiedInfoData',
      options: (props) => ({
        variables: {
          userId: props.userId,
        },
        //ssr: false,
        fetchPolicy: 'network-only'
      })
    }
  ),
)(VerifiedInfo);