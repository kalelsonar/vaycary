import { reset } from 'redux-form';
import fetch from '../../core/fetch';
import { closeReportUserModal, openThankYouModal } from '../../actions/modalActions';
import showToaster from '../../helpers/showToaster';

async function submit(values, dispatch) {

    const query = `mutation (
    $reporterId:String,
    $userId:String,
    $reportType: String,
    $profileId: Int,
    $reporterName: String,
  ) {
      CreateReportUser (
        reporterId:$reporterId,
        userId:$userId,
        reportType: $reportType,
        profileId: $profileId,
        reporterName: $reporterName,
      ) {
        status
        firstName
      }
    }`;


    const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: query,
            variables: values
        }),
        credentials: 'include'
    });

    const { data } = await resp.json();

    if (data.CreateReportUser.status == "success") {
        dispatch(closeReportUserModal());
        dispatch(reset('ReportUserForm'));
        dispatch(openThankYouModal());
    } else {
        showToaster({ messageId: 'commonError', toasterType: 'error' })
    }

}

export default submit;
