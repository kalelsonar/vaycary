import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Col,
  Image,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './QuoteSection.css';
import { url } from '../../../config'

// History
import history from '../../../core/history';

//image
import icon from '/public/SiteIcons/learnIcon.svg';

class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  handleClick() {
    history.push('/become-a-host?mode=new');
  }

  render() {
    const { refer, siteName, data } = this.props;
    const img1 = data && data.quoteSectionImage1
    const img2 = data && data.quoteSectionImage2

    return (
      <Grid className={s.container}>
            <div className={s.quotesection}>
              <div className={s.imagearea}>
                <Image src={url + '/images/home/' + img1} alt="image" responsive />
              </div>

              <div className={cx(s.contentarea, s.rightsidecontent, 'rightsidecontentRtl')}>
                <h2 className={s.quotesectionH2}>{data && data.quoteSectionTitle1}</h2>
                <h6 className={'textWhite'}>{data && data.quoteSectionContent1}</h6>
                <Button className={cx(s.btnlearn, 'textWhite')} onClick={this.handleClick}>
                {data && data.quoteSectionButton1}
                <span  className={cx(s.iconCss, 'svgImg', 'quoteArrowRTL')}><img src={icon} className={'hostArrowRTL'}/></span>
                </Button>
              </div>
            </div>
      
            <div className={s.quotesection}>
              <div className={cx(s.contentarea, s.leftsidecontent, 'leftsidecontentRtl', 'textWhite')}>
                <h2 className={s.quotesectionH2}>{data && data.quoteSectionTitle2}</h2>
                <h6 className={'textWhite'}>{data && data.quoteSectionContent2}</h6>
                <Button className={cx(s.btnlearn, 'textWhite')} onClick={this.handleClick}>
                {data && data.quoteSectionButton2}
                <span className={cx(s.iconCss, 'svgImg', 'quoteArrowRTL')}><img src={icon} className={'hostArrowRTL'}/></span>
                </Button>
              </div>
              <div className={s.imagearea}>
                <Image src={url + '/images/home/' + img2} alt="image" responsive />
              </div>
            </div>
      </Grid>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName

});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(SocialLogin));
