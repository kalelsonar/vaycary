import { gql } from 'react-apollo';
import {
    DELETE_HOME_BANNER_START,
    DELETE_HOME_BANNER_SUCCESS,
    DELETE_HOME_BANNER_ERROR
} from '../../constants';
import { getHomeBannerImages } from '../getHomeBannerImages';
import { doRemoveHomeBanner } from './manageHomeBanner';
import showToaster from '../../helpers/showToaster';

const query = gql`
    {
        getHomeBanner {
            id
            name
        }
    }
`;

const mutation = gql`
  mutation deleteHomeBanner ($id: Int!) {
    deleteHomeBanner (id: $id) {
        status
      }
    }
  `;

export function deleteHomeBanner(id, name) {
    return async (dispatch, getState, { client }) => {
        dispatch({
            type: DELETE_HOME_BANNER_START,
            data: id
        });
        try {
            const { data } = await client.mutate({
                mutation,
                variables: { id },
                refetchQueries: [{ query }]
            });

            if (data.deleteHomeBanner.status == "200") {
                await dispatch(getHomeBannerImages());
                dispatch({
                    type: DELETE_HOME_BANNER_SUCCESS,
                });
                showToaster({ messageId: 'deleteSuccess', toasterType: 'success' })
                if (name != null) {
                    await doRemoveHomeBanner(name);
                }
            } else {
                dispatch({
                    type: DELETE_HOME_BANNER_ERROR,
                });
            }

        } catch (error) {
            dispatch({
                type: DELETE_HOME_BANNER_ERROR,
                payload: {
                    error
                }
            });

        }

    };
}

