import { gql } from 'react-apollo';
import {
  DELETE_LIST_SETTINGS_START,
  DELETE_LIST_SETTINGS_SUCCESS,
  DELETE_LIST_SETTINGS_ERROR,
  CLOSE_LIST_SETTINGS_MODAL
} from '../../constants';
import { getAdminListingSettings } from './getAdminListingSettings';
import showToaster from '../../helpers/showToaster';

const query = gql`
  query($id:Int, $typeId: Int) {
    deleteListSettings(id: $id, typeId: $typeId){
      status
      }
    }
  `;

export function deleteListSettings(id, typeId) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: DELETE_LIST_SETTINGS_START,
    });

    try {

      const { data } = await client.query({
        query,
        variables: { id, typeId },
        fetchPolicy: 'network-only'
      });

      if (data.deleteListSettings) {
        if (data.deleteListSettings.status === "success") {
          dispatch({
            type: CLOSE_LIST_SETTINGS_MODAL,
          });

          dispatch({
            type: DELETE_LIST_SETTINGS_SUCCESS,
          });
          showToaster({ messageId: 'deleteListSetting', toasterType: 'success' })

          dispatch(getAdminListingSettings(typeId));
        } else {
          if (data.deleteListSettings.status === "unableToDisable") {
            showToaster({ messageId: 'deleteSettingError1', toasterType: 'error' })
          } else if (data.deleteListSettings.status === "listingUsed") {
            showToaster({ messageId: 'deleteSettingError2', toasterType: 'error' })
          } else {
            showToaster({ messageId: 'commonError', toasterType: 'error' })
            dispatch({
              type: CLOSE_LIST_SETTINGS_MODAL,
            });
          }

          dispatch({
            type: DELETE_LIST_SETTINGS_ERROR,
          });
        }
      }
    } catch (error) {
      dispatch({
        type: DELETE_LIST_SETTINGS_ERROR,
        payload: {
          error
        }
      });
    }
  };
}
