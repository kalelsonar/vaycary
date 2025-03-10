import {
  GraphQLInt as IntType
} from 'graphql';
import { AdminUser } from '../../../models';
import AdminUserCommonType from '../../../types/siteadmin/AdminUserCommonType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const getAllAdminUsers = {

  type: AdminUserCommonType,

  args: {
    currentPage: { type: IntType },
  },

  async resolve({ request }, { currentPage }) {
    try {

      let limit = 10, offset = 0, where;
      if (currentPage) offset = (currentPage - 1) * limit;

      where = {
        isSuperAdmin: {
          $ne: true
        }
      }

      const results = await AdminUser.findAll({
        where,
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      });

      const count = await AdminUser.count({
        where
      });

      return {
        results,
        count,
        status: 200
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'catchError', error })
      };
    }
  }
};

export default getAllAdminUsers;

/**
query {
  getAllAdminUsers {
    id
    email
    isSuperAdmin
    roleId
    createdAt
    updatedAt
    adminRole {
      id
      name
      description
      createdAt
      updatedAt
      privileges
    }
  }
}

**/