import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfileSideMenu.css';
import bt from '../../components/commonStyle.css';
import {
    Col
} from 'react-bootstrap';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';

// Redux
import { connect } from 'react-redux';
class EditProfileSideMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }
    }

    componentDidMount() {
        if (history.location) {
            this.setState({
                location: history.location.pathname
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (history.location) {
            this.setState({
                location: history.location.pathname
            });
        }
    }

    render() {
        const { userData } = this.props;
        let isVerified;
        if (userData) {
            isVerified = userData.profileId;
        }
        const { location } = this.state;

        return (
            <div>
                <ul className={cx('sideMenuBorder', 'listLayoutArbic')}>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/user/edit" }, s.hoverMenu, 'hoverMenuRTL')}>
                        <Link to={"/user/edit"} className={cx('sideNavitem', 'sideNav', s.navitem, 'navitemRTL')}>
                            <FormattedMessage {...messages.editProfile} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/user/verification" }, s.hoverMenu, 'hoverMenuRTL')}>
                        <Link to={"/user/verification"} className={cx('sideNavitem', 'sideNav', s.navitem, 'navitemRTL')}>
                            <FormattedMessage {...messages.trustAndVerification} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/user/reviews/about-you" }, s.hoverMenu, 'hoverMenuRTL')}>
                        <Link to={"/user/reviews/about-you"} className={cx('sideNavitem', 'sideNav', s.navitem, 'navitemRTL')}>
                            <FormattedMessage {...messages.reviews} />
                        </Link>
                    </li>
                </ul>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.space3, s.spaceTop2)}>
                    <Link to={"/users/show/" + isVerified} className={cx(bt.noTextDecration, bt.btnPrimary, bt.btnLarge, s.displayInlineBlock)}>
                        <FormattedMessage {...messages.viewProfile} />
                    </Link>
                </Col>
            </div>
        );
    }
}

const mapState = (state) => ({
    userData: state.account.data,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditProfileSideMenu)));