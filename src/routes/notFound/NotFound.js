import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { flowRight as compose } from 'lodash';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import s from './NotFound.css';
import cs from '../../components/commonStyle.css';
import Link from '../../components/Link';
import { NotFoundLinks } from '../../helpers/notFoundLinks';

import messages from '../../locale/messages';
class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    siteName: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
  };

  render() {
    const { siteName } = this.props;
    const redirectionLinks = NotFoundLinks();

    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(cs.space6, cs.spaceTop6)}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.textCenter}>
              <h1 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h1 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h2><FormattedMessage {...messages.notFoundSubTitle} /></h2>
              <span className={s.subTitle}><FormattedMessage {...messages.errorCode} /></span>
              <ul className={cx(cs.spaceTop2, s.listStyled, 'listStyledRTL')}>
                <li className={cs.space2}>
                  <span><FormattedMessage {...messages.linksTitle} /></span>
                </li>
                {
                  redirectionLinks?.map((item, key) => {
                    return (
                      <li key={key}>
                        <Link to={item?.path}>
                          <FormattedMessage {...messages?.[item?.label]} />{' '}{item?.isSite && siteName}
                        </Link>
                      </li>
                    )
                  })
                }
              </ul>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {};

export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch),
)(NotFound);