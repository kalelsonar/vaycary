import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Components
import Payment from '../../components/Payment';
import Loader from '../../components/Loader';
import NotFound from '../notFound/NotFound';

import getPaymentDataQuery from './getPaymentData.graphql';

import s from './Payment.css';
class PaymentContainer extends React.Component {
  static propTypes = {
    reservationId: PropTypes.number.isRequired,
    paymentData: PropTypes.shape({
      loading: PropTypes.bool,
      getPaymentData: PropTypes.object
    })
  };

  render() {
    const { paymentData: { loading, getPaymentData } } = this.props;

    if (!loading && !getPaymentData) {
      return <NotFound />
    }

    return (
      <div className={s.root}>
        <div className={s.container}>
          {
            loading && <Loader type={"text"} />
          }
          {
            !loading && <Payment data={getPaymentData} />
          }
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getPaymentDataQuery,
    {
      name: 'paymentData',
      options: (props) => ({
        variables: {
          reservationId: props.reservationId,
        },
      })
    }
  ),
)(PaymentContainer);
