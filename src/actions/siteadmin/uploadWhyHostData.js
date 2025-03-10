import gql from 'graphql-tag';
import {
	WHYHOST_UPDATE_ERROR,
	WHYHOST_UPDATE_START,
	WHYHOST_UPDATE_SUCCESS
} from '../../constants';
import showToaster from '../../helpers/showToaster';
import { setLoaderStart, setLoaderComplete } from '../loader/loader';


export default function uploadWhyHostData(dataList) {
	return async (dispatch, getState, { client }) => {

		try {
			dispatch({
				type: WHYHOST_UPDATE_START
			});

			dispatch(setLoaderStart('whyHostData'));

			const mutation = gql`
            mutation (
              $dataList: String
            ) {
                updateWhyHost (
                    dataList:$dataList
                ) {
                    status
                    errorMessage                     
                }
            }`;

			const { data } = await client.mutate({
				mutation,
				variables: {
					dataList
				}
			});

			if (data && data.updateWhyHost && data.updateWhyHost.status == 200) {
				showToaster({ messageId: 'updateWhyHost', toasterType: 'success' })
				await dispatch({
					type: WHYHOST_UPDATE_SUCCESS
				});
				await dispatch(setLoaderComplete('whyHostData'));

			} else {
				showToaster({ messageId: 'commonError', toasterType: 'error', requestContent: data?.updateWhyHost?.errorMessage })
				await dispatch({
					type: WHYHOST_UPDATE_ERROR
				});
				dispatch(setLoaderComplete('whyHostData'));
			}
		} catch (error) {
			showToaster({ messageId: 'catchError', toasterType: 'error', requestContent: error })
			await dispatch({
				type: WHYHOST_UPDATE_ERROR
			});
			dispatch(setLoaderComplete('whyHostData'));
		}
	}
};