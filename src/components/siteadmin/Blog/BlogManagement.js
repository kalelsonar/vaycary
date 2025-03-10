import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import CustomPagination from '../../CustomPagination/CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import history from '../../../core/history';
import messages from '../../../locale/messages';
import getBlogDetails from './getBlogDetails.graphql';
import { deleteBlogDetails, updateBlogStatus } from '../../../actions/siteadmin/deleteBlogDetails';

import s from './BlogManagement.css';
import bt from '../../../components/commonStyle.css';
class BlogManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.bool,
      images: PropTypes.string,
    })),
    deleteBlogDetails: PropTypes.any,
    updateBlogStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    history.push('/siteadmin/page/add')
  }

  paginationData = (currentPage) => {
    const { setStateVariable } = this.props;
    const { data: { getBlogDetails, refetch } } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.metaTitleLabel) },
      { data: formatMessage(messages.metaDescriptionLabel) },
      { data: formatMessage(messages.pageTitleLabel) },
      { data: formatMessage(messages.pageUrl) },
      { data: formatMessage(messages.footerCategoryLabel) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.preview) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { deleteBlogDetails, updateBlogStatus, currentPage } = props;
    const { data: { getBlogDetails } } = props;
    const { formatMessage } = props.intl;
    return getBlogDetails?.results?.map(function (value, key) {
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.metaTitle },
          { data: value?.metaDescription },
          { data: value?.pageTitle },
          { data: value?.pageUrl },
          { data: value?.footerCategory },
          {
            data: <select value={value?.isEnable} onChange={(e) => updateBlogStatus(value?.id, value?.isEnable, currentPage)}>
              <option value={true}>{formatMessage(messages.enabledLabel)}</option>
              <option value={false}>{formatMessage(messages.disabledLabel)}</option>
            </select>
          },
          {
            data: <a href={"/page/" + value?.pageUrl} target={'_blank'}>
              <FormattedMessage {...messages.preview} />
            </a>
          },
          {
            data: <Link to={"/siteadmin/edit/page/" + value?.id}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          },
          {
            data: <div>
              <Confirm
                onConfirm={() => deleteBlogDetails(value?.id, currentPage)}
                body={formatMessage(messages.areYouSureDeleteWishList)}
                confirmText={formatMessage(messages.confirmDelete)}
                cancelText={formatMessage(messages.cancel)}
                title={formatMessage(messages.deletingPageDetails)}
              >
                <a href="javascript:void(0)"><FormattedMessage {...messages.delete} /></a>
              </Confirm>
            </div>
          }
        ]
      }
    })
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { currentPage } = this.props;
    const { data: { getBlogDetails, loading } } = this.props;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommonTable
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          title={formatMessage(messages.contentManagementSystem)}
          addAction={this.handleClick}
          redirectionLabel={formatMessage(messages.addPageLabel)}
        />
        {
          getBlogDetails?.count > 0 &&
          <div>
            <CustomPagination
              total={getBlogDetails?.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
            />
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  deleteBlogDetails,
  updateBlogStatus
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getBlogDetails,
    {
      options: (props) => ({
        variables: {
          currentPage: props.currentPage
        },
        fetchPolicy: 'network-only',
        ssr: false
      })
    }),
)(BlogManagement);