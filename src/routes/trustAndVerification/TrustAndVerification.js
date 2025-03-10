import React from 'react';
import PropTypes from 'prop-types';
import { graphql, gql, compose } from 'react-apollo';
import { injectIntl } from 'react-intl';

// Redux
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TrustAndVerification.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

// Components
import Trust from '../../components/Trust';
import DashBoardSideMenu from '../../components/Dashboard/DashBoardSideMenu';
import Loader from '../../components/Loader';

class TrustAndVerification extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getUserVerifiedInfo: PropTypes.object,
    }),
    account: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired
  };

  static defaultProps = {
    data: {
      loading: true
    }
  };

  render() {
    const { data: { loading, getUserVerifiedInfo }, title } = this.props;
    return (
      <>
        <Grid fluid className={'dashBoardContainer'}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className={'dashBoardGrid'}>
              <DashBoardSideMenu hideMoreVerification={true} />
              <div>
                {
                  loading && <Loader type={"text"} />
                }

                {
                  !loading && <Trust data={getUserVerifiedInfo} />
                }
              </div>
            </Col>
          </Row>
        </Grid>
      </ >
    );
  }

}

const mapState = (state) => ({
  account: state.account.data
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
  graphql(gql`
        query ($userId: String!) {
          getUserVerifiedInfo (userId: $userId) {
            id
            isEmailConfirmed
            isFacebookConnected
            isGoogleConnected
            isIdVerification
            status
          }
        }
      `,
    {
      options: (props) => ({
        variables: {
          userId: props.account.userId,
        },
        ssr: false,
      })
    }
  ),
)(TrustAndVerification);



