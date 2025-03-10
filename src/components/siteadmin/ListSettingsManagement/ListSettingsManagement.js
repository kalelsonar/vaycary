import React from 'react';
import { compose } from 'react-apollo';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ListSettingsModal from '../ListSettingsModal';
import EditListSettingsForm from '../ListSettingsForm/EditListSettingsForm';
import Loader from '../../Loader';
import CustomPagination from '../../CustomPagination';
import CommonTable from '../../CommonTable/CommonTable';

import messages from '../../../locale/messages';
import { openListSettingsModal } from '../../../actions/siteadmin/modalActions';
import { getAdminListingSettings } from '../../../actions/siteadmin/getAdminListingSettings';

import s from './ListSettingsManagement.css';
import bt from '../../../components/commonStyle.css';
class ListSettingsManagement extends React.Component {

  static defaultProps = {
    loading: true
  };

  paginationData = async (currentPage, typeId) => {
    const { getAdminListingSettings } = this.props;
    await getAdminListingSettings(typeId, currentPage);
  }

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.settingsIDLabel) },
      { data: formatMessage(messages.addItemNew) },
      { data: formatMessage(messages.status) },
      { data: formatMessage(messages.operationLabel) }
    ]
  }

  tbody = (listSettingsData) => {
    const { openListSettingsModal } = this.props;
    const { formatMessage } = this.props.intl;
    return listSettingsData?.map(function (item, key) {
      let status = item?.isEnable == 1 ? formatMessage(messages.enabledLabel) : formatMessage(messages.disabledLabel);
      return {
        id: key,
        data: [
          { data: item?.id },
          { data: item?.itemName },
          { data: status },
          {
            data: <Button className={cx(bt.btnPrimaryBorder, 'textCenterAdmin', 'bgBlack')} onClick={() => openListSettingsModal(item, "EditListSettingsForm")}>
              <FormattedMessage {...messages.manageLabel} />
            </Button>
          }
        ]
      }
    })
  }

  renderTable(listSettingsTypeData, listSettingsData, count) {
    const { openListSettingsModal, page } = this.props;
    const { formatMessage } = this.props.intl;
    let currentTypeId = listSettingsTypeData && listSettingsTypeData.id;

    return (
      <div>
        <ListSettingsModal />
        <CommonTable
          thead={this.thead}
          tbody={() => this.tbody(listSettingsData)}
          addAction={() => openListSettingsModal({ typeId: listSettingsTypeData?.id }, "AddListSettingsForm")}
          redirectionLabel={formatMessage(messages.addNewLabel)}
        />
        {
          listSettingsData?.length > 0 && <div>
            <CustomPagination
              total={count}
              currentPage={page}
              defaultCurrent={1}
              defaultPageSize={10}
              change={(e) => this.paginationData(e, currentTypeId)}
              paginationLabel={formatMessage(messages.listSettings)}
              isScroll
            />
          </div>
        }
      </div>
    );
  }

  renderForm(listSettingsTypeData, listSettingsData) {
    return (
      <div>
        <EditListSettingsForm
          initialValues={listSettingsData && listSettingsData.length > 0 && listSettingsData[0]}
          fieldType={listSettingsTypeData.fieldType}
        />
      </div>
    );
  }

  render() {
    const { loading, adminListSettings } = this.props;
    let listSettingsTypeData, listSettingsData, count, errorMessage, status;

    if (!loading && adminListSettings) {
      status = adminListSettings.getAllAdminListSettings && adminListSettings.getAllAdminListSettings.status;
      if (status === 200) {
        listSettingsTypeData = adminListSettings.getAllAdminListSettings.listSettingsTypeData;
        listSettingsData = adminListSettings.getAllAdminListSettings.listSettingsData;
        count = adminListSettings.getAllAdminListSettings.count;
      } else {
        errorMessage = adminListSettings.getAllAdminListSettings.errorMessage;
      }
    }

    return (
      <div>
        {
          loading && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div><Loader type={"text"} /></div>
          </div>
        }
        {
          !loading && status === 200 && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div>
              <h1 className={s.headerTitle}>{listSettingsTypeData.typeLabel}</h1>
              {
                listSettingsTypeData.fieldType === 'numberType' && this.renderForm(listSettingsTypeData, listSettingsData)
              }
              {
                listSettingsTypeData.fieldType !== 'numberType' && this.renderTable(listSettingsTypeData, listSettingsData, count)
              }
            </div>
          </div>
        }
        {
          !loading && status !== 200 && <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
            <div>{errorMessage}</div>
          </div>
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  loading: state.adminListSettingsData.loading,
  adminListSettings: state.adminListSettingsData.data,
  page: state.adminListSettingsData.currentPage
});

const mapDispatch = {
  openListSettingsModal,
  getAdminListingSettings
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(ListSettingsManagement);