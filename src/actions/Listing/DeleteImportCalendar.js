import { gql } from 'react-apollo';
import {
    DELETE_IMPORT_CALENDAR_START,
    DELETE_IMPORT_CALENDAR_SUCCESS,
    DELETE_IMPORT_CALENDAR_ERROR,
} from '../../constants';
import showToaster from '../../helpers/showToaster';
import { getListingDataStep3 } from '../getListingDataStep3';

const query = gql`
    query GetCalendars($listId: Int!) {
        getListingCalendars(listId: $listId) {
            id
            name
            url
            listId
            status
        }
    }`;

const mutation = gql`
    mutation DeleteCalendar($listId: Int!, $calendarId: Int!) {
        deleteCalendar(listId: $listId, calendarId: $calendarId) {
            status
        }
    }
`;
export function deleteImportCal(listId, calendarId) {

    return async (dispatch, getState, { client }) => {

        dispatch({
            type: DELETE_IMPORT_CALENDAR_START,
            payload: {
                importCalLoading: true
            }
        });

        try {
            const { data } = await client.mutate({
                mutation,
                variables: { listId, calendarId },
            });

            if (data && data.deleteCalendar.status === '200') {
                showToaster({ messageId: 'deleteCalendar', toasterType: 'success' })
                const { data } = await client.query({
                    query,
                    variables: { listId },
                    fetchPolicy: 'network-only',
                });
                if (data && data.getListingCalendars) {
                    dispatch({
                        type: DELETE_IMPORT_CALENDAR_SUCCESS,
                        payload: {
                            calendars: data.getListingCalendars,
                            importCalLoading: false
                        }
                    });
                    dispatch(getListingDataStep3(listId));
                }
            } else {
                showToaster({ messageId: 'deleteCalendarError', toasterType: 'success' })
                dispatch({
                    type: DELETE_IMPORT_CALENDAR_ERROR,
                    payload: {
                        status: data.deleteCalendar.status,
                        importCalLoading: false
                    }
                });
            }


        } catch (error) {
            dispatch({
                type: DELETE_IMPORT_CALENDAR_ERROR,
                payload: {
                    error,
                    importCalLoading: false
                }
            });
        }
    };
}