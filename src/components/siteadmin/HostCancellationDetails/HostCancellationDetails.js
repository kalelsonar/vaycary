import React from "react";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import { FormattedMessage, injectIntl } from "react-intl";
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";
import messages from "../../../locale/messages";

import s from './HostCancellationDetails.css';



class HostCancellationDetails extends React.Component {

    render() {
        const { formatMessage } = this.props.intl;
        const { data, nonPayoutAmount, payoutAmount, currency, totalNights, totalPrice, refundDays } = this.props;
        return (
            <div>
                {
                    refundDays > 0 && nonPayoutAmount > 0 &&
                    <>
                        <div className={s.tableGrid}>
                            <div>
                                <div className={s.headingContent}><FormattedMessage {...messages.hostMissedEarnings} /></div>
                                <div className={s.smallContent}><CurrencyConverter amount={totalPrice} from={currency} /> <span className={'inlineBlockRTL'}>{'x'}</span> {refundDays}  {refundDays > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</div>
                            </div>
                            <span className={cx(s.refundTextColor, 'refundTextColorRTL')}><CurrencyConverter amount={nonPayoutAmount} from={currency} /></span>
                        </div>
                        <hr className={s.dividerLine} />
                    </>
                }
                {
                    payoutAmount > 0 &&
                    <>
                        <div className={s.tableGrid}>
                            <div>
                                <div className={s.headingContent}><FormattedMessage {...messages.hostTotalEarnings} /></div>
                                <div className={s.smallContent}><CurrencyConverter amount={totalPrice} from={currency} /> <span className={'inlineBlockRTL'}>{'x'}</span> {totalNights}  {totalNights > 1 ? formatMessage(messages.nights) : formatMessage(messages.night)}</div>
                                <div className={s.smallContent}>
                                    {data?.guestData?.firstName} {' '} <FormattedMessage {...messages.adminHostRefund} />
                                </div>
                            </div>
                            <span className={s.headingContent}><CurrencyConverter amount={payoutAmount} from={currency} /></span>
                        </div>

                        <hr className={s.dividerLine} />
                    </>
                }
                <div className={s.tableGrid}>
                    <div>
                        <div className={s.headingContent}><FormattedMessage {...messages.cancellations} /></div>
                        <div className={s.smallContent}>{data?.cancellation?.policyContent}</div>
                    </div>
                    <a href={'/cancellation-policies/' + data?.cancellation?.policyName} target="_blank" className={s.headingContent}>{data?.cancellation?.policyName}</a>
                </div>
                <hr className={s.dividerLine} />
                <div className={s.headingContent}>
                    <FormattedMessage {...messages.guestReasonForCancellation} />
                </div>
            </div>
        )
    }
};

const selector = formValueSelector('AdminCancellation');

const mapState = (state) => ({
    nonPayoutAmount: selector(state, 'nonPayoutAmount'),
    currency: selector(state, 'currency'),
    totalPrice: selector(state, 'totalPrice'),
    refundDays: selector(state, 'refundDays'),
    payoutAmount: selector(state, 'payoutAmount'),
    totalNights: selector(state, 'totalNights')
});
const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(HostCancellationDetails)));