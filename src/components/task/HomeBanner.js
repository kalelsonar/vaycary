import React from 'react';
import { flowRight as compose } from 'lodash';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import DetailSearchForm from '../Home/DetailSearchForm/DetailSearchForm';
import HomeSlider from './HomebannerSlider';

import s from './HomeBanner.css';
import bt from '../../components/Home/Layout4/Layout4.css'


const HomeBanner = ({ homeBannerImages, title, content }) => {
    return (
        <>
            <div className='homeBannerLayout3SliderContainer'>
                <div className={s.homeBannerForm}>
                    <div className={bt.searchFormContainer}>
                        <div className={cx(s.formWrap, 'bgBlack')}>
                            <h1><span>{title}</span>
                                {' '} <span className='textWhite'>{content}</span>
                            </h1>
                            <DetailSearchForm />
                        </div>
                    </div>
                </div>
                <HomeSlider homeBannerImages={homeBannerImages} />
            </div>
        </>
    )
}


export default compose(withStyles(s, bt))(HomeBanner);