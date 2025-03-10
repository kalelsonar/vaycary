import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ReviewItem from './ReviewItem';
import ReviewItemAboutYou from './ReviewItemAboutYou';
import Loader from '../Loader';

import messages from '../../locale/messages';

import noListImage from '/public/SiteImages/noReviewImage.svg';

import s from './Reviews.css';
import bt from '../../components/commonStyle.css';

class YourReviews extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      userReviews: PropTypes.arrayOf(PropTypes.shape({
        reservationId: PropTypes.number.isRequired,
        listId: PropTypes.number.isRequired,
        authorId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        yourReviewsCount: PropTypes.number.isRequired,
        authorData: PropTypes.shape({
          firstName: PropTypes.string.isRequired,
          lastName: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          profileId: PropTypes.number.isRequired,
        }),
        reviewContent: PropTypes.string.isRequired,
        parentId: PropTypes.number.isRequired,
        createdAt: PropTypes.string.isRequired,
        isAdmin: PropTypes.bool,
        response: PropTypes.shape({
          reservationId: PropTypes.number.isRequired,
          listId: PropTypes.number.isRequired,
          authorId: PropTypes.string.isRequired,
          userId: PropTypes.string.isRequired,
          authorData: PropTypes.shape({
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            picture: PropTypes.string.isRequired,
            profileId: PropTypes.number.isRequired,
          }),
          reviewContent: PropTypes.string.isRequired,
          parentId: PropTypes.number.isRequired,
          createdAt: PropTypes.string.isRequired,
          isAdmin: PropTypes.bool,
          formatMessage: PropTypes.any,
        })
      }))
    }),
    loadMore: PropTypes.any.isRequired
  };

  render() {
    const { data: { loading, userReviews }, loadMore, current, searchKey, isReviewLoading } = this.props;
    let showLoadMore = userReviews?.results?.length > 0 ? true : false;

    return (
      <div>
        {
          loading && <Loader type={"text"} />
        }
        {
          !loading && (!userReviews || userReviews?.results?.length === 0) && <div className={cx(s.textCenter, s.marginTop)}>
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
          !loading && userReviews?.results?.length > 0 &&
          <div className={cx(s.panelNolist, s.spaceTop20, s.panelNolistBottom, 'bgBlack')} >
            <ul
              className={cx(s.listStyle, s.recommondations, 'listLayoutArbic')}>
              {
                userReviews?.results?.map((item, index) => {
                  if (current == 'notResponded') {
                    showLoadMore = userReviews?.count === userReviews?.results?.length && false;
                    return <ReviewItem
                      key={index}
                      reviewContent={item?.reviewContent}
                      createdAt={item?.createdAt}
                      isAdmin={item?.isAdmin}
                      picture={item?.authorData?.picture}
                      firstName={item?.authorData?.firstName}
                      lastName={item?.authorData?.lastName}
                      profileId={item?.authorData?.profileId}
                      rating={item?.rating}
                      listData={item?.listData}
                      listTitle={item?.singleReservationData?.listTitle}
                      current={current}
                      reservationId={item?.reservationId}
                    />
                  } else if (current == 'responded') {
                    showLoadMore = userReviews?.count === userReviews?.results?.length && false;
                    return <ReviewItemAboutYou
                      key={index}
                      reviewContent={item?.reviewContent}
                      createdAt={item?.createdAt}
                      response={item?.response}
                      isAdmin={item?.isAdmin}
                      picture={item?.authorData?.picture}
                      firstName={item?.authorData?.firstName}
                      lastName={item?.authorData?.lastName}
                      profileId={item?.authorData?.profileId}
                      rating={item?.rating}
                      listData={item?.listData}
                      listTitle={item?.singleReservationData?.listTitle}
                      showReviewName={true}
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
              !loading && showLoadMore && userReviews?.results?.length > 0 && <div className={cx(s.space2, s.textCenter, s.marginTop)}>
                <Button className={cx(s.btn, bt.btnPrimary, s.loadMoreBtn)} onClick={() => loadMore('others', current, searchKey)} disabled={isReviewLoading}>
                  <FormattedMessage {...messages.loadMore} />...</Button>
              </div>
            }
          </Col>
        </Row>
      </div>

    );
  }
}

export default injectIntl(withStyles(s, bt)(YourReviews));