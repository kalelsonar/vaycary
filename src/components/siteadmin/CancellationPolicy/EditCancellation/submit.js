import updateCancelPolicy from '../../../../actions/siteadmin/CancellationPolicy/updateCancelPolicy';

async function submit(values, dispatch) {
    dispatch(updateCancelPolicy(values));
}

export default submit;
