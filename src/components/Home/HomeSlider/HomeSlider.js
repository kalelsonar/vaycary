import React from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { injectIntl, FormattedMessage } from 'react-intl';

// Component
import SeeAll from '../../Home/SeeAll';
import CommonListingItems from '../../Common/ImageUploadComponent/CommonListingItems/CommonListingItems';

// Helper.
import { isRTL } from '../../../helpers/formatLocale';
import messages from '../../../locale/messages';
import HomeSliderSkleton from '../../Skeleton/HomeSliderSkleton';

// Style.
import s from './HomeSlider.css';

class HomeSlider extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      listPhotos: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string
      })),
      coverPhoto: PropTypes.number,
      listingData: PropTypes.shape({
        basePrice: PropTypes.number,
        currency: PropTypes.string,
      }),
      settingsData: PropTypes.arrayOf(PropTypes.shape({
        listsettings: PropTypes.shape({
          itemName: PropTypes.string,
        }),
      })),
      id: PropTypes.number,
      beds: PropTypes.number,
      title: PropTypes.string,
      bookingType: PropTypes.string,
      reviewsCount: PropTypes.number,
      reviewsStarRating: PropTypes.number
    }))
  };

  static defaultProps = {
    data: [],
    arrow: true
  }

  constructor(props) {
    super(props);
    this.swiper = null;
    this.goNext = this.goNext.bind(this);
    this.goPrev = this.goPrev.bind(this);
    this.progress = this.progress.bind(this);
    this.state = {
      isBeginning: true,
      isEnd: false,
      load: false,
      isClient: false,
      showArrow: false
    };
  }

  componentDidMount() {
    const { data, fromPage } = this.props;
    const isBrowser = typeof window !== 'undefined';
    let smallDevice = isBrowser ? window.matchMedia('(max-width: 640px)').matches : true;
    let showArrow = false;
    if (smallDevice) {
      showArrow = data && data.length > 1 ? true : false
    } else {
      if (fromPage) showArrow = data && data.length > 2 ? true : false
      else showArrow = data && data.length > 4 ? true : false
    }
    this.setState({ showArrow })

    this.setState({
      isClient: true,
      load: true
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
      }, 3000);
    }
  }
  goNext() {
    this.swiper.slideNext();
  }

  goPrev() {
    this.swiper.slidePrev();
  }
  progress() {
    if (!this.swiper) return;
    if (this.swiper.isEnd) this.setState({ isEnd: true });
    else if (this.swiper.isBeginning) this.setState({ isBeginning: true });
    else this.setState({ isEnd: false, isBeginning: false });
  }

  render() {
    const { arrow, intl: { locale }, isRecommand, data, hideHeading, fromPage, isViewListing, viewListingSimilarItem } = this.props;
    const { load, isClient, showArrow } = this.state;
    let arrow_display = this.props.arrow;
    arrow_display = false;
    let th = this;

    const params = {
      slidesPerView: fromPage == 'viewProfile' ? 2 : 4,
      spaceBetween: 15,
      breakpoints: {
        991: {
          slidesPerView: 3,
        },
        767: {
          slidesPerView: 1,
        }
      }
    };

    if (showArrow)
      params['navigation'] = {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      };

    return (
      <Grid fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={cx("noPadding", 'homeSliderPaading', 'homeSwiper', s.marginTop, viewListingSimilarItem)}>
            {
              !load && !hideHeading && <div>
                <h3 className={cx(s.containerTitle, 'textWhite')}>
                  {isRecommand ? <FormattedMessage {...messages.recommended} /> : <FormattedMessage {...messages.mostViewed} />}
                </h3>
                {[1, 2, 3, 4].map((n) => <Col xs={12} sm={6} md={3} lg={3} key={n}>
                  <HomeSliderSkleton key={n} />
                </Col>
                )}
              </div>
            }
            {
              data && data.length > 0 && load && !hideHeading && isClient && <h3 className={cx(s.containerTitle, 'textWhite', s.floatLeft, 'floatRight')}>
                {isRecommand ? <FormattedMessage {...messages.recommended} /> : <FormattedMessage {...messages.mostViewed} />}
              </h3>
            }
            {
              load && isClient && data && data.length > 0 && !hideHeading && <SeeAll className={s.floatRight} />
            }
            <div className='clearBoth'></div>
            {
              load && isClient && <Swiper {...params} rtl={isRTL(locale)} className={cx('row homeSlickSlider', s.noMargin)} ref={node => th.swiper = node !== null ? node.swiper : null}>
                {
                  data && data.length > 0 && data.map((item, key) => {
                    if (item.listPhotos.length > 0) {
                      return (
                        <div
                          key={key}
                        >
                          <div className='swiperSliderMobielWidth'>
                            <CommonListingItems
                              key={key}
                              id={item.id}
                              title={item.title}
                              basePrice={item.listingData.basePrice}
                              roomType={item?.settingsData[0]?.listsettings?.itemName}
                              coverPhoto={item.coverPhoto}
                              listPhotos={item.listPhotos}
                              wishListStatus={item.wishListStatus}
                              isViewListing={isViewListing}
                              currency={item.listingData.currency}
                              bookingType={item.bookingType}
                              reviewsCount={item.reviewsCount}
                              reviewsStarRating={item.reviewsStarRating}
                              beds={item.beds}
                              userId={item?.user?.id}
                            />
                          </div>
                        </div>
                      )
                    }
                  })
                }
              </Swiper>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
};

export default compose(
  injectIntl,
  withStyles(s),
)(HomeSlider);
