import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, gql, compose } from 'react-apollo';
import { FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';

import Link from '../Link';

import { changePayout } from '../../actions/TransactionHistory/changePayout';
import { payoutChangeListing } from '../../actions/Payout/payoutChangeListing';
import messages from '../../locale/messages';

class Payouts extends Component {
    static propTypes = {
        className: PropTypes.string,
        formatMessage: PropTypes.any,
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getPayouts: PropTypes.arrayOf(PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }))
        }),
        refetch: PropTypes.any,
        changePayout: PropTypes.any.isRequired,
        type: PropTypes.string,
        reservationId: PropTypes.number,
        defaultLabel: PropTypes.string,
        defaultValue: PropTypes.number,
        enableAddPayout: PropTypes.bool
    };

    static defaultProps = {
        defaultLabel: 'All payout methods',
        enableAddPayout: false,
        data: {
            loading: true,
            getPayouts: []
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            payoutId: null
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { defaultValue } = this.props;
        this.setState({ payoutId: defaultValue })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { defaultValue } = nextProps;
        this.setState({ payoutId: defaultValue })
    }

    handleChange(e) {
        const { refetch, changePayout, type, reservationId, payoutChangeListing } = this.props;
        const { mode, handleResults, listId } = this.props;
        this.setState({ payoutId: e.target.value })

        if (type == 'change') {
            changePayout(e.target.value, reservationId);
        } else {
            let variables = {
                payoutId: e.target.value,
                currentPage: 1
            };
            payoutChangeListing(e.target.value);
            //refetch(variables);
            handleResults(mode, e.target.value, listId);
        }

    }

    render() {
        const { className, data: { loading, getPayouts }, defaultLabel, enableAddPayout } = this.props;
        const { payoutId } = this.state;
        if (enableAddPayout) {
            if (!loading && (getPayouts === null || getPayouts.length === 0)) {
                return (
                    <Link to={"/user/payout"}>
                        <FormattedMessage {...messages.transactionsAddPayout} />
                    </Link>
                )
            }
        }
       
        return (
                <FormControl
                    componentClass="select"
                    className={className}
                    onChange={this.handleChange}
                    value={payoutId}
                >
                    <option value="0">{defaultLabel}</option>
                    {
                        !loading && getPayouts && getPayouts.map((item, index) => {
                            if (item.paymentMethod.id === 2 && item.isVerified) {
                                return (
                                    <option
                                        value={item.id}
                                        key={index}
                                    >
                                        ******{item.last4Digits}
                                    </option>
                                )
                            } else if (item.isVerified) {
                                return (
                                    <option
                                        value={item.id}
                                        key={index}
                                    >
                                        {item.payEmail}
                                    </option>
                                )
                            }

                        })

                    }
                </FormControl>
        );
    }
}

const mapState = (state) => ({
    onChangePayoutId: state.payoutChangeListing.onChangePayoutId
});

const mapDispatch = {
    changePayout,
    payoutChangeListing
};

export default compose(
    injectIntl,
    connect(mapState, mapDispatch),
    graphql(gql`
    	query getPayouts {
		  getPayouts {
		    id
		    methodId
		    paymentMethod{
		      id
		      name
		    }
		    userId
		    payEmail
		    address1
		    address2
		    city
		    state
		    country
		    zipcode
		    currency
		    default
		    createdAt
            status
            last4Digits
            isVerified
		  }
		}
    `,
        {
            options: {
                ssr: false,
                fetchPolicy: 'network-only'
            }
        }),
)(Payouts);

