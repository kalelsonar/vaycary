import { gql } from 'react-apollo';

import {
    DELETE_WISH_LIST_GROUP_START,
    DELETE_WISH_LIST_GROUP_SUCCESS,
    DELETE_WISH_LIST_GROUP_ERROR,
    CLOSE_DELETE_WISHLIST_MODAL
} from '../../constants';
import history from '../../core/history';

// GraphQL
import getAllWishListGroupQuery from '../../components/WishLists/getAllWishListGroup.graphql';

export function deleteWishListGroup(
    id
) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: DELETE_WISH_LIST_GROUP_START,
        });

        try {
            let profileId = getState().account.data.profileId;

            let mutation = gql`
                mutation DeleteWishListGroup(
                    $id: Int!,
                ){
                    DeleteWishListGroup(
                        id: $id
                    ) {
                        status
                    }
                }
            `;

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id: id
                },
                refetchQueries: [
                    {
                        query: getAllWishListGroupQuery,
                        variables: {
                            profileId
                        }
                    }
                ]
            });
            if (data && data.DeleteWishListGroup && data.DeleteWishListGroup.status == 'success') {
                history.push('/wishlists');
            }

            dispatch({
                type: DELETE_WISH_LIST_GROUP_SUCCESS,
            });
            dispatch({
                type: CLOSE_DELETE_WISHLIST_MODAL,
                deleteModalOpen: false,
            });

        } catch (error) {
            dispatch({
                type: DELETE_WISH_LIST_GROUP_ERROR,
                payload: {
                    error
                }
            });
            dispatch({
                type: CLOSE_DELETE_WISHLIST_MODAL,
                deleteModalOpen: false,
            });
            return false;
        }
        return true;
    };
}