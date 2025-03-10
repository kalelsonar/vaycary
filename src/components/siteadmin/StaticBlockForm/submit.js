import fetch from '../../../core/fetch';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  if (!values.blockImage2 || !values.blockImage1) {
    showToaster({ messageId: 'uploadBlockImage', toasterType: 'error' })
    return;
  }

  const mutation = `
    mutation (
      $headerTitle: String,
      $headerContent: String,
      $blockTitle1: String,
      $blockContent1: String,
      $blockTitle2: String,
      $blockContent2: String,
      $blockImage1: String,
      $blockImage2: String,
      $isEnable: String
    ) {
      updateStaticBlockSettings (
        headerTitle: $headerTitle,
        headerContent: $headerContent,
        blockTitle1: $blockTitle1,
        blockContent1: $blockContent1,
        blockTitle2: $blockTitle2,
        blockContent2: $blockContent2,
        blockImage1: $blockImage1,
        blockImage2: $blockImage2,
        isEnable: $isEnable
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

  if (data.updateStaticBlockSettings.status === "success") {
    showToaster({ messageId: 'updateStaticBlock', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'updateStaticError', toasterType: 'error' })
  }

}

export default submit;
