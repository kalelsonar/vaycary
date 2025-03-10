import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLBoolean,
} from 'graphql';
import { Listing, User, UserProfile } from '../models';
import ProfileType from './ProfileType';
import ShowListingType from './ShowListingType';
import UserType from './UserType';


const InquiryDetailsType = new ObjectType({
    name: 'InquiryDetails',
    fields: {
        id: {
            type: IntType
        },
        listId: {
            type: IntType
        },
        host: {
            type: StringType
        },
        guest: {
            type: StringType
        },
        createdAt: {
            type: StringType
        },
        updatedAt: {
            type: StringType
        },
        isRead: {
            type: GraphQLBoolean
        },
        messageUpdatedDate: {
            type: StringType
        },
        guestProfile:{
            type: ProfileType,
            resolve(threads) {
                return UserProfile.findOne({ where: { userId: threads.guest } });
            }
        },
        hostProfile:{
            type: ProfileType,
            resolve(threads) {
                return UserProfile.findOne({ where: { userId: threads.host } });
            }
        },
        listData: {
            type: ShowListingType,
            resolve(threads) {
                return Listing.findOne({ where: { id: threads.listId } });
            }
        },
        hostUserData: {
            type: UserType,
            resolve(threads) {
                return User.findOne({ where: { id: threads.host } });
            }
        },
        guestUserData: {
            type: UserType,
            resolve(threads) {
                return User.findOne({ where: { id: threads.guest } });
            }
        },
    }
});

export default InquiryDetailsType;