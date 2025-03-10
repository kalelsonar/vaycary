import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './HostingBlock.css';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  render() {
    const { refer, siteName, data } = this.props;

    return (

      <Grid className={cx(s.container, s.hostingsection)}>
        <div className={cx(s.mainhedding, 'mainheddingRTLMobile')}>
          <h3>{data && data.hostingBlockTitleHeading}</h3>
        </div>
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <div className={cx(s.steps, 'svgImg')}>
              {
                data && data.hostingBlockImage1 && <img src={`/images/home/${data.hostingBlockImage1}`}
                  className={s.bannerImageBg}
                />
              }
              <h4 className={s.common}>{data && data.hostingBlockTitle1}</h4>
              <p className={cx(s.common, 'textWhite')}>{data && data.hostingBlockContent1}</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <div className={cx(s.steps, 'svgImg')}>
              {
                data && data.hostingBlockImage2 && <img src={`/images/home/${data.hostingBlockImage2}`}
                  className={s.bannerImageBg}
                />
              }
              <h4 className={s.common}>{data && data.hostingBlockTitle2}</h4>
              <p className={cx(s.common, 'textWhite')}>{data && data.hostingBlockContent2}</p>
            </div>
          </Col>
          <Col xs={12} sm={12} md={4} lg={4}>
            <div className={cx(s.steps, 'svgImg')}>
              {
                data && data.hostingBlockImage3 && <img src={`/images/home/${data.hostingBlockImage3}`}
                  className={s.bannerImageBg}
                />
              }
              <h4 className={s.common}>{data && data.hostingBlockTitle3}</h4>
              <p className={cx(s.common, 'textWhite')}>{data && data.hostingBlockContent3} </p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
