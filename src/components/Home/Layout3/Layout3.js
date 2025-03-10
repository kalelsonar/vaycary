import React from 'react';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../SliderAnimation/SliderAnimation.css';
import cx from 'classnames';


// Components
// import DetailSearchForm from '../DetailSearchForm/DetailSearchForm';
// import SliderAnimation from '../SliderAnimation/SliderAnimation';
import HomeBanner from '../../task/HomeBanner';

class Layout3 extends React.Component {
    constructor(props) {
        super(props);
        this.scrollTop = this.scrollTop.bind(this);
    }

    scrollTop() {
        window.scrollTo({
            top: screen.height,
            behavior: 'smooth'
        })
    }

    render() {
        const { title, content, homeBannerImages } = this.props;
        
        return (
            // <div>
            //     <div className={cx('homeBannerSlider')}>
            //         <div className={cx(s.homePosition, 'homePosition')}>
            //             <div className={s.homeCarsoual}>
            //                 <SliderAnimation homeBannerImages={homeBannerImages} />
            //             </div>
            //             <div className={cx(s.container, s.FormBookWrap)}>
            //                 <div className={s.FormBookWrap}>
            //                 <div className={cx(s.BookWrap, 'bgBlack')}>
            //                         <h1><span>{title}</span>
            //                             {' '} <span className='textWhite'>{content}</span>
            //                         </h1>
            //                         <DetailSearchForm />
            //                     </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
           <HomeBanner homeBannerImages = {homeBannerImages} title={title} content={content}/>


        );
    }
}

export default compose(withStyles(s))(Layout3);