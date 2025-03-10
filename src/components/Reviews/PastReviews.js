import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ReviewItemAboutYou from './ReviewItemAboutYou';
import Loader from '../Loader';

import messages from '../../locale/messages';

import noListImage from '/public/SiteImages/noReviewImage.svg';

import s from './Reviews.css';
import bt from '../../components/commonStyle.css';

class PastReviews extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      formatMessage: PropTypes.any,
      userReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number,
        listId: PropTypes.number,
        authorId: PropTypes.string,
        userId: PropTypes.string,
        reviewsCount: PropTypes.number,
        authorData: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string,
          picture: PropTypes.string,
          profileId: PropTypes.number,
        }),
        reviewContent: PropTypes.string,
        parentId: PropTypes.number,
        createdAt: PropTypes.string,
        response: PropTypes.shape({
          reservationId: PropTypes.number,
          listId: PropTypes.number,
          authorId: PropTypes.string,
          userId: PropTypes.string,
          authorData: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            picture: PropTypes.string,
            profileId: PropTypes.number,
          }),
          reviewContent: PropTypes.string,
          parentId: PropTypes.number,
          createdAt: PropTypes.string,
        })
      }))
    }),
  };

  render() {
    const { data: { loading, userReviews }, loadMore, searchKey, isReviewLoading } = this.props;
    const { formatMessage } = this.props.intl;
    var showLoadMore = false;
    if (userReviews && userReviews.results && userReviews.results.length > 0) {
      showLoadMore = true;
    }

    return (
      <>

        {
          loading && <Loader type={"text"} />
        }
        {
          !loading && (userReviews === null || userReviews && userReviews.results && userReviews.results.length === 0) &&
          <div className={cx(s.textCenter, s.marginTop)}>
            <img src={noListImage} ClassName={s.mobWidth} />
            <div className={s.noListHeading}>
              <FormattedMessage {...messages.noReviewHeading} />
            </div>
            <div className={cx(s.noListSubHeading, 'textWhite')}>
              <FormattedMessage {...messages.noReviewSubHeding} />
            </div>
          </div>
        }
        {
          !loading && userReviews && userReviews.results && userReviews.results.length > 0 &&
          <div className={cx(s.panelNolist, s.spaceTop6, 'bgBlack')}>
            <ul className={cx(s.listStyle, s.recommondations, s.pastReviewBottom)}>
              {
                userReviews.results.map((item, index) => {
                  if (userReviews.count === userReviews.results.length) {
                    showLoadMore = false;
                  }
                  if (item && item.authorData && item.userData) {
                    return <ReviewItemAboutYou
                      key={index}
                      picture={item.authorData.picture}
                      firstName={item.authorData.firstName}
                      lastName={item.authorData.lastName}
                      otherUserName={item.userData.firstName}
                      otherUserProfileId={item.userData.profileId}
                      profileId={item.authorData.profileId}
                      reviewContent={item.reviewContent}
                      createdAt={item.createdAt}
                      response={item.response}
                      listData={item.listData}
                      listTitle={item.singleReservationData.listTitle}
                      otherUserResponse
                      showUserName
                      rating={item.rating}
                    />
                  }
                })
              }
            </ul>
          </div>
        }
        <Row>
          <Col lg={12} md={12} sm={12} xs={12} className={s.spaceBottom20}>
            {
              !loading && showLoadMore && <div className={cx(s.space2, s.textCenter, s.marginTop)}>
                <Button className={cx(s.btn, bt.btnPrimary, s.loadMoreBtn)} onClick={() => loadMore('me', null, searchKey)} disabled={isReviewLoading}>
                  <FormattedMessage {...messages.loadMore} />...
                </Button>
              </div>
            }
          </Col>
        </Row>

      </>
    );
  }
}

export default injectIntl(withStyles(s, bt)(PastReviews));