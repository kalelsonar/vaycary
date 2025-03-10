import React from 'react';
import Slider from 'react-slick';
import { Image } from 'react-bootstrap';
import cx from 'classnames';
import { flowRight as compose } from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HomeBanner.css'

const HomeSlider = ({ homeBannerImages }) => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 2500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        fade: true,
        autoplaySpeed:6000,
        vertical: true,
        arrows: false,
        responsive:[
            {
                breakpoint: 1200,
                settings: {
                    arrows: false,
                    slidesToShow: 0,
                    slidesToScroll: 0,
                    initialSlide: 0,
                    swipe: false,
                    swipeToSlide: false,
                    touchMove: false,
                    centerMode: false,
                    autoplay: false,
                }
            }
        ]
        
    };
    let path = '/images/home/';
    return (
        <div className='animiSilder'>
            <Slider {...settings}>
                {
                    homeBannerImages && homeBannerImages.length > 0 && homeBannerImages.map((item, key) => {
                        return (
                            <div key={item.id} className={s.sliderImageContainer}>
                                <Image src={`${path}${item.name}`} className={cx(s.sliderImage,homeBannerImages.length == 1 ? 'singleAimation':"animiSlide")} ></Image>
                            </div>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default compose(withStyles(s))(HomeSlider);