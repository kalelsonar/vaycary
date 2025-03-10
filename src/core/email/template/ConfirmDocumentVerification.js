import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import EmailSignature from './EmailSignature';
import { url } from '../../../config';
import { PRIMARYCOLOR } from '../../../constants';

class ConfirmDocumentVerification extends React.Component {

  static propTypes = {
    content: PropTypes.shape({
      verificationStatus: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
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
    const { content: { verificationStatus, name, logo, siteName } } = this.props;
    let verificationURL = url + `/user/verification`;

    return (
      <Layout>
        <Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" logo={logo} siteName={siteName} />
        <Body textStyle={textStyle}>
          <div>
            Hi {name},
          </div>
          <EmptySpace height={20} />
          <div>
            Welcome to {siteName}!
          </div>
          <EmptySpace height={20} />
          <div>
            Your documents has been {verificationStatus} in the document verification process.
          </div>
          <EmptySpace height={40} />
          <div>
            <a style={buttonStyle} href={verificationURL}>Check your profile</a>
          </div>
          <EmptySpace height={30} />
          <EmailSignature siteName={siteName} />
        </Body>
        <Footer siteName={siteName} />
        <EmptySpace height={20} />
      </Layout>
    );
  }

}

export default ConfirmDocumentVerification;