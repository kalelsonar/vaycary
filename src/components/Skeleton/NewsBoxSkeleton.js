import React, { Component } from "react";
import { flowRight as compose } from 'lodash';

import withStyles from "isomorphic-style-loader/lib/withStyles";
import {
    Grid
} from 'react-bootstrap';
import cx from "classnames";
import s from "../Home/NewsBox/NewsBox.css";
import l from './Skeleton.css';
import Shimmer from "./Shimmer";

class NewsBoxSkeleton extends Component {
    render() {
        return (
            <Grid fluid>
                <div className={cx(s.bg, l.skeletonBoxBg, 'newsBoxBorderRadius', 'bgBlackTwo')}>
                    <Shimmer />
                    <div className={cx(l.newsSkeletonPosition, 'newsSkeletonPositionRTL')}>
                        <div className={cx(l.newsBoxOneSkeleton, 'bgBlackTwo', 'newsBoxDark')}>
                            <Shimmer />
                        </div>
                        <div className={cx(l.newsBoxOneSkeleton, 'bgBlackTwo')} style={{ width: '200px' }}>
                            <Shimmer />
                        </div>
                    </div>
                </div>
            </Grid>
        );
    }
}

export default compose(
    withStyles(s),
  )(NewsBoxSkeleton);
