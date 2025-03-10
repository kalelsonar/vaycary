// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Redux Form
import { Field, reduxForm } from 'redux-form';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
// Redux
import { connect } from 'react-redux';
// Locale
import messages from '../../locale/messages';
// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import {
  FormGroup,
  Tab,
  NavItem,
  Row,
  Col,
  Nav
} from 'react-bootstrap';

// Internal Components
import FooterButton from './FooterButton';
import SidePanel from './SidePanel';


import { url } from '../../config';
import update from './update';

//Images
import DefaultIcon from '/public/SiteIcons/defaultIcon.png';
import s from './ListPlaceStep1.css';
import bt from '../../components/commonStyle.css';
class Page7 extends Component {

  static propTypes = {
    initialValues: PropTypes.object,
    previousPage: PropTypes.any,
    nextPage: PropTypes.any,
  };

  constructor(props) {
    super(props);
    this.state = {
      essentialsAmenities: [],
      safetyAmenities: [],
    }
  }

  UNSAFE_componentWillMount() {
    const { listingFields } = this.props;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { listingFields } = nextProps;
    if (listingFields != undefined) {
      this.setState({
        essentialsAmenities: listingFields.essentialsAmenities,
        safetyAmenities: listingFields.safetyAmenities,
      });
    }
  }

  checkboxGroup = ({ label, name, options, input }) => (
    <ul className={cx(s.listContainer, s.safetyAmenitiesFlex)}>
      {options.map((option, index) => {
        if (option.isEnable === "1") {
          return (
            <li className={cx('amenitiesCheckBox', s.flex)} key={index}>
              <div className={s.checkBoxOutline}>
                <div className={cx(s.amenitiesCheckBoxWrapper, "darkModeAmenitiesCheckBoxWrapper", { [s.checked]: input.value.indexOf(option.id) !== -1 }, { ["darkModeAmenitiesChecked"]: input.value.indexOf(option.id) !== -1 }, 'svgImg')} onClick={() => {
                  const newValue = [...input.value];
                  if (newValue.indexOf(option.id) !== -1) {
                    newValue.splice(newValue.indexOf(option.id), 1);
                  } else {
                    newValue.push(option.id);
                  }
                  input.onChange(newValue);

                }}>
                  {
                    option.image ? (
                      <img src={url + '/images/amenities/' + option.image} className={cx(s.imgSection, 'imgSectionRtl', 'darkModeFilterNone')} />
                    ) : (
                      <img src={DefaultIcon} className={cx(s.imgSection, 'imgSectionRtl')} />
                    )
                  }
                  < div className={s.checkoutText}>{option.itemName}</div>
                </div>
              </div>
            </li>
          )
        }
      })
      }
    </ul >
  );

  render() {
    const { handleSubmit, previousPage, nextPage, formPage, step } = this.props;
    const { formatMessage } = this.props.intl;
    const { essentialsAmenities, safetyAmenities } = this.state;

    return (
      <div className={s.grid}>
        <SidePanel
          title={formatMessage(messages.stepOneCommonHeading)}
          landingContent={formatMessage(messages.whatamenities)}
        />
        <div className={s.landingMainContent}>
          <form onSubmit={handleSubmit}>
            <Tab.Container id="tabs-with-dropdown" defaultActiveKey="first" className={'amenitiesTab'}>
              <Row className="clearfix">
                <Col sm={12}>
                  <Nav bsStyle="tabs">
                    <NavItem eventKey="first"><FormattedMessage {...messages.aminities} /></NavItem>
                    <NavItem eventKey="second"><FormattedMessage {...messages.safetyamenities} /></NavItem>
                  </Nav>
                </Col>
                <Col sm={12}>
                  <Tab.Content animation>
                    <Tab.Pane eventKey="first">
                      <FormGroup className={s.formGroup}>
                        <Field name="amenities" component={this.checkboxGroup} options={essentialsAmenities} />
                      </FormGroup>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <FormGroup className={s.formGroup}>
                        <Field name="safetyAmenities" component={this.checkboxGroup} options={safetyAmenities} />
                      </FormGroup>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>

            <FooterButton
              nextPage={nextPage}
              previousPage={previousPage}
              nextPagePath={"spaces"}
              previousPagePath={"map"}
              formPage={formPage}
              step={step}
            />

          </form>
        </div>
      </div>
    )
  }
}

Page7 = reduxForm({
  form: 'ListPlaceStep1', // a unique name for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit: update
})(Page7);

const mapState = (state) => ({
  listingFields: state.listingFields.data
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(Page7)));