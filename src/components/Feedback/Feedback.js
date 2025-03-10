import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { graphql, gql } from 'react-apollo';
import { flowRight as compose } from 'lodash';

import { injectIntl } from 'react-intl';
import { Grid } from 'react-bootstrap';
import cx from 'classnames';

import phoneIcon from '/public/SiteImages/live-chat.svg';
import guaranteeIcon from '/public/SiteImages/user.svg';
import verifiedIcon from '/public/SiteImages/verified.svg';

import s from './Feedback.css';
class Feedback extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool,
      getFooterSetting: PropTypes.shape({
        title1: PropTypes.string.isRequired,
        content1: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        content2: PropTypes.string.isRequired,
        title3: PropTypes.string.isRequired,
        content3: PropTypes.string.isRequired,
      })
    }),
  };

  render() {
    const { data: { loading, getFooterSetting } } = this.props;
    if (!loading) {
      return (
        <div className={cx(s.root, 'commonWordBreak')}>
          <div className={s.container}>
            <div className={s.feedbackContainer}>
              <Grid fluid>
                <div className={cx(s.feedbackRow, 'bgBlackTwo')}>
                  {
                    getFooterSetting && <div
                      className={cx(s.feedbackBox, 'feedbackBorderLeftRtl'
                      )}>
                      <div className={s.flex}>
                        <div className={cx(s.feedbackIcon, 'feedbackIconRtl')}>
                          <img src={phoneIcon} className={cx(s.overviewIcon, 'fillWhite')} />
                        </div>
                        <div><label className={cx(s.landingLabel, 'textWhite')}>{getFooterSetting.title1}</label></div>
                      </div>
                      <div className={cx(s.feedbackContent, 'feedbackContent')}>

                        <label className={cx(s.landingCaption, 'textWhite')}>{getFooterSetting.content1}</label>
                      </div>
                    </div>
                  }
                  {
                    getFooterSetting && <div
                      className={cx(s.feedbackBox, 'feedbackBorderNoneRtl')}
                    >
                      <div className={s.flex}>
                        <div className={cx(s.feedbackIcon, 'feedbackIconRtl')}>
                          <img src={guaranteeIcon} className={cx(s.overviewIcon, 'fillWhite')} />
                        </div>
                        <div><label className={cx(s.landingLabel, 'textWhite')}>{getFooterSetting.title2}</label></div>
                      </div>
                      <div className={cx(s.feedbackContent, 'feedbackContent')}>

                        <label className={cx(s.landingCaption, 'textWhite')}>
                          {getFooterSetting.content2}
                        </label>
                      </div>
                    </div>
                  }
                  {
                    getFooterSetting && <div
                      className={cx(s.feedbackBox, 'feedbackBorderRightRtl')}
                    >
                      <div className={s.flex}>
                        <div className={cx(s.feedbackIcon, 'feedbackIconRtl')}>
                          <img src={verifiedIcon} className={cx(s.overviewIcon, 'fillWhite')} />
                        </div>
                        <div><label className={cx(s.landingLabel, 'textWhite')}> {getFooterSetting.title3}</label></div>
                      </div>
                      <div className={cx(s.feedbackContent, 'feedbackContent')}>
                        <label className={cx(s.landingCaption, 'textWhite')}>{getFooterSetting.content3}</label>
                      </div>
                    </div>
                  }
                </div>
              </Grid>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />
    }
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(gql`
   query getFooterSetting {
    getFooterSetting {
        id
        title1
        content1
        title2
        content2
        title3
        content3
      }
    }
`, { options: { ssr: true } })
)(Feedback);
