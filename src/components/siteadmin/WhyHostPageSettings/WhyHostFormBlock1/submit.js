import fetch from '../../../../core/fetch';
import showToaster from '../../../../helpers/showToaster';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $hostBannerTitle1: String,
    $hostBannerImage1: String,
) {
  updateWhyHostPage (
    hostBannerTitle1: $hostBannerTitle1,
    hostBannerImage1: $hostBannerImage1,
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

  if (data?.updateWhyHostPage?.status === 200) {
    showToaster({ messageId: 'updateBlock1', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'updateBlockError1', toasterType: 'error' })
  }

}

export default submit;
