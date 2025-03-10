import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CurrencyConverter from '../../CurrencyConverter';
import Link from '../../Link';
import ModalForm from '../ReservationManagement/ModalForm';
import HostServiceFee from './HostServiceFee';
import { decode } from '../../../helpers/queryEncryption';
import messages from '../../../locale/messages';
import bt from '../../../components/commonStyle.css';
import s from './ViewReservation.css';
class ViewReservation extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            id: PropTypes.number.isRequired,
            listId: PropTypes.number.isRequired,
            hostId: PropTypes.string.isRequired,
            guestId: PropTypes.string.isRequired,
            checkIn: PropTypes.string.isRequired,
            checkOut: PropTypes.string.isRequired,
            guestServiceFee: PropTypes.number.isRequired,
            hostServiceFee: PropTypes.number.isRequired,
            taxPrice: PropTypes.number.isRequired,
            total: PropTypes.number.isRequired,
            currency: PropTypes.string.isRequired,
            reservationState: PropTypes.string.isRequired,
            listData: PropTypes.shape({
                title: PropTypes.string.isRequired
            }),
            hostData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            hostPayout: PropTypes.shape({
                id: PropTypes.number.isRequired,
                payEmail: PropTypes.string.isRequired
            }),
            hostTransaction: PropTypes.shape({
                id: PropTypes.number.isRequired,
            }),
            guestData: PropTypes.shape({
                profileId: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired
            }),
            refundStatus: PropTypes.shape({
                id: PropTypes.number.isRequired,
                receiverEmail: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired
            }),
            cancellationDetails: PropTypes.shape({
                refundToGuest: PropTypes.number.isRequired,
                payoutToHost: PropTypes.number.isRequired,
                total: PropTypes.number.isRequired,
                currency: PropTypes.string.isRequired,
                guestServiceFee: PropTypes.number.isRequired,
                hostServiceFee: PropTypes.number.isRequired,
                cancellationPolicy: PropTypes.string,
                cancelledBy: PropTypes.string,
                isTaxRefunded: PropTypes.bool.isRequired,
            }),
        }),
        viewReceiptAdmin: PropTypes.any.isRequired,
    };
    static defaultProps = {
        data: []
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        const { completed, loading } = nextProps;
        const { refetch } = this.props;
        if (completed && !loading) {
            refetch();
        }
    }
    render() {
        const { type, data, data: { cancellationDetails } } = this.props;
        let subTotal, taxAmount = 0, amountPayToHost = 0, guestFee = 0, hostFee = 0;
        let guestName, hostName, reservationStatus, bookingType, url, titleMessageKey, taxStatus, convertCurrency;
        
        if (cancellationDetails) {
            amountPayToHost = cancellationDetails?.payoutToHost;
            guestFee = cancellationDetails?.guestServiceFee;
            hostFee = cancellationDetails?.hostServiceFee;
            convertCurrency = cancellationDetails?.currency;
        } else if (data) {
            amountPayToHost = Number(data?.total) - Number(data?.hostServiceFee);
            guestFee = data?.guestServiceFee;
            hostFee = data?.hostServiceFee;
            convertCurrency = data?.currency;
        }
        if (data && (data?.reservationState == 'expired' || data?.reservationState == 'declined')) {
            guestFee = 0;
            hostFee = 0;
        }
        if (data?.guestData) guestName = data?.guestData?.firstName + " " + data?.guestData?.lastName;
        if (data?.hostData) hostName = data?.hostData?.firstName + " " + data?.hostData?.lastName;
        if (data?.reservationState) reservationStatus = data?.reservationState?.charAt(0).toUpperCase() + data?.reservationState?.slice(1);
        if (data?.bookingType) bookingType = data?.bookingType?.charAt(0).toUpperCase() + data?.bookingType?.slice(1);
        if (data) subTotal = data?.total + data?.guestServiceFee;
        taxAmount = data?.taxPrice;
        url = type === 'reservation' ? '/siteadmin/reservations' : '/siteadmin/payout';
        titleMessageKey = type === 'reservation' ? 'reservationDetails' : 'payoutDetails';

        if (taxAmount > 0 && data?.hostTransaction?.id !== undefined && (cancellationDetails?.isTaxRefunded === false || data?.reservationState === 'completed')) {
            taxStatus = <FormattedMessage {...messages.taxPaidOutToHost} />
        } else if (taxAmount > 0 && data?.refundStatus?.id !== undefined && cancellationDetails?.isTaxRefunded === true) {
            taxStatus = <FormattedMessage {...messages.taxRefundToGuest} />
        }

        return (
            <div className={cx(s.pagecontentWrapper, 'pagecontentAR')}>
                <ModalForm />
                <>
                    <h1 className={s.headerTitle}><FormattedMessage {...messages[titleMessageKey]} /></h1>
                    <div className={cx(s.space4, bt.textAlignRight, 'textAlignLeftRtl')}>
                        <Link to={url} className={cx(bt.btnPrimaryBorder, bt.btnLarge, bt.noTextDecoration, 'bgBlack')}>
                            <FormattedMessage {...messages.goBack} />
                        </Link>
                    </div>
                    <div className={s.profileViewMain}>
                        {
                            data?.id && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.reservationId} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data?.id}  </span>
                            </div>
                        }
                        {
                            data?.confirmationCode && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.confirmationCode} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data?.confirmationCode}  </span>
                            </div>
                        }
                        {
                            reservationStatus && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.reservationStatus} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {reservationStatus}  </span>
                            </div>
                        }
                        {
                            data?.cancellationDetails && data?.cancellationDetails.cancellationPolicy && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancellationPolicy} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {data?.cancellationDetails?.cancellationPolicy}  </span>
                            </div>
                        }
                        {
                            data?.cancellationDetails && data?.cancellationDetails.cancelledBy && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancelledLabel} />   </span>
                                <span className={cx(s.profileViewMainContent, s.capitalize)}> {data?.cancellationDetails?.cancelledBy}  </span>
                            </div>
                        }
                        {
                            data?.listData && data?.listData.id && data?.listData?.title && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.titleLabel} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/rooms/" + data?.listData?.id} target="_blank"> {data?.listTitle ? data.listTitle : data.listData.title}  </a>  </span>
                            </div>
                        }
                        {
                            data?.checkIn && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkIn} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {moment(data?.checkIn).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            data?.checkOut && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.checkOut} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data?.checkOut).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            bookingType && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.bookingType} />  </span>
                                <span className={cx(s.profileViewMainContent)}>  {bookingType}  </span>
                            </div>
                        }
                        {
                            data && (subTotal == 0 || subTotal > 0) && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.amountPaid} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={subTotal} from={data.currency} />  </span>
                            </div>
                        }
                        <div className={s.profileViewInner}>
                            <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestServiceFee} />   </span>
                            <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={guestFee} from={convertCurrency} />  </span>
                        </div>
                        {
                            data && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostServiceFeeType} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <HostServiceFee
                                    hostId={data.hostId}
                                    checkIn={data.checkIn}
                                    id={data.id}
                                    hostPayout={data.hostPayout}
                                    amount={data.total}
                                    currency={convertCurrency}
                                    hostTransaction={data.hostTransaction}
                                    reservationState={data.reservationState}
                                    cancelData={data.cancellationDetails}
                                    hostServiceFee={hostFee}
                                /> </span>
                            </div>
                        }
                        {
                            data && (taxAmount == 0 || taxAmount > 0) && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.tax} />   </span>
                                <span className={cx(s.profileViewMainContent)}>
                                    <CurrencyConverter amount={taxAmount} from={data.currency} />
                                    {taxStatus ? <span>{' '}({taxStatus})</span> : ''}
                                </span>
                            </div>
                        }
                        {
                            data?.guestData && data?.guestData?.profileId && guestName && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestName} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/users/show/" + data?.guestData?.profileId} target="_blank"> {guestName}   </a>  </span>
                            </div>
                        }
                        {
                            data?.guestData && data?.guestData?.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.guestPhoneNumber} />    </span>
                                <span className={cx(s.profileViewMainContent)}> {decode(data?.guestData?.phoneNumber)}  </span>
                            </div>
                        }
                        {
                            data?.guestUser && data?.guestUser?.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.guestEmail} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {data?.guestUser?.email}  </span>
                            </div>
                        }
                        {
                            data?.hostData && data?.hostData?.profileId && hostName && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostName} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <a href={"/users/show/" + data?.hostData?.profileId} target="_blank"> {hostName}   </a> </span>
                            </div>
                        }
                        {
                            data?.hostData && data.hostData?.phoneNumber && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}> <FormattedMessage {...messages.hostPhoneNumber} />   </span>
                                <span className={cx(s.profileViewMainContent)}> {decode(data?.hostData?.phoneNumber)} </span>
                            </div>
                        }
                        {
                            data?.hostUser && data?.hostUser?.email && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.hostEmail} /> </span>
                                <span className={cx(s.profileViewMainContent)}> {data?.hostUser?.email} </span>
                            </div>
                        }
                        {
                            data?.cancellationDetails && data?.cancellationDetails?.createdAt && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.cancelDate} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  {moment(data?.cancellationDetails?.createdAt).format("Do MMMM YYYY")}  </span>
                            </div>
                        }
                        {
                            data && cancellationDetails && (cancellationDetails.refundToGuest == 0 || cancellationDetails.refundToGuest > 0) && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.refundAmount} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={cancellationDetails?.refundToGuest}
                                    from={convertCurrency} />  </span>
                            </div>
                        }
                        {
                            data && !cancellationDetails && (data?.reservationState == 'expired' || data?.reservationState == 'declined') && <div className={s.profileViewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.refundAmount} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={subTotal}
                                    from={data.currency} />  </span>
                            </div>
                        }
                        {
                            data && (data?.reservationState == 'approved' || data?.reservationState == 'completed' || data?.reservationState == 'cancelled') && <div className={s.lastviewInner}>
                                <span className={cx(s.labelTextNew, s.profileViewlabel)}>  <FormattedMessage {...messages.payoutLabel} />   </span>
                                <span className={cx(s.profileViewMainContent)}>  <CurrencyConverter amount={amountPayToHost > 0 ? amountPayToHost : 0}
                                    from={convertCurrency} />
                                </span>
                            </div>
                        }
                    </div>
                </>
            </div>
        );
    }
}

const mapState = (state) => ({
    completed: state.reservation.completed,
    loading: state.reservation.loading,
});

const mapDispatch = {};

export default injectIntl(withStyles(s, bt)(connect(mapState, mapDispatch)(ViewReservation)));