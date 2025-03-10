import fetch from '../../../core/fetch';
import { setSiteSettings } from '../../../actions/siteSettings';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {

  if (!values?.ogImage) {
    return showToaster({ messageId: 'ogImageError', toasterType: 'error' })
  }

  values.appAvailableStatus = Number(values.appAvailableStatus);

  const query = `
  query (
    $siteName: String,
    $siteTitle: String,
    $metaDescription: String,
    $metaKeyword: String,
    $logo: String,
    $facebookLink: String,
    $twitterLink: String,
    $instagramLink: String
    $homePageType: Int,
    $phoneNumberStatus: Int,
    $homeLogo: String,
    $emailLogo: String,
    $appAvailableStatus: Boolean,
    $playStoreUrl: String,
    $appStoreUrl: String,
    $email: String,
    $phoneNumber: String,
    $address: String,
    $listingApproval: String,
    $appForceUpdate: String,
    $androidVersion: String,
    $iosVersion: String,
    $ogImage: String
  ) {
    updateSiteSettings (
      siteName: $siteName,
      siteTitle: $siteTitle,
      metaDescription: $metaDescription,
      metaKeyword: $metaKeyword,
      logo: $logo,
      facebookLink: $facebookLink,
      twitterLink: $twitterLink,
      instagramLink: $instagramLink,
      homePageType: $homePageType,
      phoneNumberStatus: $phoneNumberStatus,
      homeLogo: $homeLogo,
      emailLogo: $emailLogo,
      appAvailableStatus: $appAvailableStatus,
      playStoreUrl: $playStoreUrl,
      appStoreUrl: $appStoreUrl,
      email: $email,
      phoneNumber: $phoneNumber,
      address: $address,
      listingApproval: $listingApproval,
      appForceUpdate: $appForceUpdate,
      androidVersion: $androidVersion,
      iosVersion: $iosVersion
      ogImage: $ogImage
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

  if (data.updateSiteSettings.status === 200) {
    showToaster({ messageId: 'updateSiteSettings', toasterType: 'success' })
    dispatch(setSiteSettings());
  } else {
    showToaster({ messageId: 'updateSettingsError', toasterType: 'error' })
  }

}

export default submit;
