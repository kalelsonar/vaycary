import React from 'react';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// Components
import LocationSearchForm from '../LocationSearchForm';
import HomebannerSlider from '../../task/HomebannerSlider';

import s from '../SliderAnimation/SliderAnimation.css';

class Layout1 extends React.Component {
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
        const { homeBannerImages, title, content } = this.props;
        return (
            <div>
                <div className={cx('homeBannerSliderContainer')}>
                    <div>
                        <div>
                            <HomebannerSlider homeBannerImages={homeBannerImages} />
                        </div>
                            <div className={cx(s.container, s.ContainerTab, s.layoutOneFormContainer)}>
                                <div>
                                    <h1 className={cx(s.noMargin, s.bannerCaptionText, s.bannerCaptionText)}>
                                        <span className={s.bannerCaptionHighlight}>
                                            {title}
                                        </span>
                                        {' '} {content}
                                    </h1>
                                    <div className={s.searchbox}>
                                        <LocationSearchForm />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default compose(withStyles(s))(Layout1);


