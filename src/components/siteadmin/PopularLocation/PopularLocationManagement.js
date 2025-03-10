import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../../../components/Link';
import Confirm from 'react-confirm-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import { graphql, compose } from 'react-apollo';

import CommonTable from '../../CommonTable/CommonTable';
import CustomPagination from '../../CustomPagination/CustomPagination';

import getPopularLocation from './getPopularLocation.graphql';
import history from '../../../core/history';
import messages from '../../../locale/messages';
import { deletePopularLocation, updateLocationStatus } from '../../../actions/siteadmin/deletePopularLocation';

import s from './PopularLocationManagement.css';
import bt from '../../../components/commonStyle.css';

class PopularLocationManagement extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      location: PropTypes.string,
      locationAddress: PropTypes.string,
      isEnable: PropTypes.string,
      images: PropTypes.string,
    })),
    deletePopularLocation: PropTypes.any,
    updateLocationStatus: PropTypes.any,
  };

  static defaultProps = {
    data: []
  };

  constructor(props) {
    super(props);
  }

  handleClick = () => {
    history.push('/siteadmin/popularlocation/add')
  }

  paginationData = (currentPage) => {
    const { setStateVariable, data: { refetch } } = this.props;
    let variables = { currentPage };
    setStateVariable(variables);
    refetch(variables);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.location) },
      { data: formatMessage(messages.locationAddress) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.setEnableDisable) },
      { data: formatMessage(messages.editLabel) },
      { data: formatMessage(messages.delete) }
    ]
  }

  tbody = (props) => {
    const { deletePopularLocation, updateLocationStatus, currentPage, data: { getPopularLocation } } = props;
    const { formatMessage } = props.intl;

    return getPopularLocation?.results?.map(function (value, key) {
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.location },
          { data: value?.locationAddress },
          {
            data: value?.isEnable == 'true' ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel)
          },
          {
            data: <a href="javascript:void(0)" onClick={() => updateLocationStatus(value?.id, value?.isEnable, currentPage)} >
              {value?.isEnable == 'true' ? formatMessage(messages.disableLabel) : formatMessage(messages.enableLabel)}
            </a>
          },
          {
            data: <Link to={"/siteadmin/edit/popularlocation/" + value?.id}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          },
          {
            data: <div>
              <Confirm
                onConfirm={() => deletePopularLocation(value?.id, currentPage)}
                body={formatMessage(messages.areYouSureDeleteWishList)}
                confirmText={formatMessage(messages.confirmDelete)}
                cancelText={formatMessage(messages.cancel)}
                title={formatMessage(messages.deletePopularLocationLabel)}
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
    const { data: { getPopularLocation, loading }, currentPage } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommonTable
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          title={formatMessage(messages.managePopularLocation)}
          addAction={this.handleClick}
          redirectionLabel={formatMessage(messages.addPopularLocation)}
        />
        {
          getPopularLocation?.count > 0 &&
          <div>
            <CustomPagination
              total={getPopularLocation?.count}
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
  deletePopularLocation,
  updateLocationStatus
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(getPopularLocation, {
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        requestedFrom: "siteadmin"
      },
      fetchPolicy: 'network-only',
      ssr: true
    })
  }),
)(PopularLocationManagement);