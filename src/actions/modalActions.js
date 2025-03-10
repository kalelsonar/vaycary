import {
  OPEN_LONGIN_MODAL,
  CLOSE_LONGIN_MODAL,
  OPEN_SIGNUP_MODAL,
  CLOSE_SIGNUP_MODAL,
  OPEN_FORGOT_PASSWORD_MODAL,
  CLOSE_FORGOT_PASSWORD_MODAL,
  OPEN_REPORT_USER_MODAL,
  CLOSE_REPORT_USER_MODAL,
  OPEN_THANK_YOU_MODAL,
  CLOSE_THANK_YOU_MODAL,
  OPEN_SOCIAL_SHARE_MODAL,
  CLOSE_SOCIAL_SHARE_MODAL,
  OPEN_HEADER_MODAL,
  CLOSE_HEADER_MODAL,
  OPEN_MORE_FILTERS_MODAL,
  CLOSE_MORE_FILTERS_MODAL,
  ADMIN_COMMENT_MODAL_SHOW,
  ADMIN_COMMENT_MODAL_HIDE,
  ADMIN_HISTORY_MODAL_SHOW,
  ADMIN_HISTORY_MODAL_HIDE,
  OPEN_PAYMENT_MODAL,
  CLOSE_PAYMENT_MODAL,
  OPEN_FILTER_MODAL,
  CLOSE_FILTER_MODAL,
  OPEN_TRANSACTION_MODAL,
  CLOSE_TRANSACTION_MODAL,
  OPEN_TOTAL_PRICE_MODAL,
  CLOSE_TOTAL_PRICE_MODAL
} from '../constants';
import { toggleClose } from './Menu/toggleControl';
import { initialize, change } from 'redux-form';
import { calculateTotalPrice } from '../helpers/calculateTotalPrice';

export function openLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LONGIN_MODAL,
      isLoginModalOpen: true,
      isSignupModalOpen: false,
      isForgotPasswordOpen: false
    });
    dispatch(toggleClose());
  };

}

export function closeLoginModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LONGIN_MODAL,
      isLoginModalOpen: false
    });
    dispatch(toggleClose());
  };

}


export function openSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SIGNUP_MODAL,
      isSignupModalOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeSignupModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SIGNUP_MODAL,
      isSignupModalOpen: false
    });
  };

}

export function openForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: true,
      isLoginModalOpen: false
    });
  };

}

export function closeForgotPasswordModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FORGOT_PASSWORD_MODAL,
      isForgotPasswordOpen: false
    });
  };

}

export function openReportUserModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_REPORT_USER_MODAL,
      payload: {
        isReportUserModalOpen: true,
      }
    });
  };

}

export function closeReportUserModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_REPORT_USER_MODAL,
      payload: {
        isReportUserModalOpen: false
      }
    });
  };

}

export function openThankYouModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_THANK_YOU_MODAL,
      payload: {
        isThankYouModalOpen: true,
        isReportUserModalOpen: false
      }
    });
  };

}

export function closeThankYouModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_THANK_YOU_MODAL,
      payload: {
        isThankYouModalOpen: false,
      }
    });
  };

}

export function openSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: true,
      }
    });
  };

}

export function closeSocialShareModal() {

  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_SOCIAL_SHARE_MODAL,
      payload: {
        isSocialShareModal: false,
      }
    });
  };
}

export function openHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: true
      }
    });
  };
}

export function closeHeaderModal(modalType) {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_HEADER_MODAL,
      payload: {
        modalType,
        actionValue: false
      }
    });
  };
}

export function openMoreFiltersModal() {

  return (dispatch, getState) => {
    dispatch({
      type: OPEN_MORE_FILTERS_MODAL,
      payload: {
        isMoreFiltersModal: true,
      },
    });
  }
}

export function closeMoreFiltersModal() {

  return async (dispatch, getState) => {
    dispatch({
      type: CLOSE_MORE_FILTERS_MODAL,
      payload: {
        isMoreFiltersModal: false,
      }
    });
  };

}

export function openTotalPriceModal(listingData, listBlockedDates, serviceFees, base, rates) {
  const calculatedValues = calculateTotalPrice({ listingData, listBlockedDates, serviceFees, base, rates });
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_TOTAL_PRICE_MODAL,
      payload: {
        isTotalPriceModal: true,
        calculatedValues: calculatedValues,
      },
    });
  };
}

export function closeTotalPriceModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_TOTAL_PRICE_MODAL,
      payload: {
        isTotalPriceModal: false,
      }
    });
  };
}

export function openCommentModal(listId) {

  return (dispatch, getState) => {

    dispatch({
      type: ADMIN_COMMENT_MODAL_SHOW,
      payload: {
        commentModal: true,
        listId: listId
      }
    });
  };

}

export function closeCommentModal() {

  return (dispatch, getState) => {
    dispatch({
      type: ADMIN_COMMENT_MODAL_HIDE,
      payload: {
        commentModal: false,
      }
    });
    dispatch(initialize('CommentForm', ''));
  };

}

export function openHistoryModal(listingHistory) {

  return (dispatch, getState) => {

    dispatch({
      type: ADMIN_HISTORY_MODAL_SHOW,
      payload: {
        historyModal: true,
        listingHistory
      }
    });
  };

}

export function closeHistoryModal() {

  return (dispatch, getState) => {
    dispatch({
      type: ADMIN_HISTORY_MODAL_HIDE,
      payload: {
        historyModal: false,
      }
    });
  };

}

export function openPaymentModal() {

  return (dispatch, getState) => {

    dispatch({
      type: OPEN_PAYMENT_MODAL,
      payload: {
        paymentModal: true,
      }
    });
  };

}

export function closePaymentModal() {

  return (dispatch, getState) => {

    dispatch({
      type: CLOSE_PAYMENT_MODAL,
      payload: {
        paymentModal: false,
      }
    });
  }

};

export function applyPaymentModal({ checkIn, checkOut, guests, curentFormValues }) {

  return async (dispatch, getState) => {

    await Promise.all([
      dispatch(change('PaymentForm', 'guests', guests)),
      dispatch(change('PaymentForm', 'checkIn', checkIn)),
      dispatch(change('PaymentForm', 'checkOut', checkOut)),
      dispatch(change('PaymentForm', 'discount', curentFormValues.discount)),
      dispatch(change('PaymentForm', 'discountType', curentFormValues.discountType)),
      dispatch(change('PaymentForm', 'guestServiceFee', curentFormValues.guestServiceFee)),
      dispatch(change('PaymentForm', 'hostServiceFee', curentFormValues.hostServiceFee)),
      dispatch(change('PaymentForm', 'total', curentFormValues.total)),
      dispatch(change('PaymentForm', 'totalValue', curentFormValues.totalValue)),
      dispatch(change('PaymentForm', 'priceForDays', curentFormValues.priceForDays)),
      dispatch(change('PaymentForm', 'isSpecialPriceAssigned', curentFormValues.isSpecialPriceAssigned)),
      dispatch(change('PaymentForm', 'bookingSpecialPricing', curentFormValues.bookingSpecialPricing)),
      dispatch(change('PaymentForm', 'isSpecialPriceAverage', curentFormValues.isSpecialPriceAverage)),
      dispatch(change('PaymentForm', 'dayDifference', curentFormValues.dayDifference)),
      dispatch(change('PaymentForm', 'hostServiceFeeType', curentFormValues.hostServiceFeeType)),
      dispatch(change('PaymentForm', 'hostServiceFeeValue', curentFormValues.hostServiceFeeValue)),
      dispatch(change('PaymentForm', 'taxPrice', curentFormValues.taxPrice)),
      dispatch(change('BookingForm', 'guests', guests)),
      dispatch(change('BookingForm', 'checkIn', checkIn)),
      dispatch(change('BookingForm', 'checkOut', checkOut)),
      dispatch(change('BookingForm', 'startDate', checkIn)),
      dispatch(change('BookingForm', 'endDate', checkOut))
    ])

    await dispatch({
      type: CLOSE_PAYMENT_MODAL,
      payload: {
        paymentModal: false,
      }
    });
  };

}

export function openFilterModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_FILTER_MODAL,
      payload: {
        filterModal: true,
      }
    });
  };
}

export function closeFilterModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_FILTER_MODAL,
      payload: {
        filterModal: false,
      }
    });
  };
}

export function openTransactionModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_TRANSACTION_MODAL,
      payload: {
        transactionModal: true,
      }
    });
  };
}

export function closeTransactionModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_TRANSACTION_MODAL,
      payload: {
        transactionModal: false,
      }
    });
  };
}
