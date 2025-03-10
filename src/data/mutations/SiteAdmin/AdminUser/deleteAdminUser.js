import {
    GraphQLString as StringType,
    GraphQLNonNull as NonNull
} from 'graphql';
import AdminUserType from '../../../types/siteadmin/AdminUserType';
import { AdminUser } from '../../../models';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const deleteAdminUser = {

    type: AdminUserType,

    args: {
        id: { type: new NonNull(StringType) }
    },

    async resolve({ request, response }, { id }) {
        try {
            if (request.user && request.user.admin) {
                const deleteAdminUser = await AdminUser.destroy({ where: { id } });
                return await {
                    status: deleteAdminUser ? 200 : 500,
                    errorMessage: deleteAdminUser ? null : showErrorMessage({ errorCode: 'loginError' })
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

export default deleteAdminUser;

/*

mutation ($id: String!) {
  deleteAdminUser (id: $id) {
    status
    errorMessage
  }
}
 
 

*/