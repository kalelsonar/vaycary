import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import PastReviews from './PastReviews';
import WriteReviews from './WriteReviews';
import Link from '../Link';

import messages from '../../locale/messages';
import { debounce } from '../../helpers/debounce';

import arrowIcon from '/public/SiteIcons/replyArrow.svg';

import s from './Reviews.css';

class ReviewsByYou extends React.Component {

  static propTypes = {
    reviewsData: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.array,
      refetch: PropTypes.any
    }),
    pendingData: PropTypes.shape({
      loading: PropTypes.bool,
      pendingReviews: PropTypes.array
    }),
    loadMore: PropTypes.any.isRequired
  };

  static defaultProp = {
    reviewsData: {
      loading: true
    },
    pendingData: {
      loading: true
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 'others',
      searchKey: ''
    };

  }

  componentDidMount() {
    const { pendingData: { refetch } } = this.props;
    let variables = { offset: 0 };
    refetch(variables);
  }

  handleClick = (current) => {
    const { pendingData, reviewsData } = this.props
    let variables = current == 'others' ? { offset: 0 } : { ownerType: current, offset: 0 },
      refetchData = current == 'others' ? pendingData?.refetch : reviewsData?.refetch;
    this.setState({ current });
    refetchData(variables)
  }


  handleSearchChange = (searchKey) => {
    const { reviewsData: { refetch } } = this.props;
    let variables = {
      searchKey,
      current: this.state.current,
      type: 'me'
    };
    this.setState({ searchKey });
    refetch(variables);
  }

  render() {
    const { current, searchKey } = this.state;
    const { reviewsData, reviewsData: { userReviews }, pendingData, loadMore, loadMoreListing, isReviewLoading, isListLoading } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx('reviews', s.reviewPanel)}>
        <ul className={cx('list-inline', s.tabs)}>
          <li className={current === 'others' ? s.active : ''}>
            <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleClick('others')}>
              <FormattedMessage {...messages.reviewsToWrite} />
            </a>
          </li>
          <li className={current === 'me' ? s.active : ''}>
            <a className={cx(s.tabItem, 'textWhite')} onClick={() => this.handleClick('me')}>
              <FormattedMessage {...messages.writtenReviews} />
            </a>
          </li>
          <li className={cx(s.reviewEditProfile, 'reviewEditProfileRTL')}>
            <Link to={"/user/edit"}>
              <FormattedMessage {...messages.editProfile} />
              <img src={arrowIcon} className={cx(s.editProfileArrow, 'editProfileArrowRTL')} />
            </Link>
          </li>
        </ul>
        {current === 'me' && userReviews && userReviews.totalCount > 0 && <div className={s.searchBox}>
          <input placeholder={formatMessage(messages.searchReviews)} type="" className={cx(s.searchReviewInput, 'searchReviewInputRTL', 'textWhite')} onChange={(e) => debounce(this.handleSearchChange(e.target && e.target.value))} />
        </div>}

        {current === 'others' && <WriteReviews data={pendingData} loadMoreListing={loadMoreListing} isListLoading={isListLoading} />}
        {current === 'me' && <PastReviews data={reviewsData} loadMore={loadMore} searchKey={searchKey} isReviewLoading={isReviewLoading} />}

      </div>
    );
  }
}

export default injectIntl(withStyles(s)(ReviewsByYou));
