import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Swiper from 'react-id-swiper';

import { injectIntl } from 'react-intl';

import { isRTL } from '../../../helpers/formatLocale';
import { formatURL } from '../../../helpers/formatURL';
import { COMMON_TEXT_COLOR } from '../../../constants';

import s from './ListingSwiperPhotos.css';

const nextArrowStyle = {
    right: '5px',
    color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
    fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#00000000",endColorstr="#80000000",GradientType=1)',
    borderRadius: '50%', position: 'absolute'
};

const prevArrowStyle = {
    left: '5px',
    color: COMMON_TEXT_COLOR, zIndex: '1', width: '34px', height: '34px', top: '50%',
    fontSize: '18px', cursor: 'pointer', textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.9)', backgroundRepeat: 'repeat-x',
    filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#80000000",endColorstr="#00000000",GradientType=1)',
    borderRadius: '50%', position: 'absolute'
};

function SampleNextArrow(props) {
    const { className, onClick } = props
    return (
        <div
            className={className}
            style={nextArrowStyle}
            onClick={onClick}
        >
            <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
                style={{ height: '13px', width: '13px', display: 'block', fill: '#282828', position: 'absolute', top: '31%', right: '10px' }}>
                <path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"></path>
            </svg>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props
    return (
        <div
            className={className}
            style={prevArrowStyle}
            onClick={onClick}
        >
            <svg viewBox="0 0 18 18" role="img" aria-label="Previous" focusable="false"
                style={{ height: '13px', width: '13px', display: 'block', fill: '#282828', position: 'absolute', top: '31%', left: '10px' }}>
                <path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z"></path>
            </svg>
        </div>
    );
}
class ListingSwiperPhotos extends React.Component {

    static propTypes = {
        id: PropTypes.number,
        listPhotos: PropTypes.array,
        coverPhoto: PropTypes.number,
        size: PropTypes.string,
    };

    static defaultProps = {
        listPhotos: [],
        coverPhoto: 0,
        size: 'x_medium_'
    };

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            listingPhotos: [],
        };
        this.swiper = null;
    }

    componentDidMount() {
        const { listPhotos } = this.props;
        this.setState({ listingPhotos: listPhotos })
        setTimeout(() => { this.setState({ loaded: true }) }, 1)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { isMapShow, listPhotos } = nextProps;
        const { locale } = this.props.intl;
        const { locale: prevLocale } = nextProps.intl;
        this.setState({ listingPhotos: listPhotos });
        if (locale !== prevLocale && !isMapShow) {
            this.setState({
                loaded: false
            }, () => {
                setTimeout(() => {
                    this.setState({
                        loaded: true
                    })
                }, 1);
            });
        }
    }

    goNext = () => {
        this.swiper.slideNext();
    }

    goPrev = () => {
        this.swiper.slidePrev();
    }

    render() {
        const { id, size, title, intl: { locale }, personalizedURL, updatedLocale } = this.props;
        const { loaded, listingPhotos } = this.state;
        let imagepath = '/images/upload/' + size, pagination;
        if (listingPhotos && listingPhotos.length > 1) {
            pagination = {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            };
        } else {
            pagination = {};
        }

        const params = {
            loop: listingPhotos && listingPhotos.length > 1 ? true : false,
            lazy: true,
            pagination,
        };

        return (
            <div className={cx(s.listPhotoContainer, 'searchSwiper')}>
                {
                    !updatedLocale && loaded && listingPhotos?.length > 0 ?
                        <Swiper {...params} ref={node => this.swiper = node !== null ? node.swiper : null} rtl={isRTL(locale)}>
                            {
                                listingPhotos.map((item, itemIndex) => {
                                    let listingURL = personalizedURL ? "/rooms/" + formatURL(title) + '-' + id + personalizedURL : "/rooms/" + formatURL(title) + '-' + id;
                                    return (
                                        <div className={cx(s.sliderItem)} key={itemIndex}>
                                            <a href={listingURL} target={"_blank"}>
                                                <div className={s.parent}>
                                                    <div className={cx(s.imageContent, 'listingDarkModeBg')}
                                                        style={{ backgroundImage: 'url(' + imagepath + item.name + ')' }}></div>
                                                </div>
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </Swiper> :
                        <div className={cx('col-md-12 col-sm-12 col-xs-12', s.sliderItem)}>
                            <div className={s.parent}>
                                <div class={cx(s.imageContent, "swiper-lazy")}>
                                    <div class="swiper-lazy-preloader" />
                                </div>
                                <div className="swiper-lazy-loaded swiper-lazy-preloader-white" />
                            </div>
                        </div>
                }

                {
                    !updatedLocale && loaded && listingPhotos?.length > 1 && <div className={'searchArrow'}>
                        <SamplePrevArrow className={cx('searchArrowPrev')} onClick={this.goPrev} />
                        <SampleNextArrow className={cx('searchArrowNext')} onClick={this.goNext} />
                    </div>
                }
            </div>
        );
    }
}
export default injectIntl(withStyles(s)(ListingSwiperPhotos));