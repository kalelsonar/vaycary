import {
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import AdminRolesType from '../../../types/siteadmin/AdminRolesType';
import { AdminRoles, AdminPrivileges, AdminUser } from '../../../models';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const deleteAdminRole = {

    type: AdminRolesType,

    args: {
        id: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, { id }) {
        try {
            if (request.user && request.user.admin) {
                let isAdminUsing = await AdminUser.findOne({
                    attributes: ['id'],
                    where: {
                        roleId: id
                    }
                });
                if (isAdminUsing) {
                    return await {
                        status: 400,
                        errorMessage: showErrorMessage({ errorCode: 'adminUser' })
                    };
                } else {
                    await AdminRoles.destroy({ where: { id } });
                    await AdminPrivileges.destroy({ where: { roleId: id } });
                    return await {
                        status: 200
                    };
                }
            } else {
                return {
                    status: 500,
                    errorMessage: showErrorMessage({ errorCode: 'loginError' })
                };
            }
        } catch (error) {
            return {
                status: 400,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error })
            }
        }
    }
}

export default deleteAdminRole;

/*

mutation ($id: Int!) {
  deleteAdminRole (id: $id) {
    status
    errorMessage
  }
}
 
 

*/