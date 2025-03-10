import { url, payment } from "../../../config"
import { getConfigurationData } from "../../email/helpers/getUserEmail"

const payPalUrls = async (tokenId) => {
  try {
    const configData = await getConfigurationData({ name: ["paypalHost"] })
    const base = configData?.paypalHost

    const paymentURL = `${base}${payment?.paypal?.versions?.versionTwo}${payment?.paypal?.payment_url}`
    const returnURL = payment?.paypal?.returnURL
    const cancelURL = payment?.paypal?.cancelURL
    const tokenURL = `${base}${payment?.paypal?.versions?.versionOne}${payment?.paypal?.token_url}`
    const captureURL = `${base}${payment?.paypal?.versions?.versionTwo}${payment?.paypal?.payment_url}/${tokenId}${payment?.paypal?.capture_url}`

    return {
      paymentURL,
      returnURL,
      cancelURL,
      tokenURL,
      captureURL,
    }
  } catch (error) {
    return false
  }
}

const razorpayUrls = () => {
  try {
    const base = "https://api.razorpay.com/v1"
    return {
      paymentURL: `${base}${payment?.razorpay?.payment_url}`,
      // failure_url,
      // success_url
    }
  } catch (error) {
    return false
  }
}

export { payPalUrls, razorpayUrls }
