import axios from 'axios';
import { getConfigurationData } from '../../email/helpers/getUserEmail';
import { generatePaypalAccessToken } from './generatePaypalAccessToken';
import { isUnSupportedDecimalCurrency } from '../../../helpers/zeroDecimalCurrency';
import { payPalUrls } from '../helpers/paymentURL';

export async function createPayPalPayment(reservationId, total, currency) {
    let configData = await getConfigurationData({ name: ['paypalHost'] });
    const base = configData?.paypalHost;
    const { accessToken, status, errorMessage } = await generatePaypalAccessToken();

    if (status !== 200 || !accessToken) {
        return {
            status,
            errorMessage
        }
    }

    const payPal = await payPalUrls();
    const url = payPal?.paymentURL;

    const amount = isUnSupportedDecimalCurrency(currency) ? Math.round(total) : total;

    const purchaseUnits = [
        {
            amount: {
                currency_code: currency,
                value: amount
            }
        },
    ];
    purchaseUnits[0].reference_id = reservationId;

    const params = JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: purchaseUnits,
        payment_source: {
            paypal: {
                experience_context: {
                    return_url: payPal?.returnURL,
                    cancel_url: `${payPal?.cancelURL}?id=${reservationId}`
                }
            }
        }
    });
    try {
        const response = await axios.post(url, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const data = response?.data;

        if (response?.status == 201 || 200) {
            return ({ status: 200, data, errorMessage: null });
        } else {
            return ({ status: 400, errorMessage: data?.message });
        }
    } catch (error) {
        console.error("Error creating PayPal payment:", error);
        return (
            {
                status: error?.response?.status ? error?.response?.status : 400,
                errorMessage: error?.response?.data?.message || error?.response?.data?.error_description || "Oops!, something went wrong, please try again."
            }
        )
    }
}
