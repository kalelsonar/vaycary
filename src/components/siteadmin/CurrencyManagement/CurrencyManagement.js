import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import CommonTable from '../../CommonTable/CommonTable';
import CustomPagination from '../../CustomPagination';

import messages from '../../../locale/messages';
import currenciesQuery from './currenciesQuery.graphql';
import { updateCurrencyStatus, setBaseCurrency } from '../../../actions/siteadmin/CurrencyManagement/currencyManagement';
import { managePaymentCurrency } from '../../../actions/siteadmin/CurrencyManagement/managePaymentCurrency';

import s from './CurrencyManagement.css';

class CurrencyManagement extends React.Component {

  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      symbol: PropTypes.string.isRequired,
      isEnable: PropTypes.bool.isRequired,
      isPayment: PropTypes.bool.isRequired,
      isBaseCurrency: PropTypes.bool.isRequired
    })),
    updateCurrencyStatus: PropTypes.any.isRequired,
    setBaseCurrency: PropTypes.any.isRequired,
    managePaymentCurrency: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    data: []
  };

  handleUpdateStatus(id, status) {
    const { updateCurrencyStatus } = this.props;
    updateCurrencyStatus(id, status);
  }

  handleBaseCurrency(id) {
    const { setBaseCurrency } = this.props;
    setBaseCurrency(id);
  }

  paginationData = (currentPage) => {
    const { data: { refetch } } = this.props;
    const { setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.symbolLabel) },
      { data: formatMessage(messages.baseCurrencyLabel) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.setCurrencyLabel) },
      { data: formatMessage(messages.allowedPaymentCurrency) }
    ]
  }

  tbody = (props) => {
    const { managePaymentCurrency } = props;
    const { data: { getCurrencies } } = props;
    const { formatMessage } = props.intl;
    return getCurrencies?.results?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.symbol },
          { data: value?.isBaseCurrency ? formatMessage(messages.active) : "" },
          {
            data: <select value={value?.isEnable} onChange={(e) => this.handleUpdateStatus(value?.id, value?.isEnable)}>
              <option value={true}>{formatMessage(messages.enabledLabel)}</option>
              <option value={false}>{formatMessage(messages.disabledLabel)}</option>
            </select>
          },
          {
            data: <span>
              {
                !value?.isBaseCurrency && value?.isEnable && <a href="javascript:void(0)" onClick={() => this.handleBaseCurrency(value?.id)}>
                  <FormattedMessage {...messages.setBaseCurrency} />
                </a>
              }
            </span>
          },
          {
            data: value?.isEnable && <span>
              <a href="javascript:void(0)" onClick={() => managePaymentCurrency(value?.id, value?.isPayment ? "remove" : "add")}>
                {value.isPayment ? <FormattedMessage {...messages.remove} /> :
                  <FormattedMessage {...messages.addLabel} />}
              </a>
            </span>
          }
        ]
      }
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.props;
    const { data: { getCurrencies } } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
          <CommonTable
            title={formatMessage(messages.currencyManagement)}
            thead={this.thead}
            tbody={() => this.tbody(this.props)}
          />
          {
            getCurrencies?.count > 0 &&
            <div>
              <CustomPagination
                total={getCurrencies?.count}
                currentPage={currentPage}
                defaultCurrent={1}
                defaultPageSize={10}
                change={this.paginationData}
                paginationLabel={formatMessage(messages.currencies)}
              />
            </div>
          }
        </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  updateCurrencyStatus,
  setBaseCurrency,
  managePaymentCurrency
};

export default
  compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(currenciesQuery, {
      options: (props) => ({
        variables: {
          currentPage: props.currentPage,
          requestedFrom: "siteadmin"
        },
        fetchPolicy: 'network-only',
        ssr: true
      })
    }),
  )(CurrencyManagement);