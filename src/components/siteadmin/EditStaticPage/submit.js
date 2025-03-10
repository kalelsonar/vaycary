import { updateStaticPageAction } from '../../../actions/siteadmin/updateStaticPage';
import showToaster from '../../../helpers/showToaster';

async function submit(values, dispatch) {
  if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>' || values.content.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
    showToaster({ messageId: 'addContent', toasterType: 'error' })
  } else if (values.metaTitle == null || values.metaTitle && values.metaTitle.trim() == '') {
    showToaster({ messageId: 'addTitle', toasterType: 'error' })
  } else if (values.metaDescription == null || values.metaDescription && values.metaDescription.trim() == '') {
    showToaster({ messageId: 'addDescription', toasterType: 'error' })
  } else {
    await dispatch(updateStaticPageAction(values));
  }

}

export default submit;
