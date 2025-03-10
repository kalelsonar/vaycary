import fetch from '../../../../core/fetch';
import { setSiteSettings } from '../../../../actions/siteSettings';
import { closeCancelModal } from '../../../../actions/siteadmin/modalActions';
import showToaster from '../../../../helpers/showToaster';


async function submit(values, dispatch) {

    const query = `
  query (
    $cancellationInfo: String
  ) {
    updateSiteSettings (
        cancellationInfo: $cancellationInfo
    ) {
        status
    }
  }
  `;

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
        credentials: 'include',
    });

    const { data } = await resp.json();

    if (data && data.updateSiteSettings && data.updateSiteSettings.status === 200) {
        showToaster({ messageId: 'cancelInfo', toasterType: 'success' })
        dispatch(setSiteSettings());
        dispatch(closeCancelModal());
    } else {
        showToaster({ messageId: 'cancelInfoError', toasterType: 'success' })
        dispatch(closeCancelModal());
    }

}

export default submit;
