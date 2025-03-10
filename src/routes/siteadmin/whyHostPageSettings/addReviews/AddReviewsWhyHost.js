import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './AddReviewsWhyHost.css';
import WhyHostFormBlock2 from '../../../../components/siteadmin/WhyHostPageSettings/WhyHostFormBlock2/WhyHostFormBlock2'

class AddReviewsWhyHost extends React.Component {

    render() {
        return <WhyHostFormBlock2 />
    }
}

export default withStyles(s)(AddReviewsWhyHost);