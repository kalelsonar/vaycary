import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NewsBox.css';
import bt from '../../../components/commonStyle.css';
import {
  Grid
} from 'react-bootstrap';
import Link from '../../Link';

class NewsBox extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      buttonLabel: PropTypes.string,
      image: PropTypes.string,
    }),
  };

  render() {
    const { data: { title, buttonLabel, image, description } } = this.props;
    let path = '/images/banner/';

    return (
      <Grid fluid>
        <div
          className={s.bg}
          style={{
            backgroundImage: `url(${`${path}${image}`})`,
          }}
        >
          <div className={s.innerWidth}>
            <h3 className={s.title}><span className={s.siteColor}>{title}</span> {description}</h3>
            <Link
              to={"/whyhost"}
              className={cx(s.btn, bt.btnPrimary)}
            >
              {buttonLabel}
            </Link>
          </div>
        </div>
      </Grid>
    );
  }
}

export default compose(
  withStyles(s, bt),
)(NewsBox);
