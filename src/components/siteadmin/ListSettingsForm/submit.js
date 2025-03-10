import fetch from '../../../core/fetch';
import { closeListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  const query = `
    query (
        $typeId:Int,
        $itemName:String,
        $itemDescription:String,
        $otherItemName:String,
        $maximum:Int,
        $minimum:Int,
      	$startValue:Int,
        $endValue:Int,
        $isEnable: String,
        $image: String
      ) {
          addListSettings (
            typeId:$typeId,
            itemName:$itemName,
            itemDescription:$itemDescription,
            otherItemName:$otherItemName,
            maximum: $maximum,
            minimum: $minimum,
            startValue: $startValue,
            endValue: $endValue,
            isEnable: $isEnable,
            image: $image
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

  if (data.addListSettings.status === "success") {
    dispatch(closeListSettingsModal());
    dispatch(getAdminListingSettings(values.typeId));
    showToaster({ messageId: 'addListSettings', toasterType: 'success' })
  } else {
    showToaster({ messageId: 'addListingError', toasterType: 'error' })
  }

}

export default submit;
