import fetch from '../../../core/fetch';
import history from '../../../core/history';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {


  if (values.image == null) {
    showToaster({ messageId: 'uploadLocImage', toasterType: 'error' })
  }
  else {
    const mutation = `
  mutation addPopularLocation(
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    addPopularLocation(
      location: $location,
      locationAddress: $locationAddress,
      image: $image,
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
        query: mutation,
        variables: values
      }),
      credentials: 'include',
    });

    const { data } = await resp.json();

    showToaster({
      messageId: data?.addPopularLocation?.status === "success" ? 'addPopularLocation' : 'createFailed',
      toasterType: data?.addPopularLocation?.status === "success" ? 'success' : 'error'
    })
    data?.addPopularLocation?.status === "success" && history.push('/siteadmin/popularlocation')

  }

}

export default submit;
