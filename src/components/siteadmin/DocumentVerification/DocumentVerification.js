import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import FileList from './FileList';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import DocumentManagement from './DocumentManagementQuery.graphql';
import showAllDocumentQuery from './showAllDocumentQueryFile.graphql';
import messages from '../../../locale/messages';
import { sendEmail } from '../../../core/email/sendEmail';
import { debounce } from '../../../helpers/debounce';
import showToaster from '../../../helpers/showToaster';

import s from './DocumentVerification.css';
import bt from '../../../components/commonStyle.css';

class DocumentVerification extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.handleSearchChange = debounce(this.handleSearchChange.bind(this));
  }

  paginationData = (currentPage) => {
    const { showAllDocument: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    setStateVariable({ currentPage });
    refetch(variables);
  }

  handleSearchChange(searchList) {
    const { showAllDocument: { refetch }, setStateVariable } = this.props;
    let variables = {
      currentPage: 1,
      searchList,
    };
    setStateVariable(variables);
    refetch(variables);
  }

  handleUpdate = async (id, status, item) => {
    const { mutate, currentPage } = this.props;
    const { showAllDocument: { refetch }, setStateVariable } = this.props;
    let variables = { currentPage };
    const { data } = await mutate({
      variables: {
        userId: id,
        isIdVerification: status
      },
    });

    setStateVariable({ currentPage });
    refetch(variables);

    if (data.DocumentManagement.status === 'success') {
      if (status == 0) {
        showToaster({ messageId: 'docVerify', toasterType: 'success' })
        return;
      }
      let msg = 'Documents has been ';
      msg += (status == 1) ? 'Approved!' : 'Rejected!';
      let content = {
        name: item.profile.firstName,
        verificationStatus: (status == 1) ? 'approved' : 'rejected'
      }
      sendEmail(item.email, 'documentVerification', content);
      showToaster({ messageId: 'commonError', toasterType: 'success', requestContent: msg })
    } else {
      showToaster({ messageId: 'commonError', toasterType: 'error' })
    }

  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.profileID) },
      { data: formatMessage(messages.hostNameLabel) },
      { data: formatMessage(messages.hostEMailLabel) },
      { data: formatMessage(messages.RequestedFiles) },
      { data: formatMessage(messages.actionLabel) }
    ]
  }

  tbody = (props) => {
    const { showAllDocument: { showAllDocument }, currentPage } = props;
    const { formatMessage } = props.intl;
    return showAllDocument?.results?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value?.profile?.profileId },
          { data: value?.profile?.firstName },
          { data: value?.email },
          { data: <FileList key={'f' + key} data={value?.document} /> },
          {
            data: <select className={cx(bt.commonControlSelect, s.userVerticalAlign, s.btnMarginBottom, s.selectMargin)}
              value={value?.verification?.isIdVerification} onChange={(e) => this.handleUpdate(value?.id, e?.target?.value, value)}>
              <option value={0}>{formatMessage(messages.messageStatus5)}</option>
              <option value={1}>{formatMessage(messages.documentApprove)}</option>
              <option value={2}>{formatMessage(messages.documentReject)}</option>
            </select>
          }
        ]
      }
    })
  }


  render() {
    const { showAllDocument: { showAllDocument }, currentPage } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommonTable
          title={formatMessage(messages.documentVerificationManagement)}
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
          isSearch
          handleSearch={(e) => this.handleSearchChange(e?.target?.value)}
        />
        {
          showAllDocument?.results?.length > 0 && <div>
            <CustomPagination
              total={showAllDocument.count}
              currentPage={currentPage}
              defaultCurrent={1}
              defaultPageSize={10}
              change={this.paginationData}
              paginationLabel={formatMessage(messages.usersLabel)}
              isScroll
            />
          </div>
        }
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default compose(injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch),
  graphql(DocumentManagement, { options: { fetchPolicy: 'network-only' } }),
  graphql(showAllDocumentQuery, {
    name: 'showAllDocument',
    options: (props) => ({
      variables: {
        currentPage: props.currentPage,
        searchList: props.searchList,
      },
      fetchPolicy: 'network-only',
    })
  })
)(DocumentVerification);