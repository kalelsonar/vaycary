import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '../../Link/Link';
import ModalForm from './ModalForm';

import { openCancelModal } from '../../../actions/siteadmin/modalActions';
import messages from '../../../locale/messages';
import CommonTable from '../../CommonTable/CommonTable';

import bt from '../../../components/commonStyle.css';
import s from './CancellationPolicyManagement.css';
class CancellationPolicyManagement extends React.Component {

  thead = () => {
    const { formatMessage } = this.props.intl;

    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.policyName) },
      { data: formatMessage(messages.policyContent) },
      { data: formatMessage(messages.editLabel) }
    ]
  }

  tbody = (props) => {
    const { data } = props;
    return data?.results?.map((value, key) => {
      return {
        id: key,
        data: [
          { data: value?.id },
          { data: value?.policyName },
          { data: value?.policyContent },
          {
            data: <Link to={"/siteadmin/cancellation-policies/edit/" + value?.id}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          }
        ]
      }
    })
  }

  render() {
    const {  openCancelModal } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <ModalForm />
          <CommonTable
            title={formatMessage(messages.cancellationPolicyManagement)}
            thead={this.thead}
            tbody={() => this.tbody(this.props)}
            addAction={openCancelModal}
            redirectionLabel={formatMessage(messages.updateCancellationInfo)}
          />
      </div>
    );
  }
}

const mapState = (state) => ({
});

const mapDispatch = {
  openCancelModal
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(CancellationPolicyManagement)));