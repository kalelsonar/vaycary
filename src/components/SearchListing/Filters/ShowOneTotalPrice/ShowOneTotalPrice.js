
import React, { Component } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

import Switch from './Switch';

import messages from '../../../../locale/messages';

//Styles
import s from './ShowOneTotalPrice.css';
import cs from '../../../../components/commonStyle.css';

class ShowOneTotalPrice extends Component {

  constructor(props) {
    super(props);
  }

  renderSwitch = ({ input, label, meta: { touched, error }, className, min, max, rangeCurrency }) => {
    const { totalPrice } = this.props;
    return (
      <div className={'searchShowMapBtn'}>
        <Switch
          {...input}
          checked={totalPrice == true}
          formName={'SearchForm'}
          fieldName={'totalPrice'}
          checkedValue={true}
          unCheckedValue={false}
          personalizedName={'totalPrice'}
        />
      </div>
    )
  }

  render() {
    const { className } = this.props;

    return (
      <div className={cs.space4}>
        <div className={cx(cs.displayFlex, cs.alignCenter, cs.justifyContentSpaceBetween, s.ShowPricecurvedbox, 'ShowPricecurvedboxRTL')}>
          <label className={cx(s.labelText, 'labelTextMapRtl')}>
            <FormattedMessage {...messages.totalPrice} />{' '}
            <span className={cx(s.totalDescriptiontext, 'typeNamedarkMode')}><FormattedMessage {...messages.totalPriceDesc} /></span>
          </label>
          <Field
            name="totalPrice"
            component={this.renderSwitch}
          />
        </div>
      </div>
    );
  }
}

ShowOneTotalPrice = reduxForm({
  form: 'SearchForm', // a unique name for this form
  destroyOnUnmount: false,
})(ShowOneTotalPrice);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  totalPrice: selector(state, 'totalPrice')
});

const mapDispatch = {
  change,
  submitForm
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ShowOneTotalPrice)));