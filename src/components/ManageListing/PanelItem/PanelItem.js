import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

// Style
import { Panel, FormGroup, FormControl, Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PanelItem.css';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

// Component
import ListItem from '../ListItem';
import Loader from '../../Loader';
import Link from '../../Link';

import bt from '../../commonStyle.css';

// Locale
import messages from '../../../locale/messages';
import { debounce } from '../../../helpers/debounce';
import history from '../../../core/history';

//Image
import addIcon from '/public/SiteIcons/addListIcon.svg';
import noListImage from '/public/SiteImages/noListImage.svg';

class PanelItem extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        panelTitle: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
    }

    handleSearchChange(searchKey) {
        const { refetch } = this.props;
        let variables = {
            searchKey: searchKey && searchKey.toString().trim()
        };
        refetch(variables);
    }

    render() {
        const { data, panelTitle, loading, searchKey, refetch, setValue } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div className={cx('manageListingItem')}>
                <div className={s.listFlex}>
                    <div className={s.mobileSearchWidth}>
                        <FormGroup className={s.noMargin}>
                            <FormControl
                                type="text"
                                placeholder={formatMessage(messages.searchYourListing)}
                                onChange={(e) => setValue(e.target && e.target.value)}
                                onKeyUp={() => this.handleSearchChange(searchKey)}
                                className={cx(s.formControlInput, s.jumboInput, s.locationBgIcon, 'locationBgIconRTL')}
                                value={searchKey}
                            />
                        </FormGroup>
                    </div>
                    <div className={s.mobileSearchWidth}>
                        <Button onClick={() => history.push('/become-a-host?mode=new')} className={cx(bt.btnPrimary, s.linkCss)}>
                            <img src={addIcon} className={cx(s.plusIcon, 'addPlusIcon')} />
                            <FormattedMessage {...messages.addListing} />
                        </Button>
                    </div>
                </div>

                <Panel className={s.panelHeader} header={panelTitle}>
                    {
                        loading && <Loader type={"text"} />
                    }
                    {!loading && <ul className={cx(s.listContainer, 'listLayoutArbic')}>
                        {
                            data && data.length > 0 && data.map((item, index) => {
                                return (
                                    <ListItem data={item} key={index} refetch={refetch} searchKey={searchKey} />
                                )
                            })
                        }
                        {
                            data && data.length == 0 && <div className={s.textCenter}>
                                <img src={noListImage} />
                                <div className={s.noListHeading}>
                                    <FormattedMessage {...messages.noListHeading} />
                                </div>
                                <div className={s.noListSubHeading}>
                                    <FormattedMessage {...messages.noListSmall} />
                                </div>
                                <Link to={'/become-a-host?mode=new'} className={cx(bt.btnPrimary, s.addNewBtn)}>
                                    <FormattedMessage {...messages.addNewlisting} />
                                </Link>
                            </div>
                        }
                    </ul>}
                </Panel>
            </div>
        )
    }
}

export default injectIntl(withStyles(s)(PanelItem));
