import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { flowRight as compose } from 'lodash';
import { injectIntl } from 'react-intl';
import CommonTable from '../../CommonTable/CommonTable';

import { updatePaymentGatewayStatus } from '../../../actions/siteadmin/updatePayemntGatewayStatus';
import messages from '../../../locale/messages';

import s from './ManagePaymentGateway.css';

class ManagePaymentGateway extends React.Component {
    static propTypes = {
        getAllPayments: PropTypes.shape({
            loading: PropTypes.bool,
            refetch: PropTypes.any.isRequired,
            getAllPaymentMethods: PropTypes.array
        }),
        title: PropTypes.string.isRequired,
    };

    handleUpdate(id, e) {
        const { updatePaymentGatewayStatus, getAllPayments: { refetch } } = this.props;
        let isEnable = e.target.value;
        isEnable = isEnable == 'true' ? true : false;
        updatePaymentGatewayStatus(id, isEnable);
        refetch();
    }

    thead = () => {
        const { formatMessage } = this.props.intl;
        return [
            { data: formatMessage(messages.idLabel) },
            { data: formatMessage(messages.paymentGateway) },
            { data: formatMessage(messages.status) }
        ]
    }

    tbody = (props) => {
        const { getAllPayments: { getAllPaymentMethods }, title } = props;
        const { formatMessage } = props.intl;
        return getAllPaymentMethods?.results?.map((item, key) => {
            return {
                id: key,
                data: [
                    { data: item?.id },
                    { data: item?.paymentName },
                    {
                        data: <select value={item?.isEnable} onChange={(e) => this.handleUpdate(item?.id, e)}>
                            <option value={true}>{formatMessage(messages.activeLabel)}</option>
                            <option value={false}>{formatMessage(messages.inActiveLabel)}</option>
                        </select>
                    }
                ]
            }
        });
    }

    render() {
        const { formatMessage } = this.props.intl;
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <CommonTable
                    title={formatMessage(messages.paymentGatewaySection)}
                    thead={this.thead}
                    tbody={() => this.tbody(this.props)}
                />
            </div>
        )
    }

}

const mapState = (state) => ({
});

const mapDispatch = {
    updatePaymentGatewayStatus
};

export default compose(injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),

)(ManagePaymentGateway);