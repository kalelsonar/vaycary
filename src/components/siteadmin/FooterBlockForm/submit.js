import fetch from '../../../core/fetch';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  const query = `
    mutation (
      $title1: String,
      $content1: String,
      $title2: String,
      $content2: String,
      $title3: String,
      $content3: String,
    ) {

      CreateFooterSetting (
        title1: $title1,
        content1: $content1,
        title2: $title2,
        content2: $content2,
        title3: $title3,
        content3: $content3,
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

  showToaster({
    messageId: data?.CreateFooterSetting?.status === "success" ? 'footerSetting' : 'footerSettingError',
    toasterType: data?.CreateFooterSetting?.status === "success" ? 'success' : 'error'
  })

}

export default submit;