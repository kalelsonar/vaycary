import {
    GraphQLString as StringType,
    GraphQLInt as IntType,
    GraphQLNonNull as NonNull
} from 'graphql';
import { AdminUser, AdminRoles } from '../../../models';
import AdminUserType from '../../../types/siteadmin/AdminUserType';
import showErrorMessage from '../../../../helpers/showErrorMessage';

const createAdminUser = {

    type: AdminUserType,

    args: {
        id: { type: StringType },
        email: { type: new NonNull(StringType) },
        password: { type: StringType },
        roleId: { type: new NonNull(IntType) }
    },

    async resolve({ request, response }, {
        id,
        email,
        password,
        roleId
    }) {

        try {
            let isAlreadyExist, isValidRoleId;

            if (!request?.user || !request?.user?.admin) {
                return {
                    status: 500,
                    errorMessage: showErrorMessage({ errorCode: 'loginError' })
                };
            }

            isAlreadyExist = await AdminUser.findOne({
                attributes: ['id', 'email'],
                where: {
                    email
                },
                raw: true
            });

            isValidRoleId = await AdminRoles.findOne({
                attributes: ['id'],
                where: {
                    id: roleId
                }
            });

            if (!isValidRoleId) {
                return {
                    status: 400,
                    errorMessage: showErrorMessage({ errorCode: 'invalidRoleId' })
                };
            }

            if (id) { // Update
                if (isAlreadyExist && isAlreadyExist.id != id) {
                    return {
                        status: 400,
                        errorMessage: showErrorMessage({ errorCode: 'existEmail' })
                    };
                } else {
                    const updateUser = await AdminUser.update({
                        email,
                        roleId
                    }, {
                        where: {
                            id
                        }
                    });

                    if (password && password.toString().trim() != '') {
                        await AdminUser.update({
                            password: AdminUser.generateHash(password)
                        }, {
                            where: {
                                id
                            }
                        });
                    }

                    return {
                        status: updateUser ? 200 : 400,
                        errorMessage: updateUser ? null : showErrorMessage({ errorCode: 'commonError' })
                    };
                }
            } else { // Create
                if (isAlreadyExist) {
                    return {
                        status: 400,
                        errorMessage: showErrorMessage({ errorCode: 'existEmail' })
                    };
                } else {
                    const createUser = await AdminUser.create({
                        email,
                        password: AdminUser.generateHash(password),
                        isSuperAdmin: false,
                        roleId
                    });

                    return {
                        status: createUser ? 200 : 400,
                        errorMessage: createUser ? null : showErrorMessage({ errorCode: 'commonError' })
                    };
                }
            }

        } catch (error) {
            return {
                status: 500,
                errorMessage: showErrorMessage({ errorCode: 'catchError', error: error.message })
            };
        }
    }
}

export default createAdminUser;