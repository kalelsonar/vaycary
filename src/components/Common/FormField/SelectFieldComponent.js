import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import withStyles from "isomorphic-style-loader/lib/withStyles";
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import { injectIntl } from "react-intl";
import s from './InputFieldComponent.css';
import bt from '../../../components/commonStyle.css';
class SelectFieldComponent extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        const { label, inputClass, options, input, type, meta: { touched, error }, labelClass } = this.props;
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <FormGroup>
                    {label &&
                        <ControlLabel className={cx(s.commonLableText, labelClass)}>
                            {label}
                        </ControlLabel>
                    }
                    <FormControl
                        {...input}
                        placeholder={label}
                        componentClass="select"
                        type={type}
                        className={inputClass}
                    >
                        {options?.map((item, key) => {
                            return (
                                <option key={key} value={item?.value}>{item?.label}</option>
                            )
                        })}
                    </FormControl>
                    {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                </FormGroup>
            </div>
        )
    }
}

export default injectIntl(withStyles(s, bt)(SelectFieldComponent));
