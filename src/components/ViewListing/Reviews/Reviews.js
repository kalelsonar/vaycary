import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedMessage, injectIntl } from 'react-intl';
// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Reviews.css';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import bt from '../../../components/commonStyle.css';
// Components
import StarRating from '../../StarRating';
import Avatar from '../../Avatar';
import Loader from '../../Loader';

// Locale
import messages from '../../../locale/messages';

class Reviews extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    listId: PropTypes.number.isRequired,
    reviewsCount: PropTypes.number.isRequired,
    reviewsStarRating: PropTypes.number.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      moreListReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
      })),
    })
  };

  static defaultProps = {
    loading: true
  };

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(ownerType) {
    const { data: { moreListReviews, fetchMore }, listId } = this.props;
    fetchMore({
      //query: UserReviewsQuery,
      variables: {
        listId,
        offset: moreListReviews.length,
        loadCount: 5,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return previousResult; }

        return {
          moreListReviews: [...previousResult.moreListReviews, ...fetchMoreResult.moreListReviews],
        };
      },
    });
  }

  render() {
    const { data: { loading, moreListReviews } } = this.props;
    const { reviewsCount, reviewsStarRating } = this.props;
    const { siteName } = this.props;
    const { formatMessage } = this.props.intl;
    let starRatingValue = 0, showLoadMore = true;
    if (reviewsCount > 0 && reviewsStarRating > 0) {
      starRatingValue = Math.round(reviewsStarRating / reviewsCount)
    }

    if (moreListReviews && reviewsCount === moreListReviews.length) {
      showLoadMore = false;
    }

    if (loading) {
      return <Loader type={"text"} />
    }

    if (reviewsCount === 0) {
      return (
        <div>
          <div className={cx(s.pageContent)}>
            <div className={cx(s.spaceTop4)}>
              <h2 className={cx(s.sectionTitleText)}><FormattedMessage {...messages.noReviewTitle} /></h2>
              <p className={s.textMuted}><FormattedMessage {...messages.noReviewInfo} /></p>
            </div>
          </div>
          <div className={s.listingLine}></div>
        </div>
      );
    }

    return (
      <div>
        <div className={cx(s.pageContent, s.borderMarginTop)}>
            <h2 className={cx(s.sectionTitleText)}>
              <span className={s.textLeft}>{reviewsCount} {reviewsCount > 1 ? formatMessage(messages.reviews) : formatMessage(messages.review)}</span>
              <span> <StarRating value={starRatingValue} className={cx(s.starReview, 'reviewSectionRTL')} /> </span>
            </h2>
            {
              !loading && moreListReviews && moreListReviews.map((item, index) => {
                let date = moment(item.createdAt).format('MMMM YYYY');
                return (
                  <div className={cx(s.horizontalLineThrough)} key={index}>
                    {
                      !item.isAdmin && item.authorData && <div className={s.reviewContainer}>
                        <div className={cx(s.alignMiddle)}>
                          <div className={cx(s.pullLeft, s.mediaContainer, s.textCenter)} >
                            <Avatar
                              source={item.authorData.picture}
                              height={48}
                              width={48}
                              title={item.authorData.firstName}
                              className={s.profileAvatar}
                              withLink
                              linkClassName={cx(s.profileAvatarLink, s.noBackground)}
                              profileId={item.authorData.profileId}
                            />
                          </div>
                        </div>
                        <div className={s.alignMiddle}>
                          <div className={s.infoAlign}>
                            <div className={s.textBold}>{item.authorData.firstName}</div>
                            <div className={cx(s.dateCss, 'textWhite')}>{date}</div>
                          </div>
                        </div>
                      </div>
                    }
                    {
                      item.isAdmin && <div className={s.reviewContainer}>
                        <div className={cx(s.alignMiddle)}>
                          <div className={cx(s.pullLeft, s.mediaContainer, s.textCenter)} >
                            <Avatar
                              source={'../../../../adminAvatar.png'}
                              height={54}
                              width={54}
                              title={formatMessage(messages.verifiedBy) + ' ' + siteName}
                              className={cx(s.profileAvatar, s.noBackground)}
                              linkClassName={s.profileAvatarLink}
                              staticImage
                            />
                          </div>
                        </div>
                        <div className={s.alignMiddle}>
                          <div className={cx(s.infoAlign, 'infoAlignRTL')}>
                            <span className={s.textBold}>{formatMessage(messages.verifiedBy) + ' ' + siteName}</span><br />
                            <span>{date}</span>
                          </div>
                        </div>
                      </div>
                    }
                    <div className='clearBoth'> </div>
                    <div className={s.commentSection}>
                      {
                        item.reviewContent && (item.reviewContent.trim()).split("\n").map(function (content, index) {
                          return (
                            <span key={index}>
                              {content}
                              <br />
                            </span>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            {
              showLoadMore && <div className={cx(s.space2)}>
                <a className={cx(bt.btnSecondary, s.borderRadius)} onClick={() => this.loadMore()}>
                  <FormattedMessage {...messages.showAllReviews} />
                </a>
              </div>
            }

          </div>
        <div className={s.listingLine}></div>
      </div>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Reviews)));
