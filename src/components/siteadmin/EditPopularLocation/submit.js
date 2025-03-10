import fetch from '../../../core/fetch';
import history from '../../../core/history';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  if (values.image == null) {
    showToaster({ messageId: 'uploadLocImage', toasterType: 'error' })
    return;
  }

  const mutation = `
  mutation updatePopularLocation(
    $id: Int,
    $location: String,
    $locationAddress: String,
    $image: String,
  ) {
    updatePopularLocation(
      id: $id,
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
    messageId: data?.updatePopularLocation?.status === "success" ? 'updateLocation' : 'updateLocationError',
    toasterType: data?.updatePopularLocation?.status === "success" ? 'success' : 'error'
  })

  data?.updatePopularLocation?.status === "success" && history.push('/siteadmin/popularlocation');

}

export default submit;
