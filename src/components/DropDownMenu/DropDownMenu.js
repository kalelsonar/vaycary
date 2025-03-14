import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/lib/fa';
import cx from 'classnames';
import s from './DropDownMenu.css';
import Avatar from '../Avatar';
import { graphql, gql, compose } from 'react-apollo';
import UnreadThreadsQuery from '../Message/getUnreadThreads.graphql';

//image
import icon from '/public/SiteIcons/menuIcon.svg'

class DropDownMenu extends React.Component {

  static propTypes = {
    allUnreadThreadsCount: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      getUnreadCount: PropTypes.shape({
        total: PropTypes.number.isRequired,
      }),
    }),
  };

  static defaultProps = {
    allUnreadThreadsCount: {
      loading: true,
      getUnreadCount: {
        total: 0,
      },
    },
  };


  render() {

    const { allUnreadThreadsCount: { loading, getUnreadCount } } = this.props;
    let count = 0;
    if (!loading && getUnreadCount != null) {
      count = getUnreadCount.total != null ? getUnreadCount.total : 0;
    }
    const isNewMessage = count > 0;


    return (
      <div className={s.menuBg}>
        {
          isNewMessage && <FontAwesome.FaCircle className={cx(s.notification, 'notificationHeaderRTL', 'homeNotifiction', 'homeNotifictionRTL')} />
        }
        <span>
          <img src={icon} alt='Menu Icon' />
        </span>
        <span>
          <Avatar
            isUser
            type={'small'}
            height={32}
            width={32}
            className={s.userAvatar}
          />
        </span>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(UnreadThreadsQuery, {
    name: 'allUnreadThreadsCount',
    options: {
      ssr: false,
      pollInterval: 5000,
    },
  }),
)(DropDownMenu);
