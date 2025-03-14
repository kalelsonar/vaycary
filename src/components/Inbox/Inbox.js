import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import {
  Grid,
  Row,
  Col,
  Badge
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Component
import InboxItem from './InboxItem';
import EmptyInbox from './EmptyInbox';
import Loader from '../Loader';
import CustomPagination from '../CustomPagination';

// helpers 
import UnreadCountQuery from './UnreadCount.graphql';
import GetAllThreadQuery from './AllThreadsQuery.graphql';
import messages from '../../locale/messages';

//style
import s from './Inbox.css';

class Inbox extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.any,
    allThreads: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      GetAllThreads: PropTypes.shape({
        count: PropTypes.number.isRequired,
        threadsData: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          listData: PropTypes.shape({
            city: PropTypes.string.isRequired,
            state: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
          }),
          guestProfile: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            picture: PropTypes.string,
            displayName: PropTypes.string.isRequired,
          }),
          hostProfile: PropTypes.shape({
            profileId: PropTypes.number.isRequired,
            picture: PropTypes.string,
            displayName: PropTypes.string.isRequired,
          }),
          threadItem: PropTypes.shape({
            type: PropTypes.string.isRequired,
            content: PropTypes.string,
            startDate: PropTypes.string,
            endDate: PropTypes.string,
            isRead: PropTypes.bool.isRequired,
            sentBy: PropTypes.string.isRequired,
            createdAt: PropTypes.string.isRequired,
          })
        }))
      }),
    }),
    UnreadCount: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadCount: PropTypes.shape({
        hostCount: PropTypes.number.isRequired,
        guestCount: PropTypes.number.isRequired
      })
    })
  };

  static defaultProps = {
    allThreads: {
      loading: true,
      GetAllThreads: {
        count: null,
        threadsData: []
      }
    },
    UnreadCount: {
      loading: true,
      hostCount: null,
      guestCount: null
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      type: 'guest',
      currentPage: 1
    }
    this.changeType = this.changeType.bind(this);
    this.paginationData = this.paginationData.bind(this);
  }

  componentWillUnmount() {
    const { UnreadCount } = this.props;
    UnreadCount.stopPolling();
  }

  changeType(threadType) {
    const { allThreads: { refetch } } = this.props;
    let variables = {
      threadType,
      currentPage: 1
    };
    this.setState({ type: threadType, currentPage: 1 });
    refetch(variables);
  }

  scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  paginationData(currentPage) {
    const { allThreads: { refetch } } = this.props;
    let variables = { currentPage };
    this.scrollTop();
    this.setState({ currentPage });
    refetch(variables);
  }

  render() {
    const { allThreads: { loading, GetAllThreads } } = this.props;
    const { UnreadCount: { getUnreadCount } } = this.props;
    const { formatMessage } = this.props.intl;
    const { type, currentPage } = this.state;
    let hostActive, guestActive, host, guest, hostActiveDark, guestActiveDark;
    if (type === 'host') {
      hostActive = s.active;
    } else {
      guestActive = s.active;
    }
    if (type === 'host') {
      hostActiveDark = 'activeDark';
    } else {
      guestActiveDark = 'activeDark';
    }
    if (getUnreadCount) {
      host = getUnreadCount.hostCount != null && getUnreadCount.hostCount > 0 ? getUnreadCount.hostCount : null;
      guest = getUnreadCount.guestCount != null && getUnreadCount.guestCount > 0 ? getUnreadCount.guestCount : null;
    }
    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={'tripContainer inboxContainer'}>
              <div className={cx(s.listFlex, s.space5)}>
                <div className={cx(guestActive, guestActiveDark)}>
                  <a
                    className={cx(s.tabItem, 'inboxBorder', guestActive, guestActiveDark, 'textWhite')}
                    href="javascript:void(0)"
                    onClick={() => this.changeType('guest')}
                  >
                    <FormattedMessage {...messages.traveling} />
                    {
                      guest != null && <Badge
                        className={cx(s.count, 'countRTL')}
                      >
                        {guest}
                      </Badge>
                    }
                  </a>
                </div>
                <div className={cx(hostActive, hostActiveDark)}>
                  <a
                    className={cx(s.tabItem, 'inboxBorder', 'textWhite')}
                    href="javascript:void(0)"
                    onClick={() => this.changeType('host')}
                  >
                    <FormattedMessage {...messages.hosting} />
                    {
                      host != null && <Badge
                        className={cx(s.count, 'countRTL')}
                      >
                        {host}
                      </Badge>
                    }
                  </a>
                </div>
              </div>
              <>
                {
                  loading && <Loader type={"text"} />
                }

                {
                  !loading && GetAllThreads && GetAllThreads.threadsData && GetAllThreads.threadsData.length > 0
                  && <ul className={cx(s.listLayout, 'listLayoutArbic')}>
                    {
                      GetAllThreads.threadsData.map((item, index) => {
                        if (item.guestProfile && item.hostProfile) {
                          return <InboxItem
                            key={index}
                            threadId={item.id}
                            type={type}
                            profileId={type === 'host' ? item.guestProfile.profileId : item.hostProfile.profileId}
                            picture={type === 'host' ? item.guestProfile.picture : item.hostProfile.picture}
                            displayName={type === 'host' ? item.guestProfile.firstName : item.hostProfile.firstName}
                            content={item?.threadItem?.content}
                            createdAt={item?.threadItem?.createdAt}
                            city={item?.listData?.city}
                            state={item.listData?.state}
                            country={item.listData?.country}
                            startDate={item?.threadItem?.startDate}
                            endDate={item?.threadItem?.endDate}
                            status={item?.threadItem?.type}
                            sentBy={item.threadItem?.sentBy}
                            read={item.threadItem?.isRead}
                          />
                        } else {
                          return <li />
                        }
                      })
                    }
                  </ul>
                }
                {
                  !loading && GetAllThreads && GetAllThreads.threadsData && GetAllThreads.threadsData.length === 0
                  && <EmptyInbox type={type} />
                }

                {
                  GetAllThreads && GetAllThreads.threadsData && GetAllThreads.threadsData.length > 0
                  && <div>
                    <CustomPagination
                      total={GetAllThreads.count}
                      currentPage={currentPage}
                      defaultCurrent={1}
                      defaultPageSize={5}
                      change={this.paginationData}
                      paginationLabel={formatMessage(messages.messages)}
                    />
                  </div>
                }
              </>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(UnreadCountQuery, {
    name: 'UnreadCount',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only'
    }
  }),
  graphql(GetAllThreadQuery, {
    name: 'GetAllThreads',
    options: {
      ssr: false,
      pollInterval: 5000,
      fetchPolicy: 'network-only',
    }
  })
)(Inbox);