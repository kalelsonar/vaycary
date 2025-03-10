import {
	SITE_SETTINGS_UPLOAD_START,
	SITE_SETTINGS_UPLOAD_ERROR,
	SITE_SETTINGS_UPLOAD_SUCCESS
} from '../../../constants/index';
import { setLoaderStart, setLoaderComplete } from '../../loader/loader';
import updateConfigSettingsMutation from './updateConfigSettings.graphql';
import showToaster from '../../../helpers/showToaster';


export default function updateConfigSettings(values) {
	return async (dispatch, getState, { client }) => {
		try {
			dispatch({ type: SITE_SETTINGS_UPLOAD_START });

			dispatch(setLoaderStart('configSettings'));

			const { data } = await client.mutate({
				mutation: updateConfigSettingsMutation,
				variables: values
			})

			dispatch(setLoaderComplete('configSettings'));

			const result = data?.updateConfigSettings?.status

			dispatch({
				type: result === 200 ? SITE_SETTINGS_UPLOAD_SUCCESS : SITE_SETTINGS_UPLOAD_ERROR
			})

			showToaster({
				messageId: result === 200 ? 'updateConfigSettings' : 'commonError',
				toasterType: result === 200 ? 'success' : 'error',
				requestContent: result === 200 ? null : data?.updateConfigSettings?.errorMessage
			})

		}
		catch (err) {
			showToaster({ messageId: 'catchError', toasterType: 'error', requestContent: err })
			dispatch({ type: SITE_SETTINGS_UPLOAD_ERROR });
		}
	}
}
