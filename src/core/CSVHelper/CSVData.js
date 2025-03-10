import moment from 'moment';
import {
    Currencies,
    CurrencyRates
} from '../../data/models';
import sequelize from '../../data/sequelize';
import { convert } from '../../helpers/currencyConvertion';
import { getUserData, getInquiryData, getListingData, getReservationData } from './CSVHelpers';

const generatekeywordFilter = (data, table, attribute, value) => ({
    $in: [sequelize.literal(`SELECT ${data} FROM ${table} WHERE ${attribute} like '%${value}%'`)]
});

const generateLikeCondition = (attribute, value) => ({
    [attribute]: { $like: '%' + value + '%' }
});

const users = async (keyword, userType) => {

    let userTypeFilter = {}, keywordFilter = {}, userTypeValues;

    userTypeValues = [sequelize.literal(`SELECT DISTINCT userId FROM Listing`)]

    userTypeFilter = userType ? ({ id: userType === '1' ? { $notIn: userTypeValues } : { $in: userTypeValues } }) : {};

    if (keyword?.length > 0 && keyword.toString().trim() != '') {
        let getDate = moment(keyword).format('YYYY-MM-DD');

        keywordFilter = {
            id: {
                $or: [
                    generatekeywordFilter('userId', 'UserProfile', 'firstName', keyword),
                    generatekeywordFilter('userId', 'UserProfile', 'lastName', keyword),
                    generatekeywordFilter('userId', 'UserProfile', 'phoneNumber', keyword),
                    generatekeywordFilter('userId', 'UserProfile', 'createdAt', getDate),
                    generatekeywordFilter('id', 'User', 'email', keyword)
                ]
            }
        };
    }

    const dataItems = await getUserData({ userTypeFilter, keywordFilter })

    return dataItems;
}

const reservations = async (search, toCurrency, searchType) => {
    try {
        let isRefunded = `SELECT id FROM Transaction WHERE reservationId = Reservation.id AND paymentType = 'cancellation'`,
            refundAmount = `SELECT refundToGuest FROM CancellationDetails WHERE reservationId = Reservation.id`,
            isPaidOut = `SELECT id FROM TransactionHistory WHERE reservationId = Reservation.id LIMIT 1`,
            payoutAmount = `SELECT payoutToHost FROM CancellationDetails WHERE reservationId = Reservation.id`;

        let paymentStateFilter = { paymentState: 'completed' }, searchFilter = {}, resultData = [], rates = {},
            reservationFilter = {};

        if (search) {

            searchFilter = {
                $or: [
                    generateLikeCondition('confirmationCode', search),
                    generateLikeCondition('reservationState', search),
                    generateLikeCondition('id', search),
                    { listId: { $in: [sequelize.literal(`SELECT id FROM Listing WHERE title LIKE '%${search}%'`)] } }
                ]
            };
        }

        if (searchType && searchType != '') {
            reservationFilter = {
                reservationState: searchType
            }
        }

        const result = await getReservationData({
            isRefunded, refundAmount, isPaidOut, payoutAmount,
            paymentStateFilter, searchFilter, reservationFilter
        })

        if (result.length <= 0) return [];

        const data = await CurrencyRates.findAll();
        const base = await Currencies.findOne({ where: { isBaseCurrency: true } });

        if (data) data.map((item) => rates[item.dataValues.currencyCode] = item.dataValues.rate);

        resultData = result.map((reservation, key) => {
            return getCompletedResult({ data, base, rates, reservation, toCurrency });
        });

        return resultData;

    } catch (error) {
        console.error(error);
        return [];
    }
}

const listings = async (search) => {
    try {
        let searchFilter = {};
        if (search) {
            let getDate = moment(search).format('YYYY-MM-DD');

            searchFilter = {
                $or: [
                    generateLikeCondition('title', search),
                    generateLikeCondition('city', search),
                    generateLikeCondition('state', search),
                    generateLikeCondition('country', search),
                    generateLikeCondition('street', search),
                    generateLikeCondition('buildingName', search),
                    { createdAt: { $in: [sequelize.literal(`SELECT createdAt FROM Listing WHERE createdAt like '%${getDate}%'`)] } },
                    {
                        userId: {
                            $in: [
                                sequelize.literal(`
                                    SELECT 
                                        id 
                                    FROM 
                                        User AS user LEFT OUTER JOIN UserProfile AS profile 
                                    ON 
                                        user.id=profile.userId 
                                    WHERE 
                                        profile.firstName like '%${search}%' 
                                    OR 
                                        user.email like '%${search}%'
                                    OR
                                        Listing.id like '%${search}'
            `)
                            ]
                        }
                    }
                ]
            }
        }

        const result = await getListingData({ searchFilter });

        return result;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getCompletedResult = ({ base, rates, reservation, toCurrency }) => {

    let bookingStatus = reservation['Booking Status'], checkIn, checkOut;

    bookingStatus = bookingStatus == 'cancelled' ? 'canceled' : bookingStatus
    checkIn = moment(reservation['Check-in']).format('YYYY-MM-DD');
    checkOut = moment(reservation['Check-out']).format('YYYY-MM-DD');

    return {
        'Reservation ID': reservation['Reservation ID'],
        'Code': reservation['Code'] ? reservation['Code'] : '-',
        'Booking Status': bookingStatus,
        'List Title': reservation['List Title'] ? reservation['List Title'] : '-',
        'Refund to Guest': reservation['Refund to Guest'] ? reservation['Refund to Guest'] : '-',
        'Sub Total': reservation['Sub Total'] > 0 ? (convert(base?.symbol, rates, reservation['Sub Total'], reservation['Currency'], toCurrency)).toFixed(2) : reservation['Sub Total'],
        'Currency': toCurrency,
        'Payout': reservation['Payout'] ? reservation['Payout'] : '-',
        'Check-in': checkIn,
        'Check-out': checkOut,
        'Guest Name': reservation['Guest Name'] ? reservation['Guest Name'] : '-',
        'Host Name': reservation['Host Name'] ? reservation['Host Name'] : '-',
        'Guest Email': reservation['Guest Email'] ? reservation['Guest Email'] : '-',
        'Host Phone number': reservation['Host Phone Number'] ? reservation['Host Phone Number'] : '-',
        'Host Email': reservation['Host Email'] ? reservation['Host Email'] : '-',
        'Guest Service Fee': reservation['Guest Service Fee'] ? reservation['Guest Service Fee'] : '-',
        'Host Serveice Fee': reservation['Host Service Fee'] ? reservation['Host Service Fee'] : '-',
        'Taxes': reservation['Tax'] ? reservation['Tax'] : '-'
    };
}

const inquiry = async (search) => {
    try {
        let searchFilter = {};
        searchFilter = {
            type: "inquiry",
            status: {
                $or: [
                    {
                        $in: ['inquiry', 'preApproved']
                    },
                    {
                        $eq: null
                    }
                ]
            },
        }
        if (search) {
            searchFilter = {
                $or: [
                    generateLikeCondition('id', search),
                    generateLikeCondition('status', search),
                    {
                        threadId: {
                            $or: [
                                {
                                    $in: [
                                        sequelize.literal(`SELECT id from Threads where listId = (SELECT id from Listing where title like "%${search}%")`)
                                    ]
                                },
                                {
                                    $in: [
                                        sequelize.literal(`SELECT id from Threads where host = (SELECT id from User where email like "%${search}%") or guest = (SELECT id from User where email like "%${search}%")`)
                                    ]
                                }
                            ]
                        }
                    }
                ],
                type: "inquiry"
            }
        };

        const result = await getInquiryData({ searchFilter })

        return result

    } catch (error) {
        return [];
    }
}

export {
    users,
    reservations,
    listings,
    getCompletedResult,
    inquiry
}