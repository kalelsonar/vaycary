import { gql } from 'react-apollo';
import {
  CONTACT_HOST_START,
  CONTACT_HOST_SUCCESS,
  CONTACT_HOST_ERROR,
} from '../../constants';
import showToaster from '../../helpers/showToaster';

export function contactHost(
  listId,
  host,
  content,
  startDate,
  endDate,
  personCapacity,
  hostEmail,
  firstName
) {

  return async (dispatch, getState, { client }) => {

    dispatch({
      type: CONTACT_HOST_START,
    });

    try {

      let account = getState().account.data;

      let mutation = gql`
          mutation CreateThreadItems(
            $listId: Int!, 
            $host: String!,
            $content: String!,
            $type: String,
            $startDate: String,
            $endDate: String,
            $personCapacity: Int
          ){
              CreateThreadItems(
                listId: $listId,
                host: $host,
                content: $content,
                type: $type,
                startDate: $startDate,
                endDate: $endDate,
                personCapacity: $personCapacity
              ) {
                  id
                  threadId
                  sentBy
                  content
                  type
                  startDate
                  endDate
                  personCapacity
                  createdAt
                  status
              }
          }
      `;

      // Send Message
      const { data } = await client.mutate({
        mutation,
        variables: {
          listId,
          host,
          content,
          type: 'inquiry',
          startDate,
          endDate,
          personCapacity
        }
      });

      if (data?.CreateThreadItems?.status == "400") {
        showToaster({ messageId: 'contactHostError', toasterType: 'error' })
      } else if (data?.CreateThreadItems) {
        dispatch({
          type: CONTACT_HOST_SUCCESS,
        });
        showToaster({ messageId: 'contactHost', toasterType: 'success' })
      }

    } catch (error) {
      dispatch({
        type: CONTACT_HOST_ERROR,
        payload: {
          error
        }
      });
      return false;
    }

    return true;
  };
}