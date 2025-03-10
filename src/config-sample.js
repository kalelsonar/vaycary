require("dotenv").config()

/* eslint-disable max-len */

export const port = process.env.PORT || 3000
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`
export const url = process.env.WEBSITE_URL || "http://localhost:3001"
export const socketUrl = "http://localhost:4001"
export const socketPort = process.env.SOCKET_PORT || 4001

export const sitename = "RentALL"

export const locales = ["en-US", "es", "it-IT", "fr-FR", "pt-PT", "ar", "he"] // default locale is the first one

export const databaseUrl = process.env.DATABASE_URL

export const coinbase = process.env.COINBASE_URL
export const coinbaseCurrencyUrl = process.env.COINBASE_CURRENCY_URL

export const fileuploadDir = process.env.FILEUPLOAD_DIR // Listing Photos Upload Directory

export const logouploadDir = process.env.LOGOUPLOAD_DIR // Logo upload directory

export const ogImageuploadDir = process.env.OGIMAGEUPLOAD_DIR // OG Image Upload directory

export const banneruploadDir = process.env.BANNER_UPLOAD_DIR // Home page Banner upload directory

export const profilePhotouploadDir = process.env.PROFILE_PHOTO_UPLOAD_DIR // User Profile Photos Upload Directory

export const documentuploadDir = process.env.DOCUMENT_UPLOAD_DIR // Document Upload

export const locationuploadDir = process.env.POPULAR_UPLOAD_DIR // Location upload directory

export const homebanneruploadDir = process.env.HOME_BANNER_UPLOAD_DIR // Static block image upload directory

export const amenitiesUploadDir = process.env.AMENITIES_UPLOAD_DIR // Amenities upload directory

export const faviconUploadDir = process.env.FAVICON_UPLOAD_DIR // Favicon images update directory

export const whyHostUploadDir = process.env.WHYHOST_UPLOAD_DIR // whyHostUploadDir

export const analytics = {
  // https://analytics.google.com/
  google: { trackingId: "UA-XXXXX-X" },
}

export const googleMapAPI = "<Your API Key>"
export const googleMapServerAPI = process.env.GOOGLE_MAP_SERVER_API

export const googleCaptcha = { sitekey: "<Your Google reCAPCHA Site key>" } // site key for google recaptcha

export const payment = {
  paypal: {
    returnURL: `${url}${process.env.PAYPAL_RETURN_URL}`,
    cancelURL: `${url}${process.env.PAYPAL_CANCEL_URL}`,
    redirectURL: {
      success: `${url}${process.env.PAYPAL_SUCCESS_REDIRECT_URL}`,
      cancel: `${url}${process.env.PAYPAL_CANCEL_URL}`,
    },
    versions: {
      versionOne: "/v1",
      versionTwo: "/v2",
    },
    token_url: "/oauth2/token",
    payment_url: "/checkout/orders",
    capture_url: "/capture",
    payout_url: "/payments/payouts",
    refund: "/refund",
    refund_capture: "/payments/captures/",
  },
}

export const auth = {
  jwt: { secret: process.env.JWT_SECRET },

  redirectURL: {
    login: "/dashboard",
    verification: "/user/verification",
    userbanned: "/userbanned",
    returnURLDeletedUser: "/userbanned",
  },

  facebook: {
    // https://developers.facebook.com/
    returnURL: `${url}/login/facebook/return`,
  },

  google: {
    // https://cloud.google.com/console/project
    returnURL: `${url}/login/google/return`,
  },
}

export const cronTimezone = process.env.CRON_TIMEZONE

export const searchLimit = 24
export const searchPagination = 300
