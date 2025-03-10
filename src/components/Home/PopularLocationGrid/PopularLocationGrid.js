import React from 'react';
import PropTypes from 'prop-types';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import cx from 'classnames';
import { injectIntl, FormattedMessage } from 'react-intl';
import Swiper from 'react-id-swiper';

import Loader from '../../Loader/Loader';
import PopularLocationGridItem from '../PopularLocationGridItem';

import messages from '../../../locale/messages';
import { isRTL } from '../../../helpers/formatLocale';
import { photosShow } from '../../../helpers/photosShow';
import { locationuploadDir } from '../../../config';

import nextIcon from '/public/SiteIcons/popular-right.png';
import prevIcon from '/public/SiteIcons/popular-left.png';

import s from './PopularLocationGrid.css';

const nextArrowStyle = {
  position: 'absolute',
  right: '-10px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '47%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

const prevArrowStyle = {
  position: 'absolute',
  left: '-11px',
  background: 'transparent',
  color: '#00B0CD',
  zIndex: '5',
  width: 'auto',
  height: 'auto',
  top: '47%',
  fontSize: '40px',
  cursor: 'pointer',
  borderRadius: '50%',
  textAlign: 'center',
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={nextArrowStyle}
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
      style={prevArrowStyle}
      onClick={onClick}
    >
      <img src={prevIcon} />
    </div>
  );
}

class PopularLocationGrid extends React.Component {

  static propTypes = {
    loading: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.swiper = null;
    this.state = {
      isClient: false,
      load: true,
      isBeginning: true,
      isEnd: false,
      showArrow: false
    };
  }

  static defaultProps = {
    data: [],
    arrow: true
  }

  componentDidMount() {
    const { data } = this.props;
    const isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : false;
    let showArrow = false;
    if (smallDevice) {
      showArrow = data && data.length > 1 ? true : false
    } else {
      showArrow = data && data.length > 4 ? true : false
    }
    this.setState({
      load: true,
      isClient: true,
      showArrow
    });
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
        })
        this.progress()
      }, 1);
    }
  }


  goNext = () => {
    this.swiper.slideNext();
    this.progress();
  }

  goPrev = () => {
    this.swiper.slidePrev();
    this.progress();
  }

  progress = () => {
    this.setState({ isEnd: this.swiper.isEnd, isBeginning: this.swiper.isBeginning });
  }

  render() {
    const { load, isClient, showArrow } = this.state;
    const { data, arrow } = this.props;
    const { intl: { locale } } = this.props;
    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this;

    const params = {
      slidesPerView: 4,
      breakpoints: {
        991: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 1,
        }
      }
    };

    if (showArrow === true) {
      params.loop = true
    }

    let path = photosShow(locationuploadDir);

    return (
      <Grid fluid>
        <Row className={cx(s.GridCollapse, 'GridCollapseAr')}>
          {
            !load && !isClient && <div>
              <Loader type="text" />
            </div>
          }
          {
            load && isClient && data && data.length > 0 && <h3 className={cx(s.containerTitle, s.marginLeft, s.noLeftPadding, 'textWhite')}>
              <FormattedMessage {...messages.popularLocation} />
            </h3>
          }
          {
            load && isClient && <Swiper {...params} rtl={isRTL(locale)} className={cx('row homeSlickSlider', s.noMargin)} ref={node => th.swiper = node !== null ? node.swiper : null}>
              {
                data && data?.length > 0 && data?.map((item, index) => {
                  if (item.isEnable == 'true') {
                    let pathUrl = path + item?.image;
                    return <div key={index}><PopularLocationGridItem id={item?.id} location={item?.location} image={item?.image} locationAddress={item?.locationAddress} key={index} path={pathUrl} /></div>
                  }
                })
              }
            </Swiper>
          }
          {
            arrow == true && load && isClient && showArrow && <div>
              <SamplePrevArrow
                className={cx(s.displayNone, 'arrowPrevRTL', 'popularPrev')}
                onClick={this.goPrev}
              />
              <SampleNextArrow
                className={cx(s.displayNone, 'arrowNextRTL', 'popularNext')}
                onClick={this.goNext}
              />
            </div>
          }
        </Row>
      </Grid>
    );

  }
}

export default compose(
  injectIntl,
  withStyles(s),
)(PopularLocationGrid);
