import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './PaymentContent.css';

import Swiper from 'react-id-swiper';
import { isRTL } from '../../../helpers/formatLocale';

//image 
import icon from '/public/SiteIcons/double-quotes.png';
import nextIcon from '/public/SiteIcons/popular-right.png';
import prevIcon from '/public/SiteIcons/popular-left.png';
import defaultPic from '/public/SiteImages/defaultPic.png';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={nextIcon} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      onClick={onClick}
    >
      <img src={prevIcon} />
    </div>
  );
}
class SocialLogin extends Component {

  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.state = {
      showArrow: false,
      load: false,
    }
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
  }

  componentDidMount() {
    const { reviewData } = this.props;
    const isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 768px)').matches : true;
    let showArrow = false;
    if (smallDevice) {
      showArrow = reviewData && reviewData.length > 1 ? true : false
    } else {
      showArrow = reviewData && reviewData.length > 3 ? true : false
    }
    this.setState({
      showArrow,
      load: true
    })
  }

  componentDidUpdate(prevProps) {
    const { locale } = this.props.intl;
    const { locale: prevLocale } = prevProps.intl;
    if (locale !== prevLocale) {
      this.setState({
        load: false
      });
      clearTimeout(this.loadSync);
      this.loadSync = null;
      this.loadSync = setTimeout(() => {
        this.setState({
          load: true
        });
      }, 3000);
    }
  }

  goNext() {
    if (!this.swiper) return;
    this.swiper.slideNext();
  }

  goPrev() {
    if (!this.swiper) return;
    this.swiper.slidePrev();
  }

  render() {
    const { data, reviewData, intl: { locale } } = this.props;
    const { arrow } = this.props;
    const { load } = this.state;

    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this;

    const params = {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      breakpoints: {
        768: {
          slidesPerView: 'auto',
        },
        767: {
          slidesPerView: 1,
        }
      }
    };

    return (
      <div className={s.container}>
        <div className={cx(s.mainhedding, 'mainheddingRTLMobile', 'whyHostSlider', 'whyHostSliderRTL')}>
          <h1>{data && data.paymentTitleHeading}</h1>
        </div>
        {load && <div>
          <Swiper {...params} rtl={isRTL(locale)} ref={node => th.swiper = node !== null ? node.swiper : null}>
            {reviewData.map((review) => {
              let image = review.image ? `/images/home/${review.image}` : defaultPic;
              return (
                <div className={cx(s.outline)}>
                  <div className={'svgImg'}>
                  <img src={icon} className={s.iconCss} />
                  </div>
                  <div className={cx(s.content, 'textWhite')}>{review.reviewContent}</div>
                  <div className={s.flex}>
                    <span>
                      <img src={image} className={s.imgCss} />
                    </span>
                    <span className={cx(s.name, 'reviewNameRTL')}>{review.userName}</span>
                  </div>
                </div>
              );
            })
            }
          </Swiper>
          {
            arrow == true && this.state.showArrow &&
            <div className={s.arrowCenter}>
              <SamplePrevArrow
                className={cx(s.displayInline, 'hostArrowRTL')}
                onClick={this.goPrev}
              />
              <SampleNextArrow
                className={cx(s.displayInline, 'hostArrowRTL')}
                onClick={this.goNext}
              />
            </div>
          }
        </div>}
      </div>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName

});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SocialLogin)));
