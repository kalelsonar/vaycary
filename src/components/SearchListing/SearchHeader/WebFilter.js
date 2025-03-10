import React from 'react';
import { FormattedMessage, injectIntl } from "react-intl";
import cx from "classnames";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import Button from "react-bootstrap/lib/Button";

import HomeTypeSlider from "../Filters/HomeTypeSlider/HomeTypeSlider";
import MoreFiltersModal from '../../MoreFiltersModal/MoreFiltersModal';

import messages from "../../../locale/messages";

import s from "./SearchHeader.css";

class WebFilter extends React.Component {


    render() {
        const { roomType, handleOpen, filterIcon, handleTabToggle, searchSettings, isExpand } = this.props;
        const { smallDevice, tabletDevice, verySmallDevice, showFilter, showResults, isActiveMoreFilter } = this.props;

        return (
            <div
                className={cx(
                    s.searchHeaderResponsiveScroll,
                    "searchHeaderScroll"
                )}
            >
                <div className={s.searchHeaderResponsive}>
                    <div className={s.searchHeaderGrid}>
                        <HomeTypeSlider
                            className={cx(
                                s.filterButtonContainer,
                                "hidden-xs",
                                s.hideTabletSection
                            )}
                            roomType={roomType}
                        />
                        <div className={cx(s.filterButtonContainer, 'hidden-xs')}>
                            <Button
                                className={cx(
                                    isActiveMoreFilter ? s.btnSecondary : s.filterBtn,
                                    s.btn,
                                    "searchBtnDark"
                                )}
                                onClick={handleOpen}
                            >
                                <span className={cx(s.btnFlex, 'svgImg')}>
                                    <span className={cx(isActiveMoreFilter ? 'filterTextNoBG' : ['filterTextBG'])}><FormattedMessage {...messages.filters} /></span>
                                    <img src={filterIcon} />
                                </span>
                            </Button>
                            <MoreFiltersModal
                                className={s.filterButtonContainer}
                                handleTabToggle={handleTabToggle}
                                isExpand={isExpand}
                                searchSettings={searchSettings}
                                smallDevice={smallDevice}
                                tabletDevice={tabletDevice}
                                verySmallDevice={verySmallDevice}
                                showFilter={showFilter}
                                showResults={showResults}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(WebFilter));