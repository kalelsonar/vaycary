import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { injectIntl, FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';

import ImageUploadComponent from '../../Common/ImageUploadComponent/ImageUploadComponent';
import CommonImageDisplay from '../CommonImageDisplay/CommonImageDisplay';

import messages from '../../../locale/messages';
import submit from './submit';
import validate from './validate';
import { amenitiesUploadDir } from '../../../config';
import { photosShow } from '../../../helpers/photosShow';

import s from './ListSettingsForm.css';
import bt from '../../../components/commonStyle.css';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';

class AddListSettingsForm extends Component {

  static propTypes = {
    fieldType: PropTypes.string,
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

  success = async (file, fromServer) => {
    const { change } = this.props
    let fileName = fromServer.file.filename;
    change('image', fileName)
  }

  render() {
    const { error, handleSubmit, submitting, typeId, image, roomTypeLoader1 } = this.props;
    const { formatMessage } = this.props.intl;
    const { fieldType } = this.state;
    let path = photosShow(amenitiesUploadDir);
    return (
      <div className={cx(s.formMaxWidth, 'maxwidthcenter', 'empty')}>
        <form onSubmit={handleSubmit(submit)}>
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
                    loader={roomTypeLoader1}
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
                    loaderName={'roomTypeLoader1'}
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
                  inputClass={cx(bt.commonControlInput)}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="startValue"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.startValue)}
                  inputClass={cx(bt.commonControlInput)}
                />
              </FormGroup>
              <FormGroup className={s.space3}>
                <Field
                  name="endValue"
                  type="text"
                  component={InputFieldComponent}
                  label={formatMessage(messages.endValue)}
                  inputClass={cx(bt.commonControlInput)}
                />
              </FormGroup>
            </div>
          }
          <FormGroup className={s.space1}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} className={cx(bt.textAlignRight, s.spaceTop3, 'textAlignLeftRtl')}>
                <Button className={cx(bt.btnPrimaryBorder, bt.btnLarge, 'bgBlack')} type="submit" disabled={submitting}>
                  {formatMessage(messages.add)}
                </Button>
              </Col>
            </Row>
          </FormGroup>
        </form>
      </div>
    )
  }
}

AddListSettingsForm = reduxForm({
  form: "AddListSettingsForm",
  validate,
})(AddListSettingsForm);

const selector = formValueSelector("AddListSettingsForm");

const mapState = (state) => ({
  typeId: selector(state, 'typeId'),
  image: selector(state, 'image'),
  roomTypeLoader1: state?.loader?.roomTypeLoader1
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddListSettingsForm)));