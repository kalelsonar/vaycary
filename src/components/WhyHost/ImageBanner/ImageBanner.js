import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { connect } from 'react-redux';
import {
  Button,
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';
import s from './ImageBanner.css';
import history from '../../../core/history';
// Locale
import messages from '../../../locale/messages';
class SocialLogin extends Component {
  static propTypes = {
    formatMessage: PropTypes.any,
    refer: PropTypes.string,
    siteName: PropTypes.string.isRequired
  };

  static defaultProps = {
    isAuthenticated: false
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      history.push('/become-a-host?mode=new');
    } else {
      history.push('/login?refer=/become-a-host?mode=new');
    }
  }

  render() {
    const { data } = this.props;
    const img = data && data.coverSectionImage1
    return (
      <div className={s.container}>
        <Grid>
          <Row>
            <Col lg={12} md={12} sm={12} xs={12}>
              <div className={cx(s.bgImage, s.bgImgeCenter)} style={{ backgroundImage: `url(/images/home/${data && data.whyhostBannerImage})` }}>
                <div>
                  <h3 className={s.titleText}>{data && data.whyhostBannerHeading}</h3>
                  <Button
                    className={s.btn}
                    onClick={this.handleClick}
                  >
                    <FormattedMessage {...messages.becomeAHost} />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = state => ({
  siteName: state.siteSettings.data.siteName,
  isAuthenticated: state.runtime.isAuthenticated,
});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SocialLogin)));
