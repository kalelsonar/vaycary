import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './EditBlogDetails.css';

// Component
import EditBlogDetailsManagement from '../../../components/siteadmin/EditBlogDetails/EditBlogDetails';

// Query
import editBlogDetails from './editBlogDetails.graphql';
import cx from 'classnames';
import NotFound from '../../notFound/NotFound';
import Loader from '../../../components/Loader/Loader';

class EditBlogDetails extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        blogId: PropTypes.number.isRequired,
        editBlogDetailsData: PropTypes.shape({
            loading: PropTypes.bool,
            editBlogDetailsData: PropTypes.object
        }),
    };


    render() {
        const { editBlogDetailsData, title, editBlogDetailsData: { loading } } = this.props;

        if (loading) return <div><Loader type={"text"} /></div>

        if(!editBlogDetailsData || !editBlogDetailsData.editBlogDetails === null) {
            return <div className={cx(s.pagecontentWrapper)}><NotFound /></div>
        }
        return (
            <EditBlogDetailsManagement
                title={title} initialValues={editBlogDetailsData.editBlogDetails}
            />
        );
    }
}

export default compose(
    withStyles(s),
    graphql(editBlogDetails, {
        name: 'editBlogDetailsData',
        options: (props) => ({
            variables: {
                id: props.blogId,
            },
            fetchPolicy: 'network-only'
        })
    }),
)(EditBlogDetails);