import {
	UPDATE_CANCEL_START,
	UPDATE_CANCEL_SUCCESS,
	UPDATE_CANCEL_ERROR
} from '../../../constants';
import history from '../../../core/history';
import getCancelPolicies from '../../../routes/siteadmin/cancellationPolicies/getCancelPolicies.graphql';
import updateCancelPolicyMutation from './updateCancelPolicy.graphql';
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader'
import showToaster from '../../../helpers/showToaster';

export default function updateCancelPolicy(values) {

	return async (dispatch, getState, { client }) => {

		try {

			dispatch({ type: UPDATE_CANCEL_START });
			dispatch(setLoaderStart("isUpdateCancellationPolicy"));

			const { data } = await client.mutate({
				mutation: updateCancelPolicyMutation,
				variables: values,
				refetchQueries: [{ query: getCancelPolicies }]
			});

			const result = data?.updateCancelPolicy?.status

			dispatch({
				type: result === 200 ? UPDATE_CANCEL_SUCCESS : UPDATE_CANCEL_ERROR
			})

			showToaster({
				messageId: result === 200 ? 'updatePolicy' : 'commonError',
				toasterType: result === 200 ? 'success' : 'error',
				requestContent: result === 200 ? null : data?.updateCancelPolicy?.errorMessage

			})
			dispatch(setLoaderComplete("isUpdateCancellationPolicy"));
			history.push('/siteadmin/cancellation-policies/management');

		} catch (error) {
			showToaster({ messageId: 'updateFailed', toasterType: 'error' })
			dispatch(setLoaderComplete("isUpdateCancellationPolicy"));
			return false;
		}
		return true;
	};
}