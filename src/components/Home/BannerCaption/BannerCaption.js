import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './BannerCaption.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import Loader from '../../Loader';
class BannerCaption extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getBanner: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
      }),
    }),
  };

  render() {
    const { title, content } = this.props;

    if (!title || !content) {
      return <Loader type={"text"} />
    } else {
      return (
        <Grid fluid>
            <div className={cx(s.bannerCaptionContainer)}>
              <h1 className={cx(s.noMargin, s.bannerCaptionText)}>
                <span className={s.bannerCaptionHighlight}>
                  {title}
                </span>
                {' '} {content}
              </h1>
            </div>
        </Grid>
      );
    }
  }
}

export default compose(
  withStyles(s),
)(BannerCaption);
