import { TransactionHistory } from '../../../data/models';

export async function createTransactionHistory(
  reservationId,
  hostEmail,
  payoutId,
  amount,
  fees,
  currency,
  userId,
  transactionId,
  paymentMethodId
) {
  await TransactionHistory.create({
    reservationId,
    payoutId,
    payoutEmail: hostEmail,
    amount,
    fees,
    currency,
    userId,
    transactionId,
    paymentMethodId
  });
}