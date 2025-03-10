import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { FormattedMessage, injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Dashboard.css';
import bt from '../../components/commonStyle.css';

// Component
import UnreadMessages from './UnreadMessages';
import DashboardMenu from './DashboardMenu';
import DashBoardSideMenu from './DashBoardSideMenu';

// Graphql 
import UnreadThreadsQuery from './getUnreadThreads.graphql';

// Locale
import messages from '../../locale/messages';

//Images
import WavingHand from '/public/SiteIcons/wavingHand.png';

class Dashboard extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      picture: PropTypes.string,
    }).isRequired,
    allUnreadThreads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadThreads: PropTypes.array
    }),
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    allUnreadThreads: {
      loading: true,
      getUnreadThreads: []
    },
    account: {
      userId: null,
      picture: null
    }
  }

  render() {
    const { account: { userId, picture, firstName }, siteName } = this.props;
    const { allUnreadThreads: { loading, getUnreadThreads } } = this.props;
    const { formatMessage } = this.props.intl;
    let newMessages = 0;
    if (!loading) {
      newMessages = getUnreadThreads != null ? getUnreadThreads.length : 0;
    }
    let messageCount = formatMessage(messages.messages) + ` (${newMessages} ` + formatMessage(messages.messagesNew) + ')';

    return (
      <>
        <Grid fluid className={cx(s.pageContainer, 'ViewProfile')}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardGrid'}>
                <div>
                  <DashBoardSideMenu />
                </div>
                <div>
                  <div className={cx('commonListingBg', 'dashboard')}>
                    <h3 className={bt.listingTitleText}>
                      <span className={cx(s.waveHandImage, 'waveHandImageRTL')}><img src={WavingHand} /></span>
                      <span className={s.waveHandImageSection}>{formatMessage(messages.sayHelloTo)} {firstName && <>{" "} {firstName}</>}</span>
                    </h3>
                    <p>
                      <span>{formatMessage(messages.sayHelloTo) + ' ' + firstName}{'!,'}</span>{' '}
                      <FormattedMessage {...messages.dashBoardInfo} />
                    </p>
                    <p className={s.noMargin}><FormattedMessage {...messages.dashBoardInfo1} /></p>
                  </div>
                  <div>
                    <DashboardMenu />
                    <h4 className={s.messageCountText}>{messageCount}</h4>
                    <UnreadMessages
                      userId={userId}
                      loading={loading}
                      getUnreadThreads={getUnreadThreads}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}

const mapState = (state) => ({
  account: state.account.data,
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreads',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  })
)(Dashboard);