import { FailedTransactionHistory } from "../../../data/models"


export const failedTransactionHistory = async ({ reservationId, userId, amount, currency, reason, paymentMethodId }) => {

    let checkFailedTransaction = await FailedTransactionHistory.findOne({
        where: {
            reservationId
        },
        raw: true
    });

    if (!checkFailedTransaction) {
        await FailedTransactionHistory.create({
            reservationId,
            userId,
            amount,
            currency,
            reason,
            paymentMethodId,
            createdAt: new Date(),
            updatedAt: new Date()
        });

    } else {
        await FailedTransactionHistory.update({
            userId,
            amount,
            currency,
            reason,
            paymentMethodId,
            createdAt: new Date(),
            updatedAt: new Date()
        }, { where: { reservationId } });
    }
}