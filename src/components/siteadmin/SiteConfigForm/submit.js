import updateConfigSettings from '../../../actions/siteadmin/SiteSettings/updateConfigSettings';

async function submit(values, dispatch) {
  dispatch(updateConfigSettings(values));
}

export default submit;
