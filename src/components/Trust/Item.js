import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Image } from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Trust.css';
import bt from '../../components/commonStyle.css';
import Loader from '../Loader';
import mail from '/public/SiteIcons/verifiGoogle.png';
import document from '/public/SiteIcons/docsVerifi.png';
import email from '/public/SiteIcons/emailVerifi.png';
import facebook from '/public/SiteIcons/verifiFacebook.png';
import { FormattedMessage, injectIntl } from 'react-intl';
import { PRIMARYCOLOR } from '../../constants';

// Locale
import messages from '../../locale/messages';

//Images
import icon from '/public/SiteIcons/verifiIconGreen.svg';
import editIcon from '/public/SiteIcons/verifiEditIcon.svg';

class Item extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        handleClick: PropTypes.any,
        isAction: PropTypes.bool,
        buttonLabel: PropTypes.string,
        url: PropTypes.string,
        isLink: PropTypes.bool,
        show: PropTypes.bool,
    };
    render() {
        const { formatMessage } = this.props.intl;
        const { title, content, handleClick, isAction, buttonLabel, url, isLink, show, isImage } = this.props;
        const { isEmailConfirmed, name } = this.props;
        let bgImage;
        if (name == 'email') {
            bgImage = email
        } else if (name == 'facebook') {
            bgImage = facebook
        } else if (name == 'google') {
            bgImage = mail
        } else if (name == 'document') {
            bgImage = document
        }

        return (
            <li className={cx(s.space4, "clearfix", s.background)}>
                <div className={s.displayFlex}>
                    <div className={s.imgBorder}>
                        <Image src={bgImage} className={s.iconImages} />
                    </div>
                    <div >
                        <h4 className={s.verifiTitle}>{title}</h4>
                        <p className={cx(s.description, 'textWhite')}>{content}</p>
                    </div>
                    <div className={s.textCenter}>
                        {
                            isAction && isLink && <div className={cx(s.responsiveFlex, 'textAlignLeftRtl')}>
                                <a className={cx(s.button)} href={url}>
                                    {buttonLabel}
                                    <img src={editIcon} className={cx(s.editIconCss, s.connectCss, 'connectCssRTL')} />
                                </a>
                            </div>
                        }
                        {
                            isAction && !isLink && <div className={cx('responsiveCenterFlex', 'textAlignLeftRtl')} >
                                {/* <Loader
                                    type={"button"}
                                    className={cx(s.button, bt.btnPrimaryBorder, bt.trustBtnLarge)}
                                    
                                    show={show}
                                    label={buttonLabel}
                                    spinnerColor={PRIMARYCOLOR}
                                /> */}
                                 <a className={cx(s.button)} onClick={handleClick}>
                                    {buttonLabel}
                                    <img src={editIcon} className={cx(s.editIconCss, s.connectCss, 'connectCssRTL')} />
                                </a>
                            </div>
                        }
                        {
                            isImage && <div className={'responsiveCenterFlex'}>
                                <div className={cx(s.btnverified, bt.trustBtnLarge)}>
                                    <img src={icon} />
                                    <Loader
                                        type={"button"}
                                        show={show}
                                        label={formatMessage(messages.verifiedLabel)}
                                        disabled
                                        className={cx(s.verifiBtn, 'verifiBtnRTL')}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </li>
        )
    }
}
export default (injectIntl)(withStyles(s)(Item));