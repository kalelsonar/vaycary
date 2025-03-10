import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import {
  Row, FormGroup,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Rating.css';
import bt from '../../../components/commonStyle.css';

// Component
import ListingDetails from './ListingDetails';
import Link from '../../Link';

// Locale
import messages from '../../../locale/messages';

class RatingConfirmation extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      reviewsCount: PropTypes.number.isRequired,
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      coverPhoto: PropTypes.number,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number,
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
      }))
    }),
    formatMessage: PropTypes.any,
  };

  render() {
    const { data } = this.props;
    return (
      <Row className={s.landingContainer}>
        <Col xs={12} sm={6} md={6} lg={6} className={s.space5}>
          <h3 className={cx(s.textBold, s.landingContentTitle, 'textWhite')}><FormattedMessage {...messages.reviewTitle} /></h3>
          <p className={cx(s.reviewEndText, 'textWhite')}>
            <FormattedMessage {...messages.reviewTitle2} />
          </p>
          <Link
            className={cx(s.button, bt.btnPrimary, bt.btnLarge, s.btn)}
            to={"/user/reviews/about-you"}
          >
            <FormattedMessage {...messages.finish} />
          </Link>
        </Col>
        <Col xs={12} sm={6} md={6} lg={6} className={s.space5}>
          <ListingDetails data={data} />
        </Col>
      </Row>
    );
  }
}


export default injectIntl(withStyles(s, bt)(RatingConfirmation));
