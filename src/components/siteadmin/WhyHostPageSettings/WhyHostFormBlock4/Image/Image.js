import React from 'react';
import { compose } from 'react-apollo';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { formValueSelector, change } from 'redux-form';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import ImageUploadComponent from '../../../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../../../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../../../locale/messages';
import { homebanneruploadDir } from '../../../../../config';
import { doRemoveWhyHostImage } from '../../../../../actions/siteadmin/manageStaticBlock';
import { photosShow } from '../../../../../helpers/photosShow';

import s from './Image.css';
import bt from '../../../../../components/commonStyle.css';

class Image extends React.Component {

  static defaultProps = {
    loader: false
  };

  success = async (file, fromServer) => {
    const { change } = this.props;
    let fileName = fromServer.file.filename;
    await change('WhyHostForm', 'coverSectionImage1', fileName);
  }

  deleteImage = async () => {
    const { doRemoveWhyHostImage } = this.props;
    await doRemoveWhyHostImage('coverSectionImage1');
  }

  render() {
    const { loader, image, whyHostLoader4 } = this.props;
    const { formatMessage } = this.props.intl;
    let path = photosShow(homebanneruploadDir);

    return (
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
          <div className={bt.picContainerMain}>
            <div className={cx(bt.picContainer, 'bgBlack')}>
              <CommonImageDisplay
                loader={whyHostLoader4}
                image={path + image}
                isDefaultPic={image ? false : true}
                isDelete={true}
                deleteImage={this.deleteImage}
              />
            </div>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2)}>
          <div className={cx(s.fullWidth, s.button, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
            <ImageUploadComponent
              defaultMessage={formatMessage(messages.clickHeretoUploadImage)}
              componentConfig={{
                iconFiletypes: ['.jpg', '.png', '.jpeg'],
                multiple: false,
                showFiletypeIcon: false,
                postUrl: '/uploadHomeBanner'
              }}
              loaderName={'whyHostLoader4'}
              success={this.success}
            />
          </div>
        </Col>
      </Row>
    );
  }
}
const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  loader: state?.image?.loader,
  image: selector(state, 'coverSectionImage1'),
  whyHostLoader4: state?.loader?.whyHostLoader4
});

const mapDispatch = {
  doRemoveWhyHostImage,
  change
};

export default compose(
  injectIntl,
  withStyles(s, bt),
  connect(mapState, mapDispatch)
)(Image);