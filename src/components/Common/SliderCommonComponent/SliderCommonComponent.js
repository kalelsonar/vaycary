import React, { Component } from "react";
import Swiper from 'react-id-swiper';
class SliderCommonComponent extends Component {

    componentDidMount() {
        document.getElementById('mouseWheel').addEventListener('wheel', this.scroll);
    }

    componentDidUpdate() {
        window.removeEventListener('wheel', this.scroll);
    }

    scroll = (y) => {
        y.wheelDelta > 0 ? (
            this.swiper.slidePrev()
        ) : (
            this.swiper.slideNext()
        );
    }

    render() {

        const { spaceBetween, slidesPerGroup, slidesPerView, breakpoints, rtl } = this.props;
        const params = {
            grabCurso: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        };

        return (
            <div id="mouseWheel">
                <Swiper {...params} spaceBetween={spaceBetween} slidesPerGroup={slidesPerGroup} slidesPerView={slidesPerView}  breakpoints={breakpoints}  ref={node => this.swiper = node !== null ? node.swiper : null} rtl={rtl} >
                    {this.props.children}
                </Swiper>
            </div>
        )
    }
}

export default SliderCommonComponent;