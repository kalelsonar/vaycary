import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { deleteListSettings } from '../../../actions/siteadmin/deleteListSettings';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import ImageUploadComponent from '../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../CommonImageDisplay/CommonImageDisplay';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

import update from './update';
import validate from './validate';
import messages from '../../../locale/messages';
import { amenitiesUploadDir } from '../../../config';
import { photosShow } from '../../../helpers/photosShow';

import s from './ListSettingsForm.css';
import bt from '../../../components/commonStyle.css';

class EditListSettingsForm extends Component {

  static propTypes = {
    isEnable: PropTypes.string,
    id: PropTypes.number,
    typeId: PropTypes.number,
    fieldType: PropTypes.string,
    deleteListSettings: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      fieldType: null
    }
  }

  UNSAFE_componentWillMount() {
    const { fieldType } = this.props;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { fieldType } = nextProps;
    if (fieldType != undefined) {
      this.setState({ fieldType: fieldType });
    }
  }


  handleChange = async () => {
    const { change } = this.props;
    await change('image', null)
  }

  success = (file, fromServer) => {
    const { change } = this.props
    let fileName = fromServer.file.filename;
    change('image', fileName)
  }

  render() {
    const { error, handleSubmit, submitting, roomTypeLoader2 } = this.props;
    const { formatMessage } = this.props.intl;
    const { id, typeId, deleteListSettings, image } = this.props;
    const { fieldType } = this.state;
    let path = photosShow(amenitiesUploadDir);
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty', 'adminRadioBtn')}>
        <form onSubmit={handleSubmit(update)}>
          {error && <strong>{formatMessage(error)}</strong>}
          <FormGroup className={s.space3}>
            <Field
              name="itemName"
              type="text"
              component={InputFieldComponent}
              label={formatMessage(messages.addItemNew)}
              inputClass={cx(bt.commonControlInput)}
            />
          </FormGroup>
          {
            (typeId === 11 || typeId === 10 || typeId === 12 || typeId === 1) &&
            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
              <p className={s.labelTextNew}><FormattedMessage {...messages.IconLabel} /></p>
              <div className={bt.picContainerMain}>
                <div className={cx(bt.picContainer, 'bgBlack')}>
                  <p className={cx('hidden-md hidden-lg hidden-sm')}>&nbsp;</p>
                  <CommonImageDisplay
                    loader={roomTypeLoader2}
                    image={path + image}
                    isDelete={true}
                    isDefaultPic={image ? false : true}
                    deleteImage={this.handleChange}
                  />
                </div>
              </div>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(s.space2, s.spaceTop2, s.noPadding)}>
                <div className={cx(s.fullWidth, bt.btnPrimary, s.noPadding, 'photoUploadBtn')}>
                  <ImageUploadComponent
                    defaultMessage={formatMessage(messages.UploadImage)}
                    componentConfig={{
                      iconFiletypes: ['.jpg', '.png', '.jpeg'],
                      multiple: false,
                      showFiletypeIcon: false,
                      postUrl: '/uploadAmenities'
                    }}
                    loaderName={'roomTypeLoader2'}
                    success={this.success}
                  />
                </div>
              </Col>
            </Col>
          }
          {
            fieldType == "numberType" && <div>
              <FormGroup className={s.space3}>
                <Field
                  name="otherItemName"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.addOtherItem)}
                  inputClass={bt.commonControlInput}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="startValue"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.startValue)}
                  inputClass={bt.commonControlInput}
                  maxLength={5}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="endValue"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.endValue)}
                  inputClass={bt.commonControlInput}
                  maxLength={5}
                />
              </FormGroup>
            </div>
          }
          {
            fieldType != "numberType" && <div>
              <FormGroup className={s.space3}>
                <label className={cx(s.labelTextNew, s.btnUPdate, bt.curderPointer)}>
                  <Field name="isEnable" component="input" type="radio" value="1" /> <span className={s.radioBtn}>{formatMessage(messages.enable)}</span>
                </label>
                <label className={cx(s.labelTextNew, s.btnModalDelete, bt.curderPointer, 'adminDelete')}>
                  <Field name="isEnable" component="input" type="radio" value="0" /> <span className={s.radioBtn}>{formatMessage(messages.disable)}</span>
                </label>
              </FormGroup>
              <FormGroup className={cx(s.space3)}>
                <Row>
                  <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <div className={s.btnUPdate}>
                      <Button className={cx(bt.btnPrimary, s.btnWidth)} type="submit" disabled={submitting}>
                        {formatMessage(messages.update)}
                      </Button>
                    </div>
                    <div className={cx(s.btnModalDelete, 'adminUpdate')}>
                      <Button className={cx(bt.btnPrimaryBorder, s.btnWidth, 'bgBlack')} onClick={() => deleteListSettings(id, typeId)} disabled={submitting}>
                        {formatMessage(messages.delete)}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </FormGroup>
            </div>
          }
          {
            fieldType === "numberType" && <FormGroup className={s.space3}>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                  <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting}>
                    {formatMessage(messages.update)}
                  </Button>
                </Col>
              </Row>
            </FormGroup>
          }
        </form>
      </div>
    )
  }

}

EditListSettingsForm = reduxForm({
  form: "EditListSettingsForm",
  validate
})(EditListSettingsForm);

const selector = formValueSelector("EditListSettingsForm");

const mapState = (state) => ({
  isEnable: selector(state, 'isEnable'),
  id: selector(state, 'id'),
  typeId: selector(state, 'typeId'),
  image: selector(state, 'image'),
  roomTypeLoader2: state?.loader?.roomTypeLoader2
});

const mapDispatch = {
  deleteListSettings,
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(EditListSettingsForm)));