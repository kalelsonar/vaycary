import { gql } from 'react-apollo';
import showToaster from '../../../helpers/showToaster';
import query from '../../../routes/siteadmin/adminRoles/adminRolesQuery.graphql';
import { closeAdminRolesModal } from '../modalActions';
import {
    CREATE_ADMIN_ROLES_START,
    CREATE_ADMIN_ROLES_SUCCESS,
    CREATE_ADMIN_ROLES_ERROR,
    DELETE_ADMIN_ROLES_START,
    DELETE_ADMIN_ROLES_SUCCESS,
    DELETE_ADMIN_ROLES_ERROR
} from '../../../constants';

const mutation = gql`
    mutation ($id: Int, $name: String!, $description: String, $privileges: [Int]!) {
        createAdminRole (id: $id, name: $name, description: $description, privileges: $privileges) {
            status
            errorMessage
        }
    }
`;

const deleteMutation = gql`
    mutation ($id: Int!) {
        deleteAdminRole(id: $id) {
            status
            errorMessage
        }
    }
`;

export function createAdminRole(
    id,
    name,
    description,
    privileges,
    currentPage
) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: CREATE_ADMIN_ROLES_START,
            payload: {
                createAdminRoleLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    name,
                    description,
                    privileges
                },
                refetchQueries: [{ query, variables: { currentPage } }]
            });

            if (data?.createAdminRole?.status === 200) {
                await dispatch({
                    type: CREATE_ADMIN_ROLES_SUCCESS,
                    payload: {
                        createAdminRoleLoading: false
                    }
                });
                dispatch(closeAdminRolesModal());
                let requestContent = id ? 'updated' : 'added'
                showToaster({ messageId: 'addAdminRole', toasterType: 'success', requestContent })
            } else {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.createAdminRole?.errorMessage })
                await dispatch({
                    type: CREATE_ADMIN_ROLES_ERROR,
                    payload: {
                        createAdminRoleLoading: false,
                        error: data?.createAdminRole?.errorMessage
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: CREATE_ADMIN_ROLES_ERROR,
                payload: {
                    createAdminRoleLoading: false,
                    error
                }
            });
        }
    }
}

export function deleteAdminRole(id) {
    return async (dispatch, getState, { client }) => {
        await dispatch({
            type: DELETE_ADMIN_ROLES_START,
            payload: {
                deleteAdminRoleLoading: true
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

            if (data?.deleteAdminRole?.status === 200) {
                await dispatch({
                    type: DELETE_ADMIN_ROLES_SUCCESS,
                    payload: {
                        deleteAdminRoleLoading: false
                    }
                });
                dispatch(closeAdminRolesModal());
                showToaster({ messageId: 'deleteAdminRole', toasterType: 'success' })
            } else {
                showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.deleteAdminRole?.errorMessage })
                await dispatch({
                    type: DELETE_ADMIN_ROLES_ERROR,
                    payload: {
                        deleteAdminRoleLoading: false,
                        error: data?.deleteAdminRole?.errorMessage
                    }
                });
            }
        } catch (error) {
            await dispatch({
                type: DELETE_ADMIN_ROLES_ERROR,
                payload: {
                    deleteAdminRoleLoading: false,
                    error
                }
            });
        }
    }
}