import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import InputGroup from 'react-bootstrap/lib/InputGroup';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import { injectIntl } from "react-intl";
import messages from '../../../locale/messages';
import Faq from '/public/SiteIcons/question.svg'
import withStyles from "isomorphic-style-loader/lib/withStyles";
import infoImage from '/public/SiteIcons/editInfoTipIcon.svg';
import ShowPassword from '/public/SiteIcons/pswVisible.svg';
import HidePassword from '/public/SiteIcons/pwdHidden.svg';
import s from './InputFieldComponent.css';
import bt from '../../../components/commonStyle.css';

class InputFieldComponent extends Component {
    static propTypes = {
        prop: PropTypes
    }


    renderToolTip = (label, tooltipIconClass) => {
        const { showToolTip } = this.props
        return (
            <OverlayTrigger placement="top" overlay={<Popover id="popover-positioned-top" className='imageUploadTooltipContainer'>{label}</Popover>}>
                <img src={showToolTip ? infoImage : Faq} className={tooltipIconClass} />
            </OverlayTrigger>
        )
    }

    render() {
        const { input, label, inputClass, meta: { touched, error }, type, textClass, isPassword, children, placeholder, showPassword, addOnContainer } = this.props;
        const { formatMessage } = this.props.intl;
        const { maxLength, disabled, toolTipText, note, labelNumber, componentClass, isAddon, onClick, suffixLabel, prefixLabel, showToolTip, infoText, chars_left } = this.props;

        return (
            isAddon ?
                <div>
                    {label && <label className={s.commonLableText}>{label} {toolTipText && this.renderToolTip(toolTipText, "siteAdminToolTipIcon")}</label>}
                    <FormGroup className={addOnContainer}>
                        <InputGroup>
                            {suffixLabel && <InputGroup.Addon>{suffixLabel}</InputGroup.Addon>}
                            <FormControl
                                {...input}
                                placeholder={placeholder}
                                type={type}
                                className={inputClass}
                            />
                            {prefixLabel && <InputGroup.Addon >{prefixLabel}</InputGroup.Addon>}
                        </InputGroup>
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                    </FormGroup>
                </div> :

                <div>
                    <FormGroup>
                        {label &&
                            <label className={s.commonLableText}>
                                {label} {labelNumber && <span>{labelNumber}</span>}
                                {showToolTip && this.renderToolTip(infoText, "siteAdminToolTipIcon")}
                            </label>}
                        <div className='normalPosition'>
                            <FormControl
                                {...input}
                                type={showPassword === input.name ? input : type}
                                placeholder={placeholder}
                                className={inputClass}
                                componentClass={componentClass}
                                disabled={disabled}
                                maxLength={maxLength}
                            />
                            {type == 'password' && isPassword &&
                                <span onClick={onClick} className={cx("commonPasswordIcon")}>
                                    {showPassword === input.name ? <img src={ShowPassword} /> : <img src={HidePassword} />}
                                </span>
                            }
                        </div>
                        {touched && error && <span className={s.errorMessage}>{formatMessage(error)}</span>}
                        {
                            note && <p className={s.commonNoteText}>{note}</p>
                        }
                        {chars_left != undefined && chars_left != null && chars_left >= 0 ? <span className={s.errorMessage}> {chars_left} {formatMessage(messages.maximumCharcterLeft)}</span> : ''}
                    </FormGroup>
                </div >

        )
    }
}

export default injectIntl(withStyles(s, bt)(InputFieldComponent));
