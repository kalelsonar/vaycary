import fetch from '../../../../core/fetch';
import showToaster from '../../../../helpers/showToaster';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $whyhostBannerHeading: String,
    $whyhostBannerImage: String,
    $paymentTitleHeading: String
) {
  updateWhyHostPage (
    whyhostBannerHeading: $whyhostBannerHeading,
    whyhostBannerImage: $whyhostBannerImage,
    paymentTitleHeading: $paymentTitleHeading
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
    showToaster({ messageId: 'updateHostPage', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'updateHostPageError', toasterType: 'error' })
  }

}

export default submit;
