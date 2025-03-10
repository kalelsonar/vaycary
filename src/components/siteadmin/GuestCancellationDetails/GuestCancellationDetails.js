import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import { connect } from "react-redux";
import { formValueSelector } from "redux-form";
import withStyles from "isomorphic-style-loader/lib/withStyles";
import cx from 'classnames';

import CurrencyConverter from "../../CurrencyConverter/CurrencyConverter";
import messages from "../../../locale/messages";

import s from './GuestCancellationDetails.css';

class GuestCancellationDetails extends React.Component {

    render() {
        const { data, refundToGuest, currency, nonRefundableToGuest } = this.props;
        return (
            <>
                {
                    nonRefundableToGuest > 0 &&
                    <>
                        <div className={s.tableGrid}>
                            <span className={s.headingContent}><FormattedMessage {...messages.nonRefundable} /></span>
                            <span className={cx(s.refundTextColor, 'refundTextColorRTL')}> <CurrencyConverter
                                amount={nonRefundableToGuest}
                                from={currency}
                            />
                            </span>
                        </div>
                        <hr className={s.dividerLine} />
                    </>
                }
                {
                    refundToGuest > 0 &&
                    <>
                        <div className={s.tableGrid}>
                            <div>
                                <div className={s.headingContent}><FormattedMessage {...messages.refundable} /></div>
                                <div className={s.smallContent}><FormattedMessage {...messages.adminGuestRefund} /></div>
                            </div>
                            <span className={s.headingContent}><CurrencyConverter
                                amount={refundToGuest}
                                from={currency}
                            />
                            </span>
                        </div>
                        <hr className={s.dividerLine} />
                    </>
                }
                <div className={s.tableGrid}>
                    <div>
                        <div className={s.headingContent}><FormattedMessage {...messages.cancellations} /></div>
                        <div className={s.smallContent}>
                            {data?.cancellation?.policyContent}
                        </div>

                    </div>
                    <a href={'/cancellation-policies/' + data?.cancellation?.policyName} target="_blank" className={s.headingContent}>{data?.cancellation?.policyName}</a>
                </div>
                <hr className={s.dividerLine} />
                <div className={s.headingContent}>
                <FormattedMessage {...messages.hostReasonForCancellation} />
                </div>
            </>
        )
    }
};

const selector = formValueSelector('AdminCancellation');

const mapState = (state) => ({
    refundToGuest: selector(state, 'refundToGuest'),
    currency: selector(state, 'currency'),
    nonRefundableToGuest: selector(state, 'nonRefundableToGuest'),
});

const mapDispatch = {
};


export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(GuestCancellationDetails)));