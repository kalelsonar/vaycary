import React from "react";
import { graphql, compose } from 'react-apollo';
import cx from 'classnames';
import { connect } from "react-redux";
import withStyles from "isomorphic-style-loader/lib/withStyles";

import NotFound from "../../notFound/NotFound";
import CancellationDetails from "./CancellationDetails";
import Loader from "../../../components/Loader/Loader";

import getCancellationData from './getCancellationData.graphql';

import s from './Cancellation.css';
class Cancellation extends React.Component {
    render() {
        const { cancellationData: { getCancellationData, loading }, userType } = this.props;
        if (loading) {
            return (
                <div className={s.space4}>
                    <Loader type="text" />  
                </div>
            );
        }

        if (getCancellationData === null || getCancellationData === undefined || getCancellationData?.cancellationDetails?.id) {
            return(
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
             <NotFound />
             </div>)
        }

        return (
            <div className={s.container}>
                <CancellationDetails
                    userType={userType}
                    data={getCancellationData}
                />
            </div>
        )

    }
};

const mapState = (state) => ({
    serviceFees: state?.book?.serviceFees,
    base: state && state.currency && state.currency.base,
    rates: state && state.currency && state.currency.rates
});

const mapDispatch = {
}

export default compose(
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(getCancellationData,
        {
            name: 'cancellationData',
            options: (props) => ({
                variables: {
                    id: props.id
                },
                fetchPolicy: 'network-only',
                ssr: false
            })
        }),
)(Cancellation);