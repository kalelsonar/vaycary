import { Reservation } from '../../../data/models';
import { createTransactionHistory } from '../../payment/payout/createTransactionHistory';
import showErrorMessage from '../../../helpers/showErrorMessage';
import { paymentTransfer } from '../../payment/payout/paymentTransfer';
import { getTransactionFee } from '../../payment/payout/getTransactionFee';

export async function paypalTransaction(reservationId, hostId, amount, currency, hostEmail, paymentAttempt, payoutId) {

  try {
    let paymentAmount = Math.round(amount);

    await Reservation.update({
      paymentAttempt: paymentAttempt + 1
    }, {
      where: {
        id: reservationId
      }
    });

    let addPayout, batchStatus, transactionId, getPayout, fees;
    addPayout = await paymentTransfer(reservationId, paymentAmount, currency, hostEmail);
    batchStatus = addPayout?.data?.batch_header?.batch_status;
    transactionId = addPayout?.data?.batch_header?.payout_batch_id;

    if (!["PENDING", "PROCESSING", "SUCCESS"].includes(batchStatus)) {
      return {
        status: 400,
        errorMessage: await showErrorMessage({ errorCode: 'commonError', error: addPayout?.errorMessage })
      };
    }

    getPayout = await getTransactionFee(transactionId);
    fees = getPayout?.data?.batch_header?.fees?.value;
    await createTransactionHistory(
      reservationId,
      hostEmail,
      payoutId,
      amount,
      fees,
      currency,
      hostId,
      transactionId,
      1
    );

    return {
      status: 200,
      errorMessage: null
    };
  } catch (error) {
    return {
      status: 400,
      errorMessage: await showErrorMessage({ errorCode: 'catchError', error })
    }
  }
}
