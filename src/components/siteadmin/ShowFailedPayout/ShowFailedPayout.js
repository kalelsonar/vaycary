import React from 'react';
import PropTypes from 'prop-types';
import { Table, Tr, Td } from 'reactable';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';

import messages from '../../../locale/messages';
import { isValidJSON } from '../../../helpers/isValidJSON';

import bt from '../../../components/commonStyle.css';
import s from './ShowFailedPayout.css';
class ShowFailedPayout extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,

    }

    constructor(props) {
        super(props);
    }

    render() {
        const { title, data } = this.props;
        const { formatMessage } = this.props.intl;
        const gobackcss = { padding: '10px' };

        let payoutAmount = data?.total - data?.hostServiceFee, checkJSON;
        let reason = data?.hostFailedTransaction && data?.hostFailedTransaction?.reason;

        checkJSON = isValidJSON(reason);
        reason = checkJSON ? JSON.parse(reason) : reason;

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={cx(s.space4, bt.textAlignRight)}>
                        <Link to={'/siteadmin/payout'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={'table-responsive'}>
                        <Table
                            className="table"
                            noDataText={formatMessage(messages.noRecordFound)}
                            sortable={true}
                        >
                            {data &&
                                <Tr>
                                    <Td column={formatMessage(messages.reservationId)}>
                                        {data?.id}
                                    </Td>
                                    <Td column={formatMessage(messages.codeLabel)}>
                                        {data?.confirmationCode}
                                    </Td>
                                    {
                                        data.listData && <Td column={formatMessage(messages.adminListTitle)}>
                                            <a href={"/rooms/" + data.listData.id} target='_blank'>
                                                {data?.listData?.title}
                                            </a>
                                        </Td>
                                    }
                                    {
                                        !data?.listData && <Td column={formatMessage(messages.adminListTitle)} data={formatMessage(messages.dataMissing)} />
                                    }
                                    <Td column={formatMessage(messages.hostNameLabel)}>
                                        {data?.hostData && data?.hostData?.firstName}
                                    </Td>
                                    <Td column={formatMessage(messages.payoutLabel)}>
                                        <CurrencyConverter
                                            amount={payoutAmount}
                                            from={data?.currency}
                                        />
                                    </Td>
                                    <Td column={formatMessage(messages.reason)}>
                                        {reason?.raw?.message ? reason?.raw?.message : reason}
                                    </Td>
                                </Tr>
                            }
                        </Table>
                    </div>
                </div>
            </div>
        )
    }

}

export default injectIntl(withStyles(s, bt)(ShowFailedPayout));