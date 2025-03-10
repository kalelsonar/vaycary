import React, { Component } from 'react';
import Table from 'react-bootstrap/lib/Table';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../components/Link';
import messages from '../../locale/messages';

import ExportImage from '/public/adminIcons/export.png';

import bt from '../../components/commonStyle.css';
import s from './CommonTable.css';


class CommonTable extends Component {

    render() {
        const { title, handleSearch, tbody, thead, isSearch, addAction, redirectionLabel, handleFilter, filterOption, exportURL, linkLabel, isLink, linkURL, isAdmin } = this.props;
        const { formatMessage } = this.props.intl;
        const theadData = thead();
        const tbodyData = tbody();
        return (
            <>
                {title &&
                    <h1 className={s.headerTitle}>{title}</h1>}

                {addAction &&
                    <div className={s.space4}>
                        <Button className={cx(bt.btnPrimary, bt.btnLarge)} onClick={addAction}>{redirectionLabel}</Button>
                    </div>}

                {(isSearch || exportURL || filterOption?.length > 0) &&
                    <div className={cx(s.tableTopBox, 'bgBlack')}>
                        <div className={s.tableTopWrapper}>
                            {isSearch && <div className={s.tableTopSearchFieldBox}>
                                <FormControl
                                    type="text"
                                    placeholder={formatMessage(messages.search)}
                                    onChange={handleSearch}
                                    className={cx('searchInputControl', 'searchInputControlAR')}
                                />
                            </div>}

                            {filterOption?.length > 0 && <div className={s.tableTopSelectFieldBox}>
                                <FormGroup controlId="formControlsSelect" className={s.noMargin}>
                                    <FormControl onChange={handleFilter} componentClass="select" placeholder={formatMessage(messages.selectLabel)} className={cx(bt.commonControlSelect, s.userSelect, 'rtlUserSelect')}>
                                        {filterOption?.map((item, index) => <option key={index} value={item?.value}>{item?.label}</option>)}
                                    </FormControl>
                                </FormGroup>
                            </div>}
                        </div>
                        {isLink &&
                            <div>
                                <Link to={linkURL} className={cx(bt.btnPrimary, bt.btnLarge)}>
                                    {linkLabel}
                                </Link>
                            </div>}
                        {exportURL && <div><a
                            href={exportURL}
                            className={cx(s.exportText, 'textWhite')}>
                            <span className={s.vtrMiddle}><FormattedMessage {...messages.exportDataIntoCSV} /></span>
                            <span className={cx(s.exportLinkImg, 'exportLinkImgCommon')}>
                                <img src={ExportImage} className={s.exportImg} />
                            </span>
                        </a> </div>}
                    </div>
                }

                <div className={cx(isAdmin ? 'table-responsive NewAdminResponsiveTable NewResponsiveTableAdmin' : 'payoutTable NewResponsiveTable mobileTable', (isSearch || exportURL || filterOption?.length > 0) && 'noTopBorderRadius')}>
                    <Table>
                        <thead>
                            <tr>
                                {theadData?.map((item, index) => <th scope="col" key={index}>{item.data}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {tbodyData && tbodyData?.length > 0 ? tbodyData?.map((item, index) => {
                                return <tr key={item?.id}>
                                    {item?.data?.map((value, index) => <td data-label={theadData[index]?.data} key={index}>{value?.data} </td>)}
                                </tr>
                            }) : <tr><td colSpan={theadData?.length}><FormattedMessage {...messages.noRecordFound} /></td></tr>}
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}

const mapState = (state) => ({
    isAdmin: state.runtime.isAdminAuthenticated,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CommonTable)));