import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as List,
  GraphQLInt as IntType
} from 'graphql';

import ShowListingType from './ShowListingType';

const searchListingType = new ObjectType({
  name: 'SearchListing',
  fields: {
    count: { type: StringType },
    searchCount: { type: IntType },
    offset: { type: IntType },
    loadCount: { type: IntType },
    results: { type: new List(ShowListingType) },
    status: { type: StringType },
  },
});

export default searchListingType;