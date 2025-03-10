import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLList as List
} from 'graphql';

// Models
import { CancellationDetails, Reservation, ThreadItems, Threads } from '../models';
// Types
import CancellationDetailsType from './CancellationDetailsType';
import InquiryDetailsType from './InquiryDetailsType';
import ReservationTypeForThread from './ReservationTypeForThread';

const ThreadItemsType = new ObjectType({
    name: 'ThreadItems',
    fields: {
        id: {
            type: IntType
        },
        threadId: {
            type: IntType
        },
        reservationId: {
            type: IntType
        },
        sentBy: {
            type: StringType
        },
        content: {
            type: StringType
        },
        type: {
            type: StringType
        },
        startDate: {
            type: StringType
        },
        endDate: {
            type: StringType
        },
        personCapacity: {
            type: IntType
        },
        isRead: {
            type: BooleanType
        },
        createdAt: {
            type: StringType
        },
        status: {
            type: StringType
        },
        userBanStatus: {
            type: IntType
        },
        status: {
            type: StringType
        },
        threadsData: {
            type: InquiryDetailsType,
            resolve(threadItems) {
                return Threads.findOne({ where: { id: threadItems.threadId } });
            }
        },
        cancelData: {
            type: CancellationDetailsType,
            resolve(threadItems) {
                return CancellationDetails.findOne({ where: { reservationId: threadItems.reservationId } });
            }
        },
        reservation: {
            type: ReservationTypeForThread,
            resolve(threadItems) {
                return Reservation.findOne({ where: { id: threadItems.reservationId } });
            }
        },
        data: {
            type: StringType,
            async resolve(threadItems) {
                const data = await ThreadItems.findOne({
                    where: {
                        threadId: threadItems.threadId,
                        type: {
                            $ne: 'inquiry'
                        },
                        startDate: threadItems.startDate,
                        endDate: threadItems.endDate,
                        id: {
                            $gt: threadItems.id
                        },
                        reservationId: null
                    },
                    order: [['createdAt', 'ASC']],
                    raw: true
                });
                if (data == null) return null;
                else if (data && data.type == "preApproved") return 'preApproved';
            }
        }
    }
});

export const InquiryType = new ObjectType({
    name: 'InquiryType',
    fields: {
        status: {
            type: StringType
        },
        inquiryData: {
            type: new List(ThreadItemsType)
        },
        inquiries: {
            type: ThreadItemsType
        },
        count: {
            type: IntType
        }
    }
})
export default ThreadItemsType;