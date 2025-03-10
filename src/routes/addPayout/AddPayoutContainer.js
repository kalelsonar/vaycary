import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddPayoutContainer.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';
import PayoutForm from '../../components/Payout/PayoutForm';

class AddPayoutContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    initialData: PropTypes.object.isRequired
  };

  render() {
    const { title, initialData } = this.props;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <AccountSettingsSideMenu />
                <PayoutForm initialValues={initialData} />
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }

}

export default withStyles(s)(AddPayoutContainer);
