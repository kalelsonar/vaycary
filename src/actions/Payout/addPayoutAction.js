import { gql } from "react-apollo"
import { destroy } from "redux-form"
import history from "../../core/history"
import {
  ADD_PAYOUT_START,
  ADD_PAYOUT_SUCCESS,
  ADD_PAYOUT_ERROR,
} from "../../constants"
import { getPayouts } from "../../actions/Payout/getPayouts"
import showToaster from "../../helpers/showToaster"
import { addRazorpayBankPayout } from "../../core/payment/razorpay/processRazorpayPayment"

export function addPayout(
  methodId,
  payEmail,
  address1,
  address2,
  city,
  state,
  country,
  zipcode,
  currency,
  firstname,
  lastname,
  accountNumber,
  routingNumber,
  ssn4Digits,
  businessType,
  userId,
  accountToken,
  personToken,
  ifsc
) {
  return async (dispatch, getState, { client }) => {
    dispatch({
      type: ADD_PAYOUT_START,
      payload: {
        payoutLoading: true,
      },
    })

    try {
      let mutation = gql`
        mutation addPayout(
          $methodId: Int!
          $payEmail: String!
          $address1: String
          $address2: String
          $city: String!
          $state: String!
          $country: String!
          $zipcode: String!
          $currency: String!
          $last4Digits: Int
          $isVerified: Boolean
        ) {
          addPayout(
            methodId: $methodId
            payEmail: $payEmail
            address1: $address1
            address2: $address2
            city: $city
            state: $state
            country: $country
            zipcode: $zipcode
            currency: $currency
            last4Digits: $last4Digits
            isVerified: $isVerified
          ) {
            id
            methodId
            userId
            payEmail
            last4Digits
            address1
            address2
            city
            state
            country
            zipcode
            currency
            createdAt
            status
          }
        }
      `
      if (methodId == 1) {
        // PayPal
        const { data } = await client.mutate({
          mutation,
          variables: {
            methodId,
            payEmail,
            address1,
            address2,
            city,
            state,
            country,
            zipcode,
            currency,
            isVerified: true,
          },
        })

        await dispatch(getPayouts())

        if (data && data.addPayout) {
          history.push("/user/payout")
          await dispatch(destroy("PayoutForm"))
          dispatch({
            type: ADD_PAYOUT_SUCCESS,
            payload: {
              status: data.addPayout.status,
              payoutLoading: false,
            },
          })
        }
      } else {
        // Razorpay
        const userDetails = {
          email: payEmail,
          name: firstname + (lastname ? ` ${lastname}` : ""),
          userId,
        }
        const bankDetails = {
          accountNumber,
          ifsc,
        }

        const { status, errorMessage, accountId } = await addRazorpayBankPayout(
          userDetails,
          bankDetails
        )
        // if (status === 200 && accountId) {
        //   const isAccountExist = await Payout.findOne({
        //     where: {
        //       accountId,
        //       userId,
        //     },
        //     attributes: ["id"],
        //   })
        //   console.log(isAccountExist)
        //   if (!isAccountExist) {
        //     await Payout.create({
        //       methodId: 3,
        //       userId,
        //       payEmail: accountId,
        //       address1: address1,
        //       address2: address2,
        //       city: city,
        //       state: state,
        //       country: country,
        //       zipcode: zipcode,
        //       currency: currency,
        //       default: false,
        //       last4Digits: accountNumber.slice(-4),
        //       isVerified: true,
        //     })
        //     console.log("created")
        //   }

        //   const isDefaultExist = await Payout.count({
        //     where: {
        //       default: true,
        //       userId,
        //     },
        //   })
        //   console.log({ isDefaultExist })

        //   if (isDefaultExist <= 0 && isVerified) {
        //     await Payout.update(
        //       {
        //         default: true,
        //       },
        //       {
        //         where: {
        //           payEmail: accountId,
        //           userId: userId,
        //         },
        //       }
        //     )
        //   }
        // }
        if (status === 200 && accountId) {
          const { data } = await client.mutate({
            mutation,
            variables: {
              methodId,
              payEmail: accountId,
              address1,
              address2,
              city,
              state,
              country,
              zipcode,
              currency,
              isVerified: true,
              last4Digits: accountNumber.slice(-4),
            },
          })
          if (data && data.addPayout) {
            history.push("/user/payout")
            await dispatch(destroy("PayoutForm"))
            dispatch({
              type: ADD_PAYOUT_SUCCESS,
              payload: {
                status: data.addPayout.status,
                payoutLoading: false,
              },
            })
          } else {
            showToaster({
              messageId: "commonError",
              toasterType: "error",
              requestContent: errorMessage,
            })
            dispatch({
              type: ADD_PAYOUT_ERROR,
              payload: {
                errorMessage,
                payoutLoading: false,
              },
            })
          }
        } else {
          showToaster({
            messageId: "commonError",
            toasterType: "error",
            requestContent: errorMessage,
          })
          dispatch({
            type: ADD_PAYOUT_ERROR,
            payload: {
              errorMessage,
              payoutLoading: false,
            },
          })
        }
      }
    } catch (error) {
      dispatch({
        type: ADD_PAYOUT_ERROR,
        payload: {
          error,
          payoutLoading: false,
        },
      })
      return false
    }

    return true
  }
}

export function startPayoutLoading() {
  return async (dispatch, getState, { client }) => {
    await dispatch({
      type: ADD_PAYOUT_START,
      payload: {
        payoutLoading: true,
      },
    })
  }
}

export function stopPayoutLoading() {
  return async (dispatch, getState, { client }) => {
    await dispatch({
      type: ADD_PAYOUT_SUCCESS,
      payload: {
        payoutLoading: false,
      },
    })
  }
}
