import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLBoolean as BooleanType,
    GraphQLFloat as FloatType,
} from 'graphql';

const EditCancellationType = new ObjectType({
    name: 'EditCancellationType',
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
            type: StringType
        },
        accommodationBeforeCheckIn: {
            type: StringType
        },
        accommodationDuringCheckIn: {
            type: StringType
        },
        guestFeePriorCheckIn: {
            type: StringType
        },
        guestFeeBeforeCheckIn: {
            type: StringType
        },
        guestFeeDuringCheckIn: {
            type: StringType
        },
        hostFeePriorCheckIn: {
            type: StringType
        },
        hostFeeBeforeCheckIn: {
            type: StringType
        },
        hostFeeDuringCheckIn: {
            type: StringType
        },
        isEnable: {
            type: BooleanType
        },
        status: {
            type: StringType
        },
        nonRefundableNightsPriorCheckIn: {
            type: StringType
        },
        nonRefundableNightsBeforeCheckIn: {
            type: StringType
        },
        nonRefundableNightsDuringCheckIn: {
            type: StringType
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

export default EditCancellationType;