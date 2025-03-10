import fetch from '../../../../core/fetch';
import showToaster from '../../../../helpers/showToaster';

async function submit(values, dispatch) {
  const query = `
  mutation (
    $hostingBlockTitleHeading: String,
    $hostingBlockTitle1: String,
    $hostingBlockTitle2: String,
    $hostingBlockTitle3: String,
    $hostingBlockContent1: String,
    $hostingBlockContent2: String,
    $hostingBlockContent3: String,
    $hostingBlockImage1: String,
    $hostingBlockImage2: String,
    $hostingBlockImage3: String,
) {
  updateWhyHostPage (
    hostingBlockTitleHeading: $hostingBlockTitleHeading,
    hostingBlockTitle1: $hostingBlockTitle1,
    hostingBlockTitle2: $hostingBlockTitle2,
    hostingBlockTitle3: $hostingBlockTitle3,
    hostingBlockContent1: $hostingBlockContent1,
    hostingBlockContent2: $hostingBlockContent2,
    hostingBlockContent3: $hostingBlockContent3,
    hostingBlockImage1: $hostingBlockImage1,
    hostingBlockImage2: $hostingBlockImage2,
    hostingBlockImage3: $hostingBlockImage3,
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

  if (data.updateWhyHostPage.status === 200) {
    showToaster({ messageId: 'updateBlock3', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'updateBlockError3', toasterType: 'error' })
  }

}

export default submit;
