import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql';
import PopularLocationType from './PopularLocationType';

const PopularLocationCommonType = new ObjectType({
    name: 'PopularLocationCommonType',
    fields: {
        result: {
            type: PopularLocationType
        },
        results: {
            type: new List(PopularLocationType)
        },
        count: {
            type: IntType
        },
        status: {
            type: IntType
        }
    }
});

export default PopularLocationCommonType;