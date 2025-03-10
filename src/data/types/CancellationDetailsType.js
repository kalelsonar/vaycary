import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLFloat as FloatType,
    GraphQLBoolean as BooleanType,
} from 'graphql';

const CancellationDetailsType = new ObjectType({
    name: 'CancellationDetails',
    fields: {
        id: { type: IntType },
        reservationId: { type: IntType },
        cancellationPolicy: { type: StringType },
        refundToGuest: { type: FloatType },
        payoutToHost: { type: FloatType },
        guestServiceFee: { type: FloatType },
        hostServiceFee: { type: FloatType },
        total: { type: FloatType },
        currency: { type: StringType },
        status: { type: StringType },
        createdAt: { type: StringType },
        cancelledBy: { type: StringType },
        isTaxRefunded: { type: BooleanType }
    }
});

export default CancellationDetailsType;