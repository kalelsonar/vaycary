import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ChangePasswordContainer.css';
import { injectIntl } from 'react-intl';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import { connect } from 'react-redux';

// Components
import ChangePasswordForm from '../../components/ChangePasswordForm';
import AccountSettingsSideMenu from '../../components/AccountSettingsSideMenu';

class ChangePasswordContainer extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    registeredType: PropTypes.string
  };

  render() {
    const { title, registeredType } = this.props;
    const initialValues = { registeredType };

    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className={'dashBoardListingGrid'}>
                <AccountSettingsSideMenu />
                <ChangePasswordForm initialValues={initialValues} />
              </div>
            </Col>
          </Row>
        </Grid>
      </>
    );
  }

}

const mapState = (state) => ({
  registeredType: state.account.data.userData.type,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ChangePasswordContainer)));
