import {
    CREATE_ADMIN_USER_START,
    CREATE_ADMIN_USER_SUCCESS,
    CREATE_ADMIN_USER_ERROR,
    DELETE_ADMIN_USER_START,
    DELETE_ADMIN_USER_SUCCESS,
    DELETE_ADMIN_USER_ERROR,
    GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS,
    GET_ADMIN_USER_ERROR
} from '../../../constants';
import { gql } from 'react-apollo';
import query from '../../../routes/siteadmin/adminUser/adminUserQuery.graphql';
import showToaster from '../../../helpers/showToaster';
import { setRuntimeVariable } from '../../runtime';
import { closeAdminUserModal } from '../modalActions';
import { getAllAdminPrivilegesId } from '../../../helpers/adminPrivileges';

const mutation = gql`
    mutation ($id: String, $email: String!, $password: String, $roleId: Int!) {
        createAdminUser (id: $id, email: $email, password: $password, roleId: $roleId) {
        status
        errorMessage
        }
    }
`;

const deleteMutation = gql`
    mutation ($id: String!) {
        deleteAdminUser (id: $id) {
        status
        errorMessage
        }
    }
`;

const getAdminUserQuery = gql`
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
`;

export function createAdminUser(
    id,
    email,
    password,
    roleId,
    currentPage
) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: CREATE_ADMIN_USER_START,
            payload: {
                createAdminUserLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    email,
                    password,
                    roleId
                },
                refetchQueries: [{ query, variables: { currentPage } }]
            });

            if (data?.createAdminUser?.status === 200) {
                await dispatch({
                    type: CREATE_ADMIN_USER_SUCCESS,
                    payload: {
                        createAdminUserLoading: false
                    }
                });
                dispatch(closeAdminUserModal());
                let requestContent = id ? 'updated' : 'added'
                showToaster({ messageId: 'addAdminRole', toasterType: 'success', requestContent })
            } else {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.createAdminUser?.errorMessage })
                await dispatch({
                    type: CREATE_ADMIN_USER_ERROR,
                    payload: {
                        createAdminUserLoading: false,
                        error: data?.createAdminUser?.errorMessage
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: CREATE_ADMIN_USER_ERROR,
                payload: {
                    createAdminUserLoading: false,
                    error
                }
            });
        }
    }
}

export function deleteAdminUser(id) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: DELETE_ADMIN_USER_START,
            payload: {
                deleteAdminUserLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation: deleteMutation,
                variables: {
                    id
                },
                refetchQueries: [{ query }]
            });

            if (data?.deleteAdminUser?.status === 200) {
                await dispatch({
                    type: DELETE_ADMIN_USER_SUCCESS,
                    payload: {
                        deleteAdminUserLoading: false
                    }
                });
                dispatch(closeAdminUserModal());
                showToaster({ messageId: 'deleteAdminUser', toasterType: 'success' })
            } else {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.deleteAdminUser?.errorMessage })
                await dispatch({
                    type: DELETE_ADMIN_USER_ERROR,
                    payload: {
                        deleteAdminUserLoading: false,
                        error: data?.deleteAdminUser?.errorMessage
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: DELETE_ADMIN_USER_ERROR,
                payload: {
                    deleteAdminUserLoading: false,
                    error
                }
            });
        }
    }
}

export function getAdminUser() {
    return async (dispatch, getState, { client }) => {
        let adminPrivileges;
        let defaultPrivileges = getAllAdminPrivilegesId();

        try {
            await dispatch({
                type: GET_ADMIN_USER_START,
                payload: {
                    getAdminUserLoading: true
                }
            });

            const { data } = await client.query({
                query: getAdminUserQuery
            });

            if (data?.getAdminUser?.id) {
                dispatch(setRuntimeVariable({
                    name: 'isSuperAdmin',
                    value: data?.getAdminUser?.isSuperAdmin
                }));

                adminPrivileges = {
                    id: data?.getAdminUser?.id,
                    email: data?.getAdminUser?.email,
                    isSuperAdmin: data?.getAdminUser?.isSuperAdmin,
                    roleId: data?.getAdminUser?.roleId,
                    privileges: (data?.getAdminUser?.adminRole?.privileges) || []
                };

                if (adminPrivileges && adminPrivileges?.isSuperAdmin) {
                    adminPrivileges['privileges'] = defaultPrivileges;
                }

                await dispatch({
                    type: GET_ADMIN_USER_SUCCESS,
                    payload: {
                        getAdminUserLoading: false,
                        adminPrivileges
                    }
                });

                return adminPrivileges;
            } else {
                await dispatch({
                    type: GET_ADMIN_USER_SUCCESS,
                    payload: {
                        getAdminUserLoading: false,
                        error: data?.getAdminUser?.errorMessage
                    }
                });
                return false;
            }
        } catch (error) {
            await dispatch({
                type: GET_ADMIN_USER_ERROR,
                payload: {
                    getAdminUserLoading: false,
                    error
                }
            });
            return false;
        }
    }
}