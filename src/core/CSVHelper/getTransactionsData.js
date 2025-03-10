import moment from 'moment';
import sequelize from '../../data/sequelize';
import { TransactionHistory, Reservation, CurrencyRates, CancellationDetails, Currencies } from '../../data/models';
import { convert } from '../../helpers/currencyConvertion';

export function getFutureResult({ base, rates, reservation, toCurrency }) {
    let amount = reservation['cancellationDetails.payoutToHost'] || reservation['cancellationDetails.payoutToHost'] == 0 ? reservation['cancellationDetails.payoutToHost'] : (Number(reservation?.total) - Number(reservation?.hostServiceFee));
    return {
        "Date": reservation?.checkIn ? moment(reservation?.checkIn).add(1, 'days').format('MM-DD-YYYY') : 'Pending',
        "Check In": reservation?.checkIn != null ? moment(reservation?.checkIn).format('MMM DD, YYYY') : '-',
        "Check Out": reservation?.checkOut != null ? moment(reservation?.checkOut).format('MMM DD, YYYY') : '-',
        "Currency": toCurrency,
        "Amount": amount > 0 ? (convert(base.symbol, rates, amount, reservation?.currency, toCurrency)).toFixed(2) : 0,
        "Payout Account": reservation?.payoutAccount ? reservation?.payoutAccount : "Default",
        "Title": reservation?.title ? reservation?.title : '-',
        "First Name": reservation?.firstName ? reservation?.firstName : '-',
        "Confirmation Code": reservation?.confirmationCode
    };
}

export function getGrossResult({ base, rates, reservation, toCurrency }) {
    let amount = reservation['cancellationDetails.payoutToHost'] || reservation['cancellationDetails.payoutToHost'] == 0 ? reservation['cancellationDetails.payoutToHost'] : (reservation?.total - reservation?.hostServiceFee);
    let currency = reservation.currency;
    if (reservation.reservationState == 'cancelled'){
        currency = reservation['cancellationDetails.currency'];
    } 
    return {
        "Date": reservation['transactionHistory.createdAt'] ? moment(reservation['transactionHistory.createdAt']).format('DD-MM-YYYY') : 'Pending',
        "Check In": reservation?.checkIn != null ? moment(reservation?.checkIn).format('MMM DD, YYYY') : '-',
        "Check Out": reservation?.checkOut != null ? moment(reservation?.checkOut).format('MMM DD, YYYY') : '-',
        "Currency": toCurrency,
        "Amount": amount > 0 ? (convert(base.symbol, rates, amount, currency, toCurrency)).toFixed(2) : amount,
        "Confirmation Code": reservation?.confirmationCode
    };
}

export function getCompletedResult({ base, rates, reservation, toCurrency }) {
    let transactionAmount = reservation['transactionHistory.amount'] && reservation['transactionHistory.amount'],
        total = Number(reservation?.total) - Number(reservation?.hostServiceFee), currency = reservation.currency;
    if (reservation.reservationState == 'cancelled'){
        total = reservation['cancellationDetails.payoutToHost'];
        currency = reservation['cancellationDetails.currency'];
    } 

    return {
        "Date": reservation?.createdAt != null ? moment(reservation?.createdAt).format('DD-MM-YYYY') : '-',
        "Transaction Created": reservation['transactionHistory.createdAt'] ? moment(reservation['transactionHistory.createdAt']).format('DD-MM-YYYY') : '-',
        "Transfer to": reservation['transactionHistory.payoutEmail'] ? reservation['transactionHistory.payoutEmail'] : '-',
        "Currency": toCurrency,
        "Transaction Amount": transactionAmount > 0 ? (convert(base.symbol, rates, transactionAmount, reservation['transactionHistory.currency'], toCurrency)).toFixed(2) : transactionAmount,
        "Check In": reservation?.checkIn != null ? moment(reservation?.checkIn).format('MMM DD, YYYY') : '-',
        "Check Out": reservation?.checkOut != null ? moment(reservation?.checkOut).format('MMM DD, YYYY') : '-',
        "Total Amount": total > 0 ? (convert(base.symbol, rates, total, currency, toCurrency)).toFixed(2) : total,
        "Confirmation Code": reservation?.confirmationCode,
        "Title": reservation?.title ? reservation?.title : '-',
        "First Name": reservation?.firstName ? reservation?.firstName : '-'
    };
}

export async function getTransactions({ hostId, toCurrency, type, listId, payoutId, searchKey }) {
    try {
        let rates = {}, result = [],
            transactionHistoryFilter = {}, listingFilter = {}, searchFilter = {}, payoutFilter = {};

        if ((type === 'completed' || type === 'grossEarnings')) {
            payoutFilter = {
                $or: [
                    {
                        reservationState: 'completed'
                    }, {
                        reservationState: 'cancelled',
                        id: {
                            $in: [
                                sequelize.literal(`SELECT reservationId FROM CancellationDetails where payoutToHost > 0`)
                            ]
                        }
                    }
                ]
            };
            if (payoutId && payoutId > 0) transactionHistoryFilter = { id: { $in: [sequelize.literal(`SELECT reservationId FROM TransactionHistory where payoutId=${payoutId}`)] } };
        }
        else if (type === 'future') {
            payoutFilter = {
                reservationState: 'approved'
            };
            transactionHistoryFilter = { id: { $notIn: [sequelize.literal("SELECT reservationId FROM TransactionHistory")] } };
        }

        if (listId) listingFilter = { listId };
        if (searchKey) {
            searchFilter = {
                $or: [
                    {
                        listId: {
                            $in: [
                                sequelize.literal(`SELECT id FROM Listing WHERE title like '%${searchKey}%'`)
                            ]
                        }
                    },
                    {
                        guestId: {
                            $in: [
                                sequelize.literal(`SELECT userId FROM UserProfile WHERE firstName like '%${searchKey}%'`)
                            ]
                        }
                    },
                    {
                        id: {
                            $in: [
                                sequelize.literal(`SELECT id FROM Reservation WHERE confirmationCode like '%${searchKey}%'`)
                            ]
                        }
                    },
                ]
            }
        }

        const reservations = await Reservation.findAll({
            attributes: [
                'currency',
                'total',
                'hostServiceFee',
                'checkIn',
                'checkOut',
                'confirmationCode',
                'createdAt',
                'reservationState',
                [sequelize.literal(`(SELECT title FROM Listing WHERE id=Reservation.listId)`), 'title'],
                [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.guestId)`), 'firstName'],
                [
                    sequelize.literal(`(
                        SELECT 
                            CASE WHEN methodId=1
                                THEN payEmail
                            ELSE 
                                IF(methodId=2, CONCAT("******",last4Digits), "")
                            END
                        FROM 
                            Payout 
                        WHERE 
                            id=Reservation.payoutId AND isVerified=true
                        )`),
                    'payoutAccount'
                ]
            ],
            where: {
                $and: [
                    { hostId },
                    { paymentState: 'completed' },
                    transactionHistoryFilter,
                    listingFilter,
                    searchFilter,
                    payoutFilter
                ],
            },
            include: [
                {
                    model: TransactionHistory,
                    attributes: ['createdAt', 'amount', 'payoutEmail', 'currency'],
                    as: 'transactionHistory',
                    where: { userId: hostId },
                    required: false
                },
                {
                    model: CancellationDetails,
                    attributes: ['payoutToHost', 'currency'],
                    as: 'cancellationDetails',
                }
            ],
            order: [['checkIn', 'ASC']],
            raw: true
        });

        if (reservations.length <= 0) return [];

        const data = await CurrencyRates.findAll();
        const base = await Currencies.findOne({ where: { isBaseCurrency: true } });

        if (data) data.map((item) => rates[item.dataValues.currencyCode] = item.dataValues.rate);

        result = reservations.map((reservation, key) => {
            if (type === 'completed') return getCompletedResult({ data, base, rates, reservation, toCurrency });
            if (type === 'grossEarnings') return getGrossResult({ data, base, rates, reservation, toCurrency });
            if (type === 'future') return getFutureResult({ data, base, rates, reservation, toCurrency });
        });

        return result;

    } catch (error) {
        console.error(error);
        return [];
    }
}
