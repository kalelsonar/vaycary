import { gql } from 'react-apollo';
import { change } from 'redux-form';
import fetch from '../core/fetch';
import {
  CREATE_LIST_PHOTOS_START,
  CREATE_LIST_PHOTOS_SUCCESS,
  CREATE_LIST_PHOTOS_ERROR,
  REMOVE_LIST_PHOTOS_START,
  REMOVE_LIST_PHOTOS_SUCCESS,
  REMOVE_LIST_PHOTOS_ERROR
} from '../constants';
import { getListPhotos } from './getListPhotos';
import { getListingDataStep2 } from './getListingDataStep2';
import showToaster from '../helpers/showToaster';

export function createListPhotos(listId, name, type) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CREATE_LIST_PHOTOS_START,
    });

    try {

      let mutation = gql`
        mutation UploadListPhotos ($listId:Int!, $name: String, $type: String) {
          CreateListPhotos (listId:$listId, name: $name, type: $type) {
            status
            photosCount
          }
        } 
      `;
      // Send Request to create a record for a listing
      const { data } = await client.mutate({
        mutation,
        variables: { listId, name, type },
      });

      if (data && data.CreateListPhotos && data.CreateListPhotos.status === 'success') {
        dispatch(getListPhotos(listId));
        dispatch({
          type: CREATE_LIST_PHOTOS_SUCCESS,
          photosCount: data.CreateListPhotos.photosCount
        });
        showToaster({ messageId: 'createListPhoto', toasterType: 'success' })
      }

    } catch (error) {
      dispatch({
        type: CREATE_LIST_PHOTOS_ERROR,
      });
      return false;
    }

    return true;
  };
}


export function removeListPhotos(listId, name, reload) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: REMOVE_LIST_PHOTOS_START,
    });

    try {

      let mutation = gql`
        mutation RemoveListPhotos($listId:Int!, $name:String) {
          RemoveListPhotos (listId:$listId, name: $name) {
            status
            photosCount
            iscoverPhotoDeleted
          }
        }
      `;

      let reservationCount = gql`
      query getUpcomingBookings ($listId: Int!){
          getUpcomingBookings(listId: $listId){
            count
          }
        }`;

      const reservationCountData = await client.query({
        query: reservationCount,
        variables: { listId },
      });

      if (reservationCountData && reservationCountData.data.getUpcomingBookings && reservationCountData.data.getUpcomingBookings.count > 0) {

        // If reservation found

        const showListPhotosQuery = gql`
      query listPhotos($listId:Int!) {
        ShowListPhotos (listId:$listId) {
          id
          listId
          name
          type
          isCover
        }
      }
    `;

        const showListPhotosData = await client.query({
          query: showListPhotosQuery,
          variables: { listId },
        });


        if (showListPhotosData && showListPhotosData.data.ShowListPhotos && showListPhotosData.data.ShowListPhotos.length <= 1) {
          showToaster({ messageId: 'removeListPhoto', toasterType: 'error' })
          dispatch({
            type: REMOVE_LIST_PHOTOS_ERROR,
          });

        }
        else {
          // If length more 
          const { data } = await client.mutate({
            mutation,
            variables: { listId, name },
          });

          if (data && data.RemoveListPhotos && data.RemoveListPhotos.status === 'success') {
            if (data.RemoveListPhotos.iscoverPhotoDeleted) {
              await dispatch(change('ListPlaceStep2', 'coverPhoto', null));
            }
            dispatch(getListingDataStep2(listId))

            dispatch({
              type: REMOVE_LIST_PHOTOS_SUCCESS,
              photosCount: data.RemoveListPhotos.photosCount
            });
            dispatch(getListPhotos(listId));
            await dispatch(getListingDataStep2(listId));

            // Remove file physically
            const resp = await fetch('/deletePhotos', {
              method: 'post',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ fileName: name }),
              credentials: 'include',
            });
            const { status } = await resp.json();
          }
        }

      } else {
        // no reservation found

        const { data } = await client.mutate({
          mutation,
          variables: { listId, name },
        });

        if (data && data.RemoveListPhotos && data.RemoveListPhotos.status === 'success') {
          if (data.RemoveListPhotos.iscoverPhotoDeleted) {
            await dispatch(change('ListPlaceStep2', 'coverPhoto', null));
          }
          dispatch(getListingDataStep2(listId))
          dispatch({
            type: REMOVE_LIST_PHOTOS_SUCCESS,
            photosCount: data.RemoveListPhotos.photosCount
          });
          dispatch(getListPhotos(listId));

          await dispatch(getListingDataStep2(listId));
          // Remove file physically
          const resp = await fetch('/deletePhotos', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileName: name }),
            credentials: 'include',
          });
          const { status } = await resp.json();
        }
      }

    } catch (error) {
      dispatch({
        type: REMOVE_LIST_PHOTOS_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}
