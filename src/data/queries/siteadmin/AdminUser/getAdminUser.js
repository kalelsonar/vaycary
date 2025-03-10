import { AdminUser } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const getAdminUser = {

  type: AdminUserType,

  async resolve({ request }) {
    if (request.user && request.user.admin === true) {
      return await AdminUser.findOne({
        where: {
          id: request.user.id
        }
      });
    } else {
      return {
        status: 500,
        errorMessage: showErrorMessage({ errorCode: 'loginError' })
      }
    }
  }
};

export default getAdminUser;

/**
query {
  getAdminUser {
    id
    email
    isSuperAdmin
    roleId
    createdAt
    updatedAt
    adminRole {
      id
      privileges
    }
    status
    errorMessage
  }
}

**/