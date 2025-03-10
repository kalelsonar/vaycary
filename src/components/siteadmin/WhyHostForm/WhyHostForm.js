import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Field, reduxForm, FieldArray, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import ImageUploadComponent from '../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../CommonImageDisplay/CommonImageDisplay';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import submit from './submit';
import validate from './validate';
import messages from '../../../locale/messages';
import { whyHostUploadDir } from '../../../config';
import { photosShow } from '../../../helpers/photosShow';

import deleteIcon from '/public/SiteIcons/deleteIcon.svg'

import s from './WhyHostForm.css';
import bt from '../../../components/commonStyle.css';

class WhyHostForm extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    title: PropTypes.string.isRequired,
  };


  renderDocument = ({ fields, meta: { touched, error } }) => {
    const { formatMessage } = this.props.intl;
    const { whyHostUploaderLoading } = this.props;
    let path = photosShow(whyHostUploadDir);

    return (
      <div className={s.whyFromGrid}>
        {fields && fields.length > 0 && fields.map((document, index) => {
          let fieldLength = fields.length - 1;
          let image = fields.get(index) && fields.get(index).imageName;

          const success = async (file, fromServer) => {
            const { change } = this.props;
            const fieldName = `${document}.imageName`;
            const fileName = fromServer.file.filename;
            await change(fieldName, fileName)
          }

          return (
            <div>
              <div className={s.sectionBorder}>
                {fields && fields.length > 1 && <div className={cx(s.removeSection, 'removeSectionRTL', bt.textAlignRight, 'textAlignLeftRtl')}>
                  <img src={deleteIcon} onClick={() => fields.remove(index)} className={s.removeIcon} />
                </div>}
                <FormGroup className={bt.space3}>
                  <label className={s.labelTextNew}>{formatMessage(messages.imageLabel)}</label>
                  <div className={bt.picContainerMain}>
                    <div className={cx(bt.picContainer, 'bgBlack')}>
                      <div className={cx(bt.profilePic, bt.whiteBgImageUploadSec)}>
                        <CommonImageDisplay
                          loader={whyHostUploaderLoading['whyHostUploaderLoading' + index]}
                          image={path + image}
                          isDefaultPic={image ? false : true}
                          isDelete={false}
                        />
                      </div>
                    </div>
                  </div>
                  <div className={cx(s.fullWidth, s.noPadding, s.space2, s.spaceTop2)}>
                    <div className={cx(s.profileNoPadding, bt.btnPrimary, bt.noPadding, 'photoUploadBtn')}>
                      <ImageUploadComponent
                        subText={formatMessage(messages.uploadSizedLabel)}
                        defaultMessage={formatMessage(messages.dropzoneUpload)}
                        componentConfig={{
                          iconFiletypes: ['.jpg', '.png', '.jpeg'],
                          multiple: false,
                          showFiletypeIcon: false,
                          postUrl: '/uploadWhyHost'
                        }}
                        loaderName={`whyHostUploaderLoading${index}`}
                        success={success}
                        maxUploadText={cx(s.spaceTop2, bt.textAlignCenter)}
                      />
                    </div>
                  </div>
                </FormGroup>
                <Field
                  name={`${document}.title`}
                  type="text"
                  placeholder={formatMessage(messages.tabTitle)}
                  component={InputFieldComponent}
                  label={formatMessage(messages.tabTitle)}
                  inputClass={cx(bt.commonControlInput)}
                />
                <Field
                  name={`${document}.buttonLabel`}
                  type="text"
                  placeholder={formatMessage(messages.buttonLabel)}
                  component={InputFieldComponent}
                  label={formatMessage(messages.buttonLabel)}
                  inputClass={cx(bt.commonControlInput)}
                />
              </div>
              {
                fieldLength == index &&
                <div className={cx(s.spaceTop3, 'textAlignRightRtl')}>
                  <Button
                    variant="primary"
                    onClick={() => fields.push({ imageName: null, title: null, buttonLabel: null })}
                    className={cx(bt.btnPrimary, bt.btnLarge)}
                  >
                    {formatMessage(messages.add)}
                  </Button>
                </div>
              }
            </div>
          )
        })
        }
      </div>
    )
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h1 className={s.headerTitle}><FormattedMessage {...messages.whyHostPage} /></h1>
            <form onSubmit={handleSubmit(submit)}>
              <FieldArray
                name="dataList"
                rerenderOnEveryChange={true}
                component={this.renderDocument}
              />
              <div className={cx(bt.textAlignRight, s.spaceTop3, 'textAlignLeftRtl')}>
                <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                  <FormattedMessage {...messages.save} />
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    );
  }

}

WhyHostForm = reduxForm({
  form: 'WhyHostForm',
  validate
})(WhyHostForm);

const selector = formValueSelector('WhyHostForm');

const mapState = (state) => ({
  dataList: selector(state, 'dataList'),
  whyHostUploaderLoading: state?.loader
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(WhyHostForm)));