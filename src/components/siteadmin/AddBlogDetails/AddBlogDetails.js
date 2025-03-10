import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './AddBlogDetails.css';
import bt from '../../../components/commonStyle.css';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import submit from './submit';
import validate from './validate';
import { injectIntl } from 'react-intl';
// Style
import {
  Button,
  FormGroup,
  Col,
  Row,
  FormControl,
  Panel,
  InputGroup
} from 'react-bootstrap';

import { url, siteName } from '../../../config.js';
import { formatURL } from '../../../helpers/formatURL';
import Link from '../../Link';

// Translation
import { FormattedMessage } from 'react-intl';
import messages from '../../../locale/messages';
import InputFieldComponent from '../../Common/FormField/InputFieldComponent';
import SelectFieldComponent from '../../Common/FormField/SelectFieldComponent';

class AddBlogDetails extends React.Component {

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill');
      this.Quill = require('quill');
    }
    this.state = { editorHtml: '' } // You can also pass a Quill Delta here
    this.handlePageTitle = this.handlePageTitle.bind(this);
  }


  async handlePageTitle(e) {
    const { change } = this.props;
    if (e.target.value) {
      await change('pageUrl', formatURL(e.target.value));
    } else {
      await change('pageUrl', '');
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
    formatMessage: PropTypes.func,
    initialValues: PropTypes.object,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
    })),
  };

  static defaultProps = {
    data: []
  };

  renderQuill = ({ input, label, type, meta: { touched, error }, className }) => {
    const ReactQuill = this.ReactQuill;
    const Quill = this.Quill;
    const { formatMessage } = this.props.intl;
    let modules = {
      toolbar: [
        [{ 'header': '1' }, { 'header': '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        // ['link', 'image'],
      ],
      clipboard: {
        matchVisual: false,
      }
    };

    let formats = [
      'header', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link'
      // 'link', 'image'
    ];
    return (
      <div>
        <ReactQuill
          {...input}
          onChange={(newValue, delta, source) => {
            if (source === 'user') {
              input.onChange(newValue);
            }
          }}
          onBlur={(range, source, quill) => {
            if (quill.getHTML() == '<p><br></p>') {
              input.onBlur('');
            }
            else {
              input.onBlur(quill.getHTML());
            }

          }}
          placeholder={formatMessage(messages.writeSomethigs)}
          modules={modules}
          formats={formats}
          theme="snow"
        />
        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
      </div>
    );
  }


  render() {
    const { error, handleSubmit, submitting, dispatch, initialValues, title, siteName } = this.props;
    const ReactQuill = this.ReactQuill;
    const { formatMessage } = this.props.intl;
    const Quill = this.Quill;
    const gobackcss = { padding: '10px' };
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
          <Row>
            <Col xs={12} sm={12} md={12} lg={8}>
              <h1 className={s.headerTitle}>{title}</h1>
              <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                <Link to={"/siteadmin/content-management"} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                  <FormattedMessage {...messages.goBack} />
                </Link>
              </div>
              <Panel className={cx(s.panelHeader, 'bgBlack')}>
                <form onSubmit={handleSubmit(submit)}>
                  {error && <strong>{formatMessage(error)}</strong>}
                  <Field name="metaTitle"
                    type="text"
                    component={InputFieldComponent}
                    label={formatMessage(messages.metaTitleLabel)}
                    placeholder={formatMessage(messages.metaTitleLabel)}
                    inputClass={bt.commonControlInput}
                  />
                  <Field name="metaDescription"
                    className={s.textareaInput}
                    component={InputFieldComponent}
                    componentClass={'textarea'}
                    label={formatMessage(messages.metaDescriptionLabel)}
                    placeholder={formatMessage(messages.metaDescriptionLabel)}
                  />
                  <Field name="pageTitle" type="text" component={InputFieldComponent} label={formatMessage(messages.pageTitleLabel)}
                    placeholder={formatMessage(messages.pageTitleLabel)} onChange={(event) => this.handlePageTitle(event)} inputClass={bt.commonControlInput} />

                  <Field name="pageUrl" type="text" component={InputFieldComponent} isAddon={true} suffixLabel={`${url}${formatMessage(messages.pageLabel)}`} label={formatMessage(messages.pageUrl)} placeholder={formatMessage(messages.pageUrlExample)} inputClass={cx(bt.commonControlInput, 'staticPageUrlInput')} addOnContainer={'staticPageUrl'} />

                  <Field name="footerCategory"
                    inputClass={cx(bt.commonControlSelect)}
                    component={SelectFieldComponent}
                    label={formatMessage(messages.footerCategoryLabel)}
                    options={[
                      { value: '', label: formatMessage(messages.ChooseFooterCategory) },
                      { value: siteName, label: siteName },
                      { value: "discover", label: formatMessage(messages.discover) },
                      { value: "hosting", label: formatMessage(messages.hosting) }
                    ]}
                  >
                  </Field>
                  <FormGroup className={bt.space3}>
                    <label className={s.labelTextNew} ><FormattedMessage {...messages.contentLabel} /></label>
                    <Field name="content" component={this.renderQuill} />
                  </FormGroup>
                  <div className={cx(bt.textAlignRight, 'textAlignLeftRtl')}>
                    <Button className={cx(bt.btnPrimary, bt.btnLarge)} type="submit" disabled={submitting} >
                      <FormattedMessage {...messages.save} />
                    </Button>
                  </div>
                </form>
              </Panel>
            </Col>
          </Row>
        </div>
      );
    } else {
      return <textarea />;
    }
  }

}

AddBlogDetails = reduxForm({
  form: 'BlogDetails', // a unique name for this form
  validate
})(AddBlogDetails);



const blogFormSelector = formValueSelector('BlogDetails');

const mapState = (state) => ({
  pageTitle: blogFormSelector(state, 'pageTitle'),
  pageURL: blogFormSelector(state, 'pageUrl'),
  siteName: state.siteSettings.data.siteName
});

const mapDispatch = {
  change
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(AddBlogDetails)));