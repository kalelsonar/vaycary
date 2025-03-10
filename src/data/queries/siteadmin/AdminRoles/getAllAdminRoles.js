import {
  GraphQLInt as IntType
} from 'graphql';
import { AdminRoles } from '../../../models';
import AdminRoleCommonType from '../../../types/siteadmin/AdminRoleCommonType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const getAllAdminRoles = {

  type: AdminRoleCommonType,

  args: {
    currentPage: { type: IntType },
  },

  async resolve({ request }, { currentPage }) {
    try {

      let limit = 10, offset = 0;

      if (currentPage) offset = (currentPage - 1) * limit;

      const results = await AdminRoles.findAll({
        limit,
        offset,
        order: [['id', 'DESC']],
      });

      const count = await AdminRoles.count({});

      return {
        results,
        count,
        status: 200
      };

    } catch (error) {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: 'catchError', error })
      };
    }
  }
};

export default getAllAdminRoles;

/**
query {
  getAllAdminRoles {
    id
    name
    description
    createdAt
    updatedAt
    privileges
  }
}

**/