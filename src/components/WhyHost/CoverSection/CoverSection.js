import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './CoverSection.css';
import { url } from '../../../config'


class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;
    const img = data && data.coverSectionImage1

    return (
      <div className={cx(s.bg, 'bgBlack')}>
        <Grid className={s.container}>
          <Row className={s.coveredsection}>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className={s.centerimgsection} style={{ backgroundImage: `url(/images/home/${data && data.coverSectionImage1})` }}>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className={s.paddingLeft}>
              <div className={cx(s.mainhedding, 'mainheddingRTLMobile')}>
                <h1>{data && data.coverSectionTitle1}</h1>
              </div>
              <p className={cx(s.common, 'textWhite')}>{data && data.coverSectionContent1}</p>
              <ul className={cx(s.coverul, 'coverulAr' , 'coverulDark')}>
                <li>{data && data.coverSectionFeature1}</li>
                <li>{data && data.coverSectionFeature2}</li>
                <li>{data && data.coverSectionFeature3}</li>
                <li>{data && data.coverSectionFeature4}</li>
                <li>{data && data.coverSectionFeature5}</li>
                <li>{data && data.coverSectionFeature6}</li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
