import { GraphQLInt as IntType } from "graphql"
const AllowedLimit = require("async-sema").RateLimit(10)
import {
  Reservation,
  Payout,
  TransactionHistory,
  CancellationDetails,
  FailedTransactionHistory,
  User,
  Currencies,
  CurrencyRates,
} from "../../data/models"
import ReservationType from "../types/ReservationType"
import { convert } from "../../helpers/currencyConvertion"
import { paypalTransaction } from "../../core/cron/helper/paypalTransaction"
import showErrorMessage from "../../helpers/showErrorMessage"

const payoutToHost = {
  type: ReservationType,
  args: {
    reservationId: { type: IntType },
    confirmationCode: { type: IntType },
  },
  async resolve({ request }, { reservationId, confirmationCode }) {
    let transactionId = [],
      status = 200,
      offset = 0,
      errorMessage = null

    if (!request?.user?.admin) {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: "adminLogin" }),
      }
    }

    try {
      let where = {}

      const getTransaction = await TransactionHistory.findAll({
        attributes: ["reservationId"],
        raw: true,
      })

      transactionId = getTransaction.map((item) => {
        return item.reservationId
      })

      transactionId =
        transactionId && transactionId.length > 0 ? transactionId : [0]

      where = {
        $or: [
          {
            reservationState: "completed",
          },
          {
            reservationState: "cancelled",
          },
        ],
        paymentState: "completed",
        isHold: false,
        paymentAttempt: {
          $lt: 3,
        },
        id: {
          $notIn: transactionId,
        },
      }
      if (reservationId && confirmationCode) {
        where = {
          ...where,
          $and: [{ id: reservationId }, { confirmationCode: confirmationCode }],
        }
      }

      const getReservation = await Reservation.findAll({
        limit: 1000,
        offset,
        attributes: [
          "id",
          "hostId",
          "hostServiceFee",
          "total",
          "currency",
          "paymentAttempt",
          "reservationState",
          "isHold",
          "paymentState",
        ],
        where,
        order: [["id", "DESC"]],
        raw: true,
      })

      var ratesData = {}

      const data = await CurrencyRates.findAll()
      const base = await Currencies.findOne({
        where: {
          isBaseCurrency: true,
        },
      })

      if (data) {
        data.map((item) => {
          ratesData[item.dataValues.currencyCode] = item.dataValues.rate
        })
      }

      if (getReservation?.length > 0) {
        await Promise.all(
          getReservation.map(async (item, index) => {
            await AllowedLimit()
            let amount = 0,
              payoutId,
              convertAmount = 0,
              checkFailedTransaction

            let checkUserStatus = await User.findOne({
              attributes: ["id", "email"],
              where: {
                id: item.hostId,
                userBanStatus: false,
                userDeletedAt: null,
              },
              raw: true,
            })

            let getPayout = await Payout.findOne({
              attributes: ["id", "methodId", "payEmail"],
              where: {
                userId: item.hostId,
                default: true,
              },
              raw: true,
            })
            payoutId = getPayout?.id

            if (item?.reservationState === "completed") {
              let payoutAmount = item?.total - item?.hostServiceFee
              convertAmount = convert(
                base?.symbol,
                ratesData,
                payoutAmount,
                item?.currency,
                base?.symbol
              )
            } else if (item?.reservationState === "cancelled") {
              let refundAmount = await CancellationDetails.findOne({
                attributes: ["payoutToHost"],
                where: {
                  reservationId: item?.id,
                },
                raw: true,
              })
              if (refundAmount && refundAmount?.payoutToHost)
                convertAmount = convert(
                  base?.symbol,
                  ratesData,
                  Number(refundAmount?.payoutToHost),
                  item?.currency,
                  base?.symbol
                )
            }

            amount = convertAmount.toFixed(2)

            if (
              getPayout &&
              getPayout.payEmail &&
              checkUserStatus != null &&
              amount > 0
            ) {
              if (getPayout.methodId === 1) {
                await paypalTransaction(
                  item?.id,
                  item?.hostId,
                  amount,
                  base?.symbol,
                  checkUserStatus?.email,
                  item?.paymentAttempt,
                  payoutId
                ).then((res) => {
                  console.log("res=>", res)
                  status = res.status
                  errorMessage = res.errorMessage
                })
              } else if (getPayout.methodId === 3) {
                //    Razorpay
              }
              if (status == 400) {
                checkFailedTransaction = await FailedTransactionHistory.findOne(
                  {
                    where: {
                      reservationId: item.id,
                    },
                    raw: true,
                  }
                )
                if (checkFailedTransaction === null) {
                  await FailedTransactionHistory.create({
                    reservationId: item?.id,
                    userId: item?.hostId,
                    amount,
                    currency: item?.currency,
                    reason: JSON.stringify(errorMessage),
                    paymentMethodId: getPayout?.methodId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                  })
                } else {
                  await FailedTransactionHistory.update(
                    {
                      userId: item?.hostId,
                      amount,
                      currency: item?.currency,
                      reason: JSON.stringify(errorMessage),
                      paymentMethodId: getPayout?.methodId,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    },
                    {
                      where: {
                        reservationId: item?.id,
                      },
                    }
                  )
                }
              }
            }
          })
        )
      } else {
        return {
          status: 400,
          errorMessage: showErrorMessage({ errorCode: "noRecord" }),
        }
      }
      return {
        status,
        errorMessage,
      }
    } catch (error) {
      return {
        status: 400,
        errorMessage: showErrorMessage({ errorCode: "catchError", error }),
      }
    }
  },
}

export default payoutToHost
