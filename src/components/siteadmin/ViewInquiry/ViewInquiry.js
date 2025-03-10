import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { FormattedMessage, injectIntl } from 'react-intl';

import Link from '../../Link/Link';

import messages from '../../../locale/messages';
import showToaster from '../../../helpers/showToaster';

import s from './ViewInquiry.css';
import bt from '../../../components/commonStyle.css';

class ViewInquiry extends Component {

    takeAction = async (threadItemId, threadId) => {
        const { refetch } = this.props;
        let query = `query checkThreadData($threadId:Int){
            checkThreadData(threadId:$threadId){
                status
            }
        }`;

        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables: { threadId },
            }),
            credentials: 'include',
        });

        const { data } = await resp.json();
        if (data?.checkThreadData?.status == '200') {
            return true
        } else {
            showToaster({ messageId: 'approved', toasterType: 'error' })
            let variables = {
                id: threadItemId
            };
            await refetch(variables)
            return false
        }
    }

    render() {
        const { data } = this.props;
        let userType = 'host';
        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <div>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages.inquiryDetails} /></h1>
                    <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                        <Link to={'/siteadmin/inquiry'} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={s.profileViewMain}>
                        {
                            data?.id && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.bookingStatus} />   </span>
                                <span className={cx(s.profileViewMainContent)}>
                                    {
                                        data?.data == "preApproved" ? < FormattedMessage {...messages.messageStatus2} /> : <FormattedMessage {...messages.panelInquiry} />
                                    }
                                </span>
                            </div>
                        }
                        {
                            data?.threadsData?.listData?.title && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.adminListTitle} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/rooms/" + data.threadsData.listId} target="_blank"> {data.threadsData.listData.title} </a> </span>
                            </div>
                        }
                        {
                            data?.startDate && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkIn} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data?.startDate).format('DD MMMM YYYY')}  </span>
                            </div>
                        }
                        {
                            data?.endDate && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkOut} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data?.endDate).format('DD MMMM YYYY')}  </span>
                            </div>
                        }
                        {
                            data?.threadsData?.guestProfile?.displayName && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestName} />   </span>
                                <span className={cx(s.profileViewMainContent)}> <a href={"/users/show/" + data.threadsData.guestProfile.profileId} target="_blank"> {data.threadsData.guestProfile.displayName} </a>  </span>
                            </div>
                        }
                        {
                            data?.threadsData?.guestProfile?.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestPhoneNumber} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data?.threadsData?.guestProfile?.countryCode}{' '}{data.threadsData.guestProfile.phoneNumber}  </span>
                            </div>
                        }
                        {
                            data?.threadsData?.guestUserData?.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestEmail} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data.threadsData.guestUserData.email}  </span>
                            </div>
                        }
                        {
                            data?.threadsData?.hostProfile?.displayName && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostNameLabel} />   </span>
                                <span className={cx(s.profileViewMainContent)}> <a href={"/users/show/" + data.threadsData.hostProfile.profileId} target="_blank"> {data.threadsData.hostProfile.displayName}  </a> </span>
                            </div>
                        }
                        {
                            data?.threadsData?.hostProfile?.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostPhoneNumber} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data?.threadsData?.hostProfile?.countryCode}{' '}{data.threadsData.hostProfile.phoneNumber}  </span>
                            </div>
                        }
                        {
                            data?.threadsData?.hostUserData?.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostEmail} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data.threadsData.hostUserData.email}  </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }

}
const mapState = (state) => ({
});
const mapDispatch = {
};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ViewInquiry)));