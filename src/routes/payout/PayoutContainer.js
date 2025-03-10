import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PayoutContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Components
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';
import Payout from '../../components/Payout';

class PayoutContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title, currentAccountId } = this.props;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <AccountSettingsSideMenu />
                <Payout currentAccountId={currentAccountId} />
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }

}

export default withStyles(s)(PayoutContainer);
