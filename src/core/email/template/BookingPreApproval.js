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

class BookingPreApproval extends React.Component {

    static propTypes = {
        content: PropTypes.shape({
            guestName: PropTypes.string.isRequired,
            hostName: PropTypes.string.isRequired,
            threadId: PropTypes.number.isRequired,
            listTitle: PropTypes.number.isRequired,
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
        const { content: { guestName, hostName, threadId, listTitle, logo, siteName } } = this.props;
        let contactURL = url + '/message/' + threadId + '/guest';

        return (
            <Layout>
                <Header color={PRIMARYCOLOR} backgroundColor="#F7F7F7" logo={logo} siteName={siteName} />
                <Body textStyle={textStyle}>
                    <div>
                        Hi {guestName},
                    </div>
                    <EmptySpace height={20} />
                    <div>
                        {hostName} has pre-approved your request for {listTitle}.
                        You can go ahead and <a style={linkText} href={contactURL}>book</a> the pre-approved dates now.
                    </div>
                    <EmptySpace height={20} />
                    <EmailSignature siteName={siteName} />
                </Body>
                <Footer siteName={siteName} />
                <EmptySpace height={20} />
            </Layout>
        );
    }

}

export default BookingPreApproval;