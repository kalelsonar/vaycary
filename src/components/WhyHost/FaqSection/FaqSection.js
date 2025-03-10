import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { FormattedMessage, injectIntl } from 'react-intl';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './FaqSection.css';

// Locale
import messages from '../../../locale/messages';
import Faq from '/public/SiteIcons/Down_Arrow_3_@2x.png'


class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };


  render() {
    const { refer, siteName, data } = this.props;


    return (
      <Grid className={cx("faq-Collaps", s.container)}>
        <Row className={s.faqsection}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className={cx(s.mainhedding, 'mainheddingRTLMobile')}>
              <h1><FormattedMessage {...messages.faqtitle} /></h1>

              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.faqcolumn, 'faqcolumnRTL')}>

                {data && data.faqTitle1 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle1}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent1}
                  </p>
                </Collapsible>}

                {data && data.faqTitle3 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle3}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent3}
                  </p>
                </Collapsible>}

                {data && data.faqTitle5 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle5}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent5}
                  </p>
                </Collapsible>}

                {data && data.faqTitle7 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle7}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent7}
                  </p>
                </Collapsible>}

              </Col>

              <Col xs={12} sm={6} md={6} lg={6} className={cx(s.faqcolumn, 'faqcolumnRTL')}>

                {data && data.faqTitle2 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle2}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent2}
                  </p>
                </Collapsible>}

                {data && data.faqTitle4 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle4}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent4}
                  </p>
                </Collapsible>}

                {data && data.faqTitle6 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle6}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent6}
                  </p>
                </Collapsible>}

                {data && data.faqTitle8 && <Collapsible triggerOpenedClassName={"becomeHostFaqBox becomeHostFaqBoxOpen svgImg"} triggerClassName={"becomeHostFaqBox svgImg"} transitionTime="200" trigger={
                  <>
                    <span>{data && data.faqTitle8}</span>
                    <img src={Faq} className={cx(s.faqImage, 'faqRtl')} />
                  </>
                }>
                  <p>
                    {data && data.faqContent8}
                  </p>
                </Collapsible>}

              </Col>
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

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SocialLogin)));
