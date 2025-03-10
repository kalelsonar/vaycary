import fetch from '../../../core/fetch';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  const query = `
    query(
    $id: Int,
    $minPrice: Float,
    $maxPrice: Float,
    $priceRangeCurrency: String,
    ){
      updateSearchSettings(
          id: $id,
          minPrice: $minPrice,
          maxPrice: $maxPrice,
          priceRangeCurrency: $priceRangeCurrency,
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

  if (data.updateSearchSettings.status === "success") {
    showToaster({ messageId: 'updateSearchSettings', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'searchSettingError', toasterType: 'error' })
  }

}

export default submit;
