import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLInt as IntType
} from 'graphql';
import CurrenciesType from './CurrenciesType';

const CurrencyListType = new ObjectType({
    name: 'CurrencyListType',
    fields: {
        result: {
            type: CurrenciesType
        },
        results: {
            type: new List(CurrenciesType)
        },
        count: {
            type: IntType
        }
    }
});

export default CurrencyListType;