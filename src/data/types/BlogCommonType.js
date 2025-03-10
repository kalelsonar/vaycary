import {
    GraphQLObjectType as ObjectType,
    GraphQLList as List,
    GraphQLString as StringType,
    GraphQLInt as IntType
} from 'graphql';
import BlogDetailsType from './BlogDetailsType';

const BlogCommonType = new ObjectType({
    name: 'BlogCommonType',
    fields: {
        result: {
            type: BlogDetailsType
        },
        results: {
            type: new List(BlogDetailsType)
        },
        count: {
            type: IntType
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        }
    }
});

export default BlogCommonType;