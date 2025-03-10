import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditProfile.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';

// Components
import EditProfileForm from '../../components/EditProfileForm';
import DashBoardSideMenu from '../../components/Dashboard/DashBoardSideMenu';

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={'dashBoardGrid'}>
              <div>
                <DashBoardSideMenu />
              </div>
              <EditProfileForm />
            </Col>
          </Row>
        </Grid>
      </>
    );
  }

}

export default withStyles(s)(EditProfile);
