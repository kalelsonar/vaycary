import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AccountSettingsSideMenu.css';
import cx from 'classnames';

// Component
import Link from '../Link';

// Locale
import messages from '../../locale/messages';
import history from '../../core/history';
class AccountSettingsSideMenu extends React.Component {

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
        const { location } = this.state;

        return (
            <div>
                <ul className={cx('sideMenuBorder', 'listLayoutArbic')}>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/user/payout" || location === "/user/addpayout" })}>
                        <Link to={"/user/payout"} className={cx('sideNavitem', 'sideNav')}>
                            <FormattedMessage {...messages.payoutPreferences} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location.startsWith("/user/transaction") })}>
                        <Link to={"/user/transaction/completed"} className={cx('sideNavitem', 'sideNav')}>
                            <FormattedMessage {...messages.transactionHistory} />
                        </Link>
                    </li>
                    <li className={cx('sideMenuBorderPadding', { ['menuActive']: location === "/users/security" })}>
                        <Link to={"/users/security"} className={cx('sideNavitem', 'sideNav')}>
                            <FormattedMessage {...messages.security} />
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
}

export default injectIntl(withStyles(s)(AccountSettingsSideMenu))