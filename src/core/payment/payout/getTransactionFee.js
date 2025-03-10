import axios from 'axios';
import { payment } from '../../../config';
import { getConfigurationData } from '../../email/helpers/getUserEmail';
import { generatePaypalAccessToken } from '../paypal/generatePaypalAccessToken';

export async function getTransactionFee(batchId) {
  try {
    let configData = await getConfigurationData({ name: ['paypalHost'] });
    const base = configData?.paypalHost;
    const { accessToken, status, errorMessage } = await generatePaypalAccessToken();

    if (status !== 200 || !accessToken) {
      return {
        status,
        errorMessage
      }
    }
    const url = `${base}${payment?.paypal?.versions?.versionOne}${payment?.paypal?.payout_url}/${batchId}`;

    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response?.data;
    return data;
  } catch (error) {
    console.error("Error capturing Payout payment:", error);
    return { status: 400, errorMessage: error?.message };
  }
}