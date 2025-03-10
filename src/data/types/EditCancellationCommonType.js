import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List
} from 'graphql';

import EditCancellationType from './EditCancellationType';

const EditCancellationCommonType = new ObjectType({

    name: 'EditCancellationCommonType',

    fields: {
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        result: {
            type: EditCancellationType
        },
        results: {
            type: new List(EditCancellationType)
        },
    }

});

export default EditCancellationCommonType;