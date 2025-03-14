import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { PRIMARYCOLOR } from '../../../constants';

class FeatureAlert extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      email: PropTypes.string.isRequired,
      feature: PropTypes.string.isRequired
    })
  };

  render() {
    const buttonStyle = {
      margin: 0,
      fontFamily: 'Arial',
      padding: '10px 16px',
      textDecoration: 'none',
      borderRadius: '2px',
      border: '1px solid',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontWeight: 'normal',
      fontSize: '18px',
      whiteSpace: 'nowrap',
      background: '#ffffff',
      borderColor: PRIMARYCOLOR,
      backgroundColor: PRIMARYCOLOR,
      color: '#ffffff',
      borderTopWidth: '1px',
    };

    const textStyle = {
      color: '#282828',
      backgroundColor: '#F7F7F7',
      fontFamily: 'Arial',
      fontSize: '16px',
      padding: '35px'
    };

    const textBold = {
      fontWeight: 'bold'
    };

    const { content: { email, feature, siteName } } = this.props;
    let today = moment().format('ddd, Do MMM, YYYY')
    return (
      <Layout>
        <Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" siteName={siteName} />
        <Body textStyle={textStyle}>
          <div>
            Hi Admin,
          </div>
          <EmptySpace height={20} />
          <div>
            {email} subscribed to get notification on <span style={textBold}>{feature}</span> at {today}
          </div>
          <EmptySpace height={30} />
          <div>
            Thanks, <br />
            The {siteName} Team
          </div>
        </Body>
        <Footer siteName={siteName} />
        <EmptySpace height={20} />
      </Layout>
    );
  }

}

export default FeatureAlert;