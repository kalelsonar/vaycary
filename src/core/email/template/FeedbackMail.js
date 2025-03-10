import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import EmailSignature from './EmailSignature';
import { PRIMARYCOLOR } from '../../../constants';

class FeedbackMail extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            message: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
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

        const { content: { message, type, name, logo, siteName } } = this.props;
        return (
            <Layout>
                <Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" logo={logo} siteName={siteName} />
                <Body textStyle={textStyle}>
                    <div>
                        Hi Admin,
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        {name} has sent you a {type} that {message}.
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

export default FeedbackMail;