import { gql } from 'react-apollo';
import getAllListingsQuery from './getAllListing.graphql';

import {
  ADD_RECOMMEND_START,
  ADD_RECOMMEND_SUCCESS,
  ADD_RECOMMEND_ERROR,
  REMOVE_RECOMMEND_START,
  REMOVE_RECOMMEND_SUCCESS,
  REMOVE_RECOMMEND_ERROR
} from '../../../constants';
import showToaster from '../../../helpers/showToaster';


export function addListToRecommended(listId, currentPage, searchList) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: ADD_RECOMMEND_START,
    });

    let mutation = gql`
      mutation addRecommend($listId: Int){
        addRecommend(listId: $listId) {
          id
          listId
          status
          errorMessage
        }
      }
    `;

    try {

      const { data } = await client.mutate({
        mutation,
        variables: { listId },
        refetchQueries: [{ query: getAllListingsQuery, variables: { currentPage, searchList } }]
      });

      if (data.addRecommend.status === 200) {
        dispatch({
          type: ADD_RECOMMEND_SUCCESS,
        });
        showToaster({ messageId: 'addRecommend', toasterType: 'success' })
      } else {
        dispatch({
          type: ADD_RECOMMEND_ERROR,
          payload: {
            status
          }
        });
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.addRecommend?.errorMessage })
      }
    } catch (error) {
      dispatch({
        type: ADD_RECOMMEND_ERROR,
        payload: {
          error
        }
      });
    }
  };
}

export function removeListFromRecommended(listId, currentPage, searchList) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_RECOMMEND_START,
    });

    try {

      let mutation = gql`
        mutation removeRecommend($listId: Int){
          removeRecommend(listId: $listId) {
            listId
            status
            errorMessage
          }
        }
      `;

      const { data } = await client.mutate({
        mutation,
        variables: { listId },
        refetchQueries: [{ query: getAllListingsQuery, variables: { currentPage, searchList } }]
      });

      if (data.removeRecommend.status === 200) {

        dispatch({
          type: REMOVE_RECOMMEND_SUCCESS,
        });
        showToaster({ messageId: 'removeRecommend', toasterType: 'success' })
      } else {
        dispatch({
          type: REMOVE_RECOMMEND_ERROR,
          payload: {
            status: 'something went wrong'
          }
        });
        console.log(data?.removeRecommend?.errorMessage, "##############");
        showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.removeRecommend?.errorMessage })
      }
    } catch (error) {
      dispatch({
        type: REMOVE_RECOMMEND_ERROR,
        payload: {
          error
        }
      });
    }
  };
}

