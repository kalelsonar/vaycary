import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './WhyHostBanner.css';
import {
    Button
} from 'react-bootstrap';
import cx from 'classnames';
import bt from '../../components/commonStyle.css';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';

// Locale
import messages from '../../locale/messages';

// History
import history from '../../core/history';

// ES6 Imports
import Scroll from 'react-scroll'; // Imports all Mixins

//Image
import learnIcon from '/public/SiteIcons/whyhostDownArrow.svg';

// Or Access Link,Element,etc as follows
let Link = Scroll.Link;

class WhyHostBanner extends Component {

    static defaultProps = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { isAuthenticated } = this.props;
        if (isAuthenticated) {
            history.push('/become-a-host?mode=new');
        } else {
            history.push('/login?refer=/become-a-host?mode=new');
        }
    }

    render() {
        const { data } = this.props
        return (
            <div className={cx(s.grid, 'bgBlack', 'commonWordBreak')}>
                <div className={s.bannerText}>
                    <h1 className={s.bannerTitle}>
                        {data && data.hostBannerTitle1}
                    </h1>
                    <div className={cx(s.displayFlex, s.tabViewFlex)}>
                        <Button
                            className={cx(bt.btnPrimary, s.borderRadius)}
                            onClick={this.handleClick}
                        >
                            <FormattedMessage {...messages.becomeAHost} />
                        </Button>
                        <Link
                            className={cx(s.linkButton, s.btnRight, bt.btnPrimaryBorder, 'whyBtnRtl', s.borderRadius, s.whyHostLearnMoreBtn)}
                            activeClass={s.active}
                            to="test1"
                            spy={true}
                            smooth={true}
                            offset={1} duration={1} 
                        >
                            <FormattedMessage {...messages.learnMore} />
                            <img src={learnIcon} className={cx(s.learnIcon, 'learnIconRTL')}/>
                        </Link>
                    </div>
                </div>
                <div className={s.TopBannerHeader} style={{ backgroundImage: `url(/images/home/${data && data.hostBannerImage1})` }} ></div>
            </div>
        );
    }
}

const mapState = (state) => ({
    isAuthenticated: state.runtime.isAuthenticated,
});
const mapDispatch = {};
export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
)(WhyHostBanner);