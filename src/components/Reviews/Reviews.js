import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import YourReviews from './YourReviews';
import Link from '../Link';

import messages from '../../locale/messages';
import { debounce } from '../../helpers/debounce';

import arrowIcon from '/public/SiteIcons/replyArrow.svg';

import s from './Reviews.css';

class Reviews extends React.Component {

  static propTypes = {
    reviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.array,
      refetch: PropTypes.any
    }),
    loadMore: PropTypes.any.isRequired
  };

  static defaultProp = {
    reviewsData: {
      loading: true
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 'responded',
      searchKey: '',
    };
  }

  handleClick = (type, current) => {
    const { reviewsData: { refetch } } = this.props;
    let variables = { ownerType: type, offset: 0, current };
    this.setState({ current });
    refetch(variables);
  }

  handleSearchChange = (searchKey) => {
    const { reviewsData: { refetch }, type } = this.props;
    let variables = {
      searchKey,
      current: this.state.current,
      type: 'others'
    };
    this.setState({ searchKey });
    refetch(variables);
  }

  render() {
    const { current, searchKey } = this.state;
    const { reviewsData, reviewsData: { userReviews }, loadMore, type, isReviewLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('reviews', s.reviewPanel)}>
        <ul className={cx('list-inline', s.tabs, 'tabsRTL')}>
          <li className={current === 'responded' ? s.active : ''}>
            <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleClick('others', 'responded')}>
              <FormattedMessage {...messages.responded} />
            </a>
          </li>
          <li className={current === 'notResponded' ? s.active : ''}>
            <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleClick('others', 'notResponded')}>
              <FormattedMessage {...messages.notResponded} />
            </a>
          </li>
          <li className={cx(s.reviewEditProfile, 'reviewEditProfileRTL')}>
            <Link to={"/user/edit"}>
              <FormattedMessage {...messages.editProfile} />
              <img src={arrowIcon} className={cx(s.editProfileArrow, 'editProfileArrowRTL')} />
            </Link>
          </li>
        </ul>

        {reviewsData && userReviews && userReviews.totalCount > 0 && <div className={s.searchBox}>
          <input placeholder={formatMessage(messages.searchReviews)} type="" className={cx(s.searchReviewInput, 'searchReviewInputRTL', 'textWhite')} onChange={(e) => debounce(this.handleSearchChange(e.target && e.target.value))} />
        </div>}
        <YourReviews data={reviewsData} loadMore={loadMore} current={current} searchKey={searchKey} isReviewLoading={isReviewLoading} />
      </div>
    );
  }
}

export default injectIntl(withStyles(s)(Reviews));
