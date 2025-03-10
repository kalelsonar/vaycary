import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmailSignature from './EmailSignature';
import EmptySpace from '../modules/EmptySpace';
import { PRIMARYCOLOR } from '../../../constants';

class BanStatusServiceStatusBanned extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            userMail: PropTypes.string.isRequired,
        }).isRequired
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

        const linkText = {
            color: PRIMARYCOLOR,
            fontSize: '16px',
            textDecoration: 'none',
            cursor: 'pointer',
        }

        const textStyle = {
            color: '#282828',
            backgroundColor: '#F7F7F7',
            fontFamily: 'Arial',
            fontSize: '16px',
            padding: '35px'
        };
        const { content: { userName, userMail, adminMail, logo, siteName } } = this.props;
        let mailTo = 'mailto:' + adminMail;

        return (
            <Layout>
                <Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" logo={logo} siteName={siteName} />
                <Body textStyle={textStyle}>
                    <div>
                        Dear {userName},
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        We have been disabled your account for violating our terms.
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        Please get in touch with our <a href={mailTo}>support team</a>, if you have any questions.
                    </div>
                    <EmptySpace height={40} />
                    <EmailSignature siteName={siteName} />
                </Body>
                <Footer siteName={siteName} />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default BanStatusServiceStatusBanned;