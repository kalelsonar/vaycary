import React from 'react';
import { flowRight as compose } from 'lodash';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout4.css';
import cx from 'classnames';

// Components
import DetailSearchForm from '../DetailSearchForm/DetailSearchForm';

class Layout4 extends React.Component {
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
        let path = '/images/home/', homeBannerFirst;
        if (homeBannerImages && homeBannerImages.length > 0) homeBannerFirst = path + homeBannerImages[0].name;
        return (
            <div>
                <div className={cx(s.bannerLayoutContainer)}>
                    <div className={cx(s.bannerBackgroundImage)}
                        style={{ backgroundImage: `url(${homeBannerFirst})` }} />
                    <div className={s.searchFormContainer}>
                        <div className={cx(s.searchFormWrap, 'bgBlackTwo', 'commonWordBreak')}>
                                <h1><span className='textWhite'>{title}</span>
                                   <span className='textWhite'> {' '} {content} </span>
                                </h1>
                                <DetailSearchForm />
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(
    withStyles(s),
  )(Layout4);