import axios from 'axios';
import { getConfigurationData } from '../../email/helpers/getUserEmail';
import { payPalUrls } from '../helpers/paymentURL';

export async function generatePaypalAccessToken() {
    let configData = await getConfigurationData({ name: ['paypalClientId', 'paypalSecret', 'paypalHost'] });
    let CLIENT_ID = configData?.paypalClientId, APP_SECRET = configData?.paypalSecret;
    const auth = Buffer.from(CLIENT_ID + ':' + APP_SECRET).toString('base64'), base = configData?.paypalHost;

    const payPal = await payPalUrls();

    try {
        const response = await axios.post(`${payPal?.tokenURL}`, 'grant_type=client_credentials', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${auth}`,
            },
        });
        const data = response?.data;
        return {
            status: 200,
            accessToken: data.access_token
        };

    } catch (error) {
        console.error("Error generating PayPal access token:", error);
        return (
            {
                status: 400,
                errorMessage: error?.response?.data?.message || error?.response?.data?.error_description || "Oops!, something went wrong, please try again."
            }
        )
    }
}