var CronJob = require("cron").CronJob
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
import { convert } from "../../helpers/currencyConvertion"
import { paypalTransaction } from "./helper/paypalTransaction"
import { failedTransactionHistory } from "./helper/failedTransactionHistory"

const autoPayoutToHost = (app) => {
  new CronJob(
    "0 0 0 * * *",
    async function () {
      // Run every day on 12.00 AM

      console.log("/********************************************/")
      console.log("HOLY MOLY AUTO PAYOUT TO HOST CRON STARTED")

      try {
        let transactionId = [],
          where = {},
          offset = 0,
          limit = 100,
          totalPages = 1
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

        const getReservationCount = await Reservation.count({
          where,
        })

        if (getReservationCount && getReservationCount > 0) {
          totalPages = Math.floor((getReservationCount - 1) / limit) + 1

          for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
            offset = (currentPage - 1) * limit

            const getReservation = await Reservation.findAll({
              limit: 100,
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
              where: { isBaseCurrency: true },
            })

            if (data) {
              data.map((item) => {
                ratesData[item.dataValues.currencyCode] = item.dataValues.rate
              })
            }

            if (getReservation && getReservation.length > 0) {
              await Promise.all(
                getReservation.map(async (item, index) => {
                  await AllowedLimit()
                  let status = 200,
                    errorMessage,
                    amount,
                    payoutId,
                    convertAmount,
                    checkFailedTransaction
                  const checkUserStatus = await User.findOne({
                    attributes: ["id", "email"],
                    where: {
                      id: item.hostId,
                      userBanStatus: false,
                      userDeletedAt: null,
                    },
                    raw: true,
                  })

                  const getPayout = await Payout.findOne({
                    attributes: ["id", "methodId", "payEmail"],
                    where: {
                      userId: item.hostId,
                      default: true,
                    },
                    raw: true,
                  })
                  payoutId = getPayout && getPayout.id

                  if (item.reservationState === "completed") {
                    let payoutAmount = item.total - item.hostServiceFee
                    convertAmount = convert(
                      base.symbol,
                      ratesData,
                      payoutAmount,
                      item.currency,
                      base.symbol
                    )
                  } else if (item.reservationState === "cancelled") {
                    let refundAmount = await CancellationDetails.findOne({
                      attributes: ["payoutToHost", "currency"],
                      where: {
                        reservationId: item.id,
                      },
                      raw: true,
                    })
                    convertAmount = convert(
                      base.symbol,
                      ratesData,
                      Number(refundAmount.payoutToHost),
                      refundAmount.currency,
                      base.symbol
                    )
                    if (refundAmount.payoutToHost <= 0) {
                      //Not adding this reservation to auto payout process, if the payout amount is either equal or less than 0
                      await Reservation.update(
                        { paymentAttempt: 3 },
                        { where: { id: item.id } }
                      )
                      return ""
                    }
                  }

                  amount = convertAmount.toFixed(2)

                  if (
                    getPayout &&
                    getPayout.payEmail &&
                    checkUserStatus != null &&
                    item.paymentAttempt < 3 &&
                    amount > 0
                  ) {
                    if (getPayout.methodId === 1) {
                      await paypalTransaction(
                        item.id,
                        item.hostId,
                        amount,
                        base.symbol,
                        getPayout.payEmail,
                        item.paymentAttempt,
                        payoutId
                      ).then((res) => {
                        status = res.status
                        errorMessage = res.errorMessage
                      })
                    } else if (getPayout.methodId === 3) {
                      //    Razorpay
                    }

                    if (status == 400) {
                      await failedTransactionHistory({
                        reservationId: item.id,
                        userId: item.hostId,
                        amount,
                        currency: base.symbol,
                        reason: JSON.stringify(errorMessage),
                        paymentMethodId: getPayout.methodId,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                      })
                    }
                  }
                })
              )
            }
          }
        }
        console.log("HOLY MOLY AUTO PAYOUT TO HOST CRON COMPLETED")
        console.log("/********************************************/")
      } catch (error) {
        console.log(error)
      }
    },
    null,
    true,
    "America/Los_Angeles"
  )
}

export default autoPayoutToHost
