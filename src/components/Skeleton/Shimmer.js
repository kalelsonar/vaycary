import React from 'react';
import { flowRight as compose } from 'lodash';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';

import s from './Skeleton.css';

const Shimmer = ({skeletonRelative}) => {
    return (
        <div className={cx(s.shimmerWrapper, skeletonRelative, 'kindTripBorder', 'newsBoxBorder', 'newsBoxDarkAfter')}>
            <div className={s.shimmer}></div>
        </div>
    )
}

export default compose(withStyles(s))(Shimmer);