import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import Link from '../../../components/Link';

import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CommonTable from '../../CommonTable/CommonTable';

// Translation
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../../locale/messages';

import s from './StaticPageManagement.css';
class StaticPageManagement extends React.Component {

  constructor(props) {
    super(props);
  }

  static defaultProps = {
    staticData: [
      { id: 1, label: messages.aboutUsLabel, link: '/about', editLink: '/siteadmin/edit/staticpage/1' },
      { id: 2, label: messages.trustSafety, link: '/safety', editLink: '/siteadmin/edit/staticpage/2' },
      { id: 3, label: messages.travelCredit, link: '/travel', editLink: '/siteadmin/edit/staticpage/3' },
      { id: 4, label: messages.termsPrivacy, link: '/privacy', editLink: '/siteadmin/edit/staticpage/4' },
      { id: 5, label: messages.help, link: '/help', editLink: '/siteadmin/edit/staticpage/5' },
      { id: 6, label: messages.cookieStaticPolicy, link: '/cookie-policy', editLink: '/siteadmin/edit/staticpage/6' }
    ],
  };

  thead = () => {
    const { formatMessage } = this.props.intl;
    return [
      { data: formatMessage(messages.idLabel) },
      { data: formatMessage(messages.pageName) },
      { data: formatMessage(messages.preview) },
      { data: formatMessage(messages.editLabel) }
    ]
  }

  tbody = (props) => {
    const { staticData } = props;
    const { formatMessage } = props.intl;
    return staticData?.map((item, key) => {
      return {
        id: key,
        data: [
          { data: item?.id },
          { data: formatMessage(item?.label) },
          {
            data: <a href={item?.link} target={'_blank'}>
              <FormattedMessage {...messages.preview} />
            </a>
          },
          {
            data: <Link to={item?.editLink}>
              <FormattedMessage {...messages.editLabel} />
            </Link>
          }
        ]
      }
    })
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <CommonTable
          title={formatMessage(messages.staticPageManagement)}
          thead={this.thead}
          tbody={() => this.tbody(this.props)}
        />
      </div>
    );
  }

}

const mapState = (state) => ({
});

const mapDispatch = {
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StaticPageManagement)));