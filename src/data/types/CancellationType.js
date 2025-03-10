import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

const CancellationType = new ObjectType({
    name: 'Cancellation',
    fields: {
        id: {
            type: IntType
        },
        policyName: {
            type: StringType
        },
        policyContent: {
            type: StringType
        },
        priorDays: {
            type: IntType
        },
        accommodationPriorCheckIn: {
            type: FloatType
        },
        accommodationBeforeCheckIn: {
            type: FloatType
        },
        accommodationDuringCheckIn: {
            type: FloatType
        },
        guestFeePriorCheckIn: {
            type: FloatType
        },
        guestFeeBeforeCheckIn: {
            type: FloatType
        },
        guestFeeDuringCheckIn: {
            type: FloatType
        },
        hostFeePriorCheckIn: {
            type: FloatType
        },
        hostFeeBeforeCheckIn: {
            type: FloatType
        },
        hostFeeDuringCheckIn: {
            type: FloatType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        },
        nonRefundableNightsPriorCheckIn: {
            type: IntType
        },
        nonRefundableNightsBeforeCheckIn: {
            type: IntType
        },
        nonRefundableNightsDuringCheckIn: {
            type: IntType
        },
        subTitle: {
            type: StringType
        },
        subContent: {
            type: StringType
        },
        content1: {
            type: StringType
        },
        content2: {
            type: StringType
        },
        content3: {
            type: StringType
        },
    }
});

export default CancellationType;