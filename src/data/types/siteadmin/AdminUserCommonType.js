import {
    GraphQLObjectType as ObjectType,
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLList as List,
} from 'graphql';
import AdminUserType from './AdminUserType';

const AdminUserCommonType = new ObjectType({
    name: 'AdminUserCommonType',
    fields: {
        result: {
            type: AdminUserType
        },
        results: {
            type: new List(AdminUserType)
        },
        status: {
            type: IntType
        },
        errorMessage: {
            type: StringType
        },
        count: {
            type: IntType
        },
    }
});

export default AdminUserCommonType;