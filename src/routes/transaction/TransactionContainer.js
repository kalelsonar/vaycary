import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

// Style
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Transaction.css';
import cx from 'classnames';

// Component
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';
import Transaction from '../../components/Transaction';

// Graphql
import getTransactionHistory from './getTransactionHistory.graphql';

class TransactionContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data, mode } = this.props;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={cx('dashBoardListingGrid', s.transactionGrid)}>
                <AccountSettingsSideMenu />
                <div className={s.secondContainer}>
                  <Transaction data={data} mode={mode} />
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }
}

export default compose(
  withStyles(s),
  graphql(getTransactionHistory,
    {
      options: (props) => ({
        variables: {
          mode: props.mode,
          currentPage: 1,
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }
  ),
)(TransactionContainer);