import { User, UserProfile, ThreadItems, Listing, Reservation } from "../../data/models";
import sequelize from "../../data/sequelize";

const getUserData = async ({ userTypeFilter, keywordFilter }) => {

    const dataItems = await User.findAll({
        attributes: [
            [
                sequelize.literal(`
                    CASE WHEN profile.profileId IS NOT NULL
                        THEN profile.profileId
                    ELSE
                        '-'
                    END
                `),
                'Profile ID'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.firstName IS NOT NULL
                        THEN profile.firstName
                    ELSE
                        '-'
                    END
                `),
                'First Name'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.lastName IS NOT NULL
                        THEN profile.lastName
                    ELSE
                        '-'
                    END
                `),
                'Last Name'
            ],
            ['email', 'Email Address'],
            [
                sequelize.literal(`
                    CASE WHEN profile.countryCode IS NOT NULL AND profile.phoneNumber IS NOT NULL
                        THEN CONCAT(profile.countryCode, ' ', profile.phoneNumber)
                    ELSE
                        "-"
                    END
                `),
                'Phone Number'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.createdAt IS NOT NULL
                         THEN profile.createdAt
                    ELSE
                        "-"
                    END
                `),
                'Created Date'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.dateOfBirth IS NOT NULL
                         THEN profile.dateOfBirth
                    ELSE
                        "-"
                    END
                `),
                'Date of Birth'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.gender IS NOT NULL 
                        THEN profile.gender
                    ELSE 
                        "-"
                    END
                `),
                'Gender'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.info IS NOT NULL
                        THEN profile.info
                    ELSE
                        "-"
                    END 
                `),
                'Bio info'
            ],
            [
                sequelize.literal(`
                    CASE WHEN profile.location IS NOT NULL
                        THEN profile.location
                    ELSE
                        "-"
                    END
                `),
                'Location'
            ],
            [
                sequelize.literal(`
                    CASE WHEN userBanStatus=true
                        THEN 'Prohibit'
                    ELSE 
                        'Permit'
                    END
                `),
                'Action'
            ]
        ],
        where: {
            $and: [
                { userDeletedAt: null },
                userTypeFilter,
                keywordFilter
            ]
        },
        include: [{
            model: UserProfile,
            as: 'profile',
            attributes: []
        }],
        raw: true,
        order: [['createdAt', 'ASC']]
    });

    return dataItems;
}

const getInquiryData = async ({ searchFilter }) => {
    const result = await ThreadItems.findAll({
        attributes: [
            ['id', 'ID'],
            ['startDate', 'CheckIn'],
            ['endDate', 'CheckOut'],
            [sequelize.literal('(SELECT title FROM Listing WHERE id = (SELECT listId FROM Threads WHERE id = ThreadItems.threadId))'), 'List Title'],
            [sequelize.literal('(SELECT email FROM User WHERE id = ThreadItems.sentBy)'), 'Guest Email'],
            [sequelize.literal('(SELECT email FROM User WHERE id = (SELECT host FROM Threads WHERE id = ThreadItems.threadId))'), 'Host Email'],
            [sequelize.literal('TIMESTAMPDIFF(HOUR, createdAt, NOW())'), 'timeDiff'],
            [sequelize.literal('(SELECT firstName FROM UserProfile WHERE userId = ThreadItems.sentBy)'), 'Guest Name'],
            [
                sequelize.literal(`
                    CASE WHEN (SELECT phoneNumber FROM UserProfile WHERE userId = ThreadItems.sentBy) IS NOT NULL
                        THEN (
                            SELECT CONCAT(
                                (SELECT countryCode FROM UserProfile WHERE userId = ThreadItems.sentBy),
                                " ",
                                (SELECT phoneNumber FROM UserProfile WHERE userId = ThreadItems.sentBy))
                                )
                    ELSE 
                        '-'
                    END
                `),
                'Guest PhoneNumber'
            ],
            [sequelize.literal('(SELECT firstName FROM UserProfile WHERE userId = (SELECT host FROM Threads WHERE id = ThreadItems.threadId))'), 'Host Name'],
            [
                sequelize.literal(`
                    CASE WHEN (SELECT phoneNumber FROM UserProfile WHERE userId = (SELECT host FROM Threads WHERE id = ThreadItems.threadId)) IS NOT NULL
                        THEN (
                            SELECT CONCAT(
                              (SELECT countryCode FROM UserProfile WHERE userId = (SELECT host FROM Threads WHERE id = ThreadItems.threadId)),
                              " ",
                              (SELECT phoneNumber FROM UserProfile WHERE userId = (SELECT host FROM Threads WHERE id = ThreadItems.threadId))
                            )
                          )
                    ELSE 
                        '-'
                    END
                `),
                'Host PhoneNumber'
            ],
        ],
        where: { $and: [searchFilter] },
        order: [['createdAt', 'DESC']],
        having: {
            timeDiff: { lt: 24 }
        },
        raw: true
    });
    return result;
}

const getQuery = (column, separator) => {
    return sequelize.literal(`IF(${column} IS NULL OR ${column}="", "", CONCAT(${column},${separator}))`)
}

const getListingData = async ({ searchFilter }) => {

    const result = await Listing.findAll({
        attributes: [
            ['id', 'ID'],
            [
                sequelize.literal(`
                    CASE WHEN title IS NOT NULL
                        THEN title
                    ELSE
                        '-'
                    END
                `),
                'Title'
            ],
            [
                sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Listing.userId)`),
                'Host Name'
            ],
            [
                sequelize.literal(`(SELECT email FROM User WHERE id=Listing.userId)`),
                'Host Email'
            ],
            [
                sequelize.fn(
                    "concat",
                    getQuery('street', '", "'),
                    getQuery('buildingName', '", "'),
                    getQuery('city', '", "'),
                    getQuery('state', '", "'),
                    getQuery('country', '", "'),
                    getQuery('zipcode', '""')
                ),
                'Address'
            ],
            ['city', 'City'],
            ['state', 'State'],
            ['country', 'Country'],
            ['createdAt', 'Created Date'],
            [
                sequelize.literal(`
                    CASE WHEN (select id FROM Recommend where listId=Listing.id limit 1) IS NULL
                        THEN 'No'
                    ELSE 
                        'Yes'
                    END
                `),
                'Recommend'
            ],
            [
                sequelize.literal(`
                    CASE WHEN isPublished=true 
                        THEN 'Yes'
                    ELSE 
                        'No'
                    END
                `),
                'Published'
            ],
            [
                sequelize.literal(`
                    CASE WHEN isReady=true 
                        THEN 'Yes'
                    ELSE 
                        'No'
                    END
                `),
                'Ready'
            ]
        ],
        where: { $and: [searchFilter] },
        order: [['id', 'DESC']],
        raw: true,
    });
    return result;
}

const getReservationData = async ({
    isRefunded, refundAmount, isPaidOut, payoutAmount,
    paymentStateFilter, searchFilter, reservationFilter }) => {
    const result = await Reservation.findAll({
        attributes: [
            ['id', 'Reservation ID'],
            ['confirmationCode', 'Code'],
            ['reservationState', 'Booking Status'],
            ['guestServiceFee', 'Guest Service Fee'],
            ['hostServiceFee', 'Host Service Fee'],
            [sequelize.literal(`(SELECT title FROM Listing WHERE id=Reservation.listId)`), 'List Title'],
            [
                sequelize.literal(`
                    CASE WHEN reservationState='expired' OR reservationState='declined'
                        THEN IF((${isRefunded}) IS NULL,'Proceed Refund','Completed')
                    ELSE 
                        CASE WHEN reservationState='cancelled'
                            THEN IF((${isRefunded}) IS NULL, (IF((${refundAmount}) > 0,'Proceed Refund','Not Eligible')),'Completed')
                        ELSE
                            'Not Eligible'
                        END
                    END
                `),
                'Refund to Guest'
            ],
            ['currency', 'Currency'],
            [sequelize.literal(`total+guestServiceFee`), 'Sub Total'],
            [
                sequelize.literal(`
                    CASE WHEN (
                        SELECT 
                            id 
                        FROM 
                            Payout AS P 
                        WHERE 
                            userId=Reservation.hostId 
                        AND 
                            (
                                (P.default=true AND Reservation.payoutId IS NULL) 
                                OR 
                                (id=Reservation.payoutId AND id=Reservation.payoutId AND Reservation.payoutId IS NOT NULL)
                            )
                    ) is NULL
                        THEN "No Payout method"
                    ELSE 
                        CASE WHEN reservationState='expired' OR reservationState='declined'
                            THEN "Closed"
                        ELSE
                            CASE WHEN reservationState='cancelled'
                                THEN IF((${isPaidOut}) IS NULL, (IF((${payoutAmount}) > 0,'Ready To Pay','Closed')),'Completed')
                            ELSE
                                IF((${isPaidOut}) IS NULL, IF((DATEDIFF(Reservation.checkIn, NOW()) + 1) < 0,'Ready To Pay','Pending'), 'Completed')
                            END
                        END
                    END
                `),
                'Payout'
            ],
            ['checkIn', 'Check-in'],
            ['checkOut', 'Check-out'],
            [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.guestId)`), 'Guest Name'],
            [sequelize.literal(`(SELECT firstName FROM UserProfile WHERE userId=Reservation.hostId)`), 'Host Name'],
            [sequelize.literal(`(SELECT email FROM User WHERE id=Reservation.guestId)`), 'Guest Email'],
            [
                sequelize.literal(`
                CASE WHEN (SELECT phoneNumber FROM UserProfile WHERE userId=Reservation.hostId) IS NOT NULL
                THEN (
                    SELECT CONCAT(
                        (SELECT countryCode FROM UserProfile WHERE userId=Reservation.hostId),
                        " ",
                        (SELECT phoneNumber FROM UserProfile WHERE userId=Reservation.hostId)
                    ))
                    ELSE 
                        "-"
                    END
                `),
                'Host Phone Number'
            ],
            [sequelize.literal(`(SELECT email FROM User WHERE id = Reservation.hostId)`), 'Host Email'],
            ['taxPrice', 'Tax'],
        ],
        where: {
            $and: [
                paymentStateFilter,
                searchFilter,
                reservationFilter
            ]
        },
        order: [['createdAt', 'DESC']],
        raw: true,
    });

    return result;
}

export {
    getUserData,
    getInquiryData,
    getListingData,
    getReservationData
}