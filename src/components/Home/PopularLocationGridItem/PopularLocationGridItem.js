import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PopularLocationGridItem.css';
import { Col } from 'react-bootstrap';
import cx from 'classnames';
import { injectIntl } from 'react-intl';

// Component
import Link from '../../Link';

class PopularLocationGridItem extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
    id: PropTypes.number,
    location: PropTypes.string,
    locationAddress: PropTypes.string,
    image: PropTypes.string,
  };

  render() {
    const { location, locationAddress, path } = this.props;

    return (
      <Col lg={12} md={12} sm={12} xs={12}>
        <Link className={s.GridColZoom} to={'/s?&address=' + locationAddress + '&chosen=1'}>
          <div className={cx(s.GridWrap)} style={{ backgroundImage: `url(${path})` }}></div>
          <div className={cx(s.placeWrap, 'textWhite')}>{location}</div>
        </Link>
      </Col>
    );
  }
}

export default injectIntl(withStyles(s)(PopularLocationGridItem));
