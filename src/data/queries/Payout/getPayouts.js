import { GraphQLList as List, GraphQLString as StringType } from "graphql"
import PayoutType from "../../types/PayoutType"
import { Payout, PaymentMethods } from "../../models"
import { payment } from "../../../config"
import showErrorMessage from "../../../helpers/showErrorMessage"

const getPayouts = {
  type: new List(PayoutType),

  args: {
    currentAccountId: {
      type: StringType,
    },
    userId: {
      type: StringType,
    },
  },

  async resolve({ request }, { currentAccountId, userId }) {
    if (request.user && !request.user.admin) {
      const userId = request.user.id
      const payEmail = currentAccountId
      let isVerified = true,
        accountInfo = null,
        defaultValue = false,
        methodArray = []

      const getPaymentMethods = await PaymentMethods.findAll({
        attributes: ["id"],
        where: {
          isEnable: 1,
        },
        raw: true,
      })
      getPaymentMethods.map((item) => {
        methodArray.push(item.id)
      })
      return await Payout.findAll({
        where: {
          userId,
          methodId: {
            $in: methodArray,
          },
        },
      })
    } else {
      return {
        status: "notLoggedIn",
      }
    }
  },
}

export default getPayouts

/**

query getPayouts($currentAccountId: String) {
  getPayouts(currentAccountId: $currentAccountId) {
    id
    methodId
    paymentMethod{
      id
      name
    }
    userId
    payEmail
    address1
    address2
    city
    state
    country
    zipcode
    currency
    default
    createdAt
    status
    last4Digits
    isVerified
  }
}

**/
