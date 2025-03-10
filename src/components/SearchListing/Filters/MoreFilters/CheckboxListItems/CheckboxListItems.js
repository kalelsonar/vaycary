
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './CheckboxListItems.css';
import {
  Button,
  Collapse
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../../locale/messages';

// Internal Component
import CustomCheckbox from '../../../../CustomCheckbox';

// Submit
import submit from '../../../SearchForm/submit';

//Images
import DefaultIcon from '/public/SiteIcons/defaultIcon.png';
import { url } from '../../../../../config';
import downArrow from '/public/SiteIcons/filterAllDownIcon.svg';
import upArrow from '/public/SiteIcons/filterAllUparrow.svg';

class CheckboxListItems extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    options: [],
    showLabel: 'Show',
    hideLabel: 'Hide',
    isActive: false
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.checkboxGroup = this.checkboxGroup.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.renderCollapse = this.renderCollapse.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { isActive } = this.props;
    this.setState({
      isOpen: isActive
    });
  }

  componentDidMount() {
    const { isActive } = this.props;
    this.setState({
      isOpen: isActive
    });
  }

  handleToggle() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen
    });
  }

  renderCollapse(input, restArray, isOpen) {
    const { showLabel, hideLabel, showImage } = this.props;

    if (restArray && restArray.length > 0) {
      return (
        <div className={cx(s.space2)}>
          <Collapse className={s.collapseContainer} in={isOpen}>
            <div>
              {
                restArray.map((option, index) => {
                  return (
                    <div key={index} className={cx(s.checkBoxContainer)}>
                      <div className={cx(s.space2, s.displayFlex)}>
                        <div>
                          <CustomCheckbox
                            className={'icheckbox_square-green'}
                            name={`${input.name}[${index}]`}
                            value={option.id}
                            checked={input.value.indexOf(option.id) !== -1}
                            onChange={event => {
                              const newValue = [...input.value];
                              if (event === true) {
                                newValue.push(option.id);
                              } else {
                                newValue.splice(newValue.indexOf(option.id), 1);
                              }
                              return input.onChange(newValue);
                            }}
                          />
                        </div>
                        {showImage && <span className={cx(s.checkBoxImage, 'svgImg', 'checkBoxImageRTL')}>
                          {
                            option.image ?
                              <img src={url + '/images/amenities/' + option.image} className={cx(s.imgSection, 'moreSectionRtl')} /> :
                              <img src={DefaultIcon} className={cx(s.imgSection, 'moreSectionRtl')} />
                          }
                        </span>}
                        <span className={cx(s.captionTitle, s.textSection)}>
                          {option.itemName}
                        </span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Collapse>
          <Button bsStyle="link" type="button" className={cx(s.btn, s.btnLink, s.btnLinkSecondary, s.toggleLink, s.captionTitle, s.filterToggleLink, s.dropdownOverflow, 'bgBlack', 'bgBlackHover')}
            onClick={() => this.handleToggle()}>
            {isOpen ? hideLabel : showLabel}
            {
              isOpen && <img src={upArrow} className={cx(s.iconLeft, 'homeTypeIconLeftRTL')}/>
            }
            {
              !isOpen && <img src={downArrow} className={cx(s.iconLeft, 'homeTypeIconLeftRTL')}/>
            }
          </Button>
        </div>
      );
    } else {
      return <span />
    }

  }

  checkboxGroup = ({ label, name, options, input, isOpen }) => {
    const { showImage } = this.props;
    let count = 4, firstArray = [], restArray = [];
    let itemList = options && options.length > 0 ? options.filter(o => o.isEnable == "1") : [];
    if (itemList && itemList.length > 0) {
      firstArray = itemList.slice(0, count);
      restArray = itemList.slice(count, itemList.length);
    }

    return (
      <div>
        {
          firstArray.map((option, index) => {
            return (
              <div key={index} className={cx(s.checkBoxContainer)}>
                <div className={cx(s.space2, s.displayFlex)}>
                  <div>
                    <CustomCheckbox
                      className={'icheckbox_square-green'}
                      name={`${input.name}[${index}]`}
                      value={option.id}
                      checked={input.value.indexOf(option.id) !== -1}
                      onChange={event => {
                        const newValue = [...input.value];
                        if (event === true) {
                          newValue.push(option.id);
                        } else {
                          newValue.splice(newValue.indexOf(option.id), 1);
                        }
                        return input.onChange(newValue);
                      }}
                    />
                  </div>
                  {showImage && <span className={cx(s.checkBoxImage, 'svgImg', 'checkBoxImageRTL')}>
                    {
                      option.image ?
                        <img src={url + '/images/amenities/' + option.image} className={cx(s.imgSection, 'moreSectionRtl')} /> :
                        <img src={DefaultIcon} className={cx(s.imgSection, 'moreSectionRtl')} />
                    }
                  </span>}
                  <span className={cx( s.captionTitle, s.textSection)}>
                    {option.itemName}
                  </span>
                </div>
              </div>
            )
          })
        }
        {this.renderCollapse(input, restArray, isOpen)}
      </div>
    )
  };

  render() {
    const { className, handleTabToggle, isExpand } = this.props;
    const { options, captionTitle, fieldName } = this.props;
    const { formatMessage } = this.props.intl;
    const { isOpen } = this.state;

    return (
      <div className={className}>
        <p className={cx(s.moreFilterTitle, s.space4, s.spaceTop4, s.textBold)}>
          {captionTitle}
        </p>
        <div className={cx(s.displayTable, s.space2)}>
          <div className={cx(s.displayTableCell, s.fullWidth)}>
            <Field
              name={fieldName}
              options={options}
              component={this.checkboxGroup}
              isOpen={isOpen}
            />
          </div>
        </div>
      </div>
    );
  }
}

CheckboxListItems = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(CheckboxListItems);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(CheckboxListItems)));