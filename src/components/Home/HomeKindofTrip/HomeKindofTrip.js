import React from 'react';
import { flowRight as compose } from 'lodash';

import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';


import s from './HomeKindofTrip.css';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Loader
import Loader from '../../Loader';

class HomeKindofTrip extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        loading: PropTypes.bool,
    };

    render() {
        const { loading, data } = this.props;

        let path = '/images/home/';
        let headerTitle, headerContent, blockTitle1, blockContent2, isEnable = false;
        let blockContent1, blockImage1, blockTitle2, blockImage2;
        if (data && data.length > 0) {
            data.map((item) => {
                if (item.name == 'header' && item.isEnable == true) {
                    headerTitle = item.title;
                    headerContent = item.content;
                    isEnable = item.isEnable;
                } else if (item.name == 'block1' && item.isEnable == true) {
                    blockTitle1 = item.title
                    blockContent1 = item.content
                    blockImage1 = item.image;
                } else if (item.name == 'block2' && item.isEnable == true) {
                    blockTitle2 = item.title
                    blockContent2 = item.content
                    blockImage2 = item.image;
                }
            });
        }

        if (loading) {
            return <Loader type={"text"} />
        } else {
            return (
                <div className={cx(s.container, 'commonWordBreak')}>
                    {isEnable && <Grid fluid className={s.containerPadding}>
                        <div className={s.homeFind}>
                            <div className={s.containerTitle}>
                                <div className={s.homeFindHeader}>
                                    {headerTitle}
                                </div>
                                <div className={s.homePara}>
                                    {headerContent}
                                </div>
                            </div>
                            <div className={s.homeFindMain}>
                                <Row className={s.SectionPadding}>
                                    <Col lg={6} md={6} sm={6} xs={12}>
                                        <div className={s.homeFindLeft}>
                                            <div className={s.homeFindBg} style={{ backgroundImage: `url(${path}${blockImage1})` }}>
                                                <div className={s.position}>
                                                    <div className={s.homeFindSmall}>
                                                        {blockTitle1}
                                                    </div>
                                                    <div className={s.homeParaInner}>
                                                        {blockContent1}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={6} md={6} sm={6} xs={12} className={s.paddingTopMobile}>
                                        <div className={s.homeFindLeft}>
                                            <div className={s.homeFindBg} style={{ backgroundImage: `url(${path}${blockImage2})` }}>
                                                <div className={s.position}>
                                                    <div className={s.homeFindSmallColor}>
                                                        {blockTitle2}
                                                    </div>
                                                    <div className={s.homeParaInner}>
                                                        {blockContent2}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Grid>}
                </div>
            );
        }
    }
}

export default compose(
    withStyles(s)
)(HomeKindofTrip);