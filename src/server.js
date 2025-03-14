import path from "path"
import express from "express"
import compression from "compression"
import cookieParser from "cookie-parser"
import requestLanguage from "express-request-language"
import bodyParser from "body-parser"
import expressJwt from "express-jwt"
import expressGraphQL from "express-graphql"
import jwt from "jsonwebtoken"
import React from "react"
import ReactDOM from "react-dom/server"
import { renderToStringWithData } from "react-apollo"
// import UniversalRouter from 'universal-router';
import PrettyError from "pretty-error"
import { IntlProvider } from "react-intl"
import router from "./router"

import "./serverIntlPolyfill"
import createApolloClient from "./core/createApolloClient"
import App from "./components/App"
import Html from "./components/Html"
import { ErrorPageWithoutStyle } from "./routes/error/ErrorPage"
import errorPageStyle from "./routes/error/ErrorPage.css"
import passport from "./core/passport"
import models from "./data/models"
import schema from "./data/schema"
import routes from "./routes"
import assets from "./assets.json" // eslint-disable-line import/no-unresolved
import configureStore from "./store/configureStore"
import { setRuntimeVariable } from "./actions/runtime"
import { setLocale } from "./actions/intl"
import { loadAccount } from "./actions/account"
import { getAdminUser } from "./actions/siteadmin/AdminUser/manageAdminUser"
import { getListingFields } from "./actions/getListingFields"

import { port, auth, locales } from "./config"

// Social Media Authentication
import facebookAuth from "./core/auth/facebook"
import googleAuth from "./core/auth/google"
import { setSiteSettings } from "./actions/siteSettings"

// Currency Rates Action
import { getCurrencyRates, choseToTheme } from "./actions/getCurrencyRates"
import { getCurrenciesData } from "./actions/getCurrencies"

// Service Fees Action
import { getServiceFees } from "./actions/ServiceFees/getServiceFees"

// File Upload
import fileUpload from "./core/fileUpload"
import documentUpload from "./core/documentUpload"
import logoUpload from "./core/logoUpload"
import locationUpload from "./core/locationUpload"
import profilePhotoUpload from "./core/profilePhotoUpload"
import bannerUpload from "./core/bannerUpload"
import downloadRoute from "./core/download/downloadRoute"
import CSVRoutes from "./core/CSVHelper/CSVRoutes"
import homeBannerUpload from "./core/homeBannerUpload"
import amenitiesUpload from "./core/amenitiesUpload"
import favIconUpload from "./core/favIconUpload"
import ogImageUpload from "./core/ogImageUpload"

// For Emails
import sendEmail from "./core/email/emailSetup"

// Payment Gateway
import paypalRoutes from "./core/payment/paypal"
import payoutRoutes from "./core/payment/payout/payoutRoutes"
import refundRoutes from "./core/payment/refund/refundRoutes"

// CRON Jobs
import cron from "./core/cron/cron"
import reservationExpire from "./core/cron/reservationExpire"
import reservationComplete from "./core/cron/reservationComplete"
import updateListStatus from "./core/cron/updateListStatus"
import autoPayoutToHost from "./core/cron/autoPayoutToHost"

// iCal Routes
import iCalRoutes from "./core/iCal/iCalRoutes"
import iCalCron from "./core/iCal/iCalCron"
import exportICalRoutes from "./core/iCal/exportIcal/exportRoutes"

// Razorpay
import razorpayPayment from "./core/payment/razorpay/razorpayPayment"
import razorpayAddPayout from "./core/payment/razorpay/razorpayAddPayout"
import razorpayRefund from "./core/payment/razorpay/razorpayRefund"
import razorpayPayout from "./core/payment/razorpay/razorpayPayout"

// Twilio SMS
import TwilioSms from "./core/sms/twilio/sendSms"

// Mobile API helper routes
import mobileRoutes from "./core/mobileRoutes"
import uploadListPhotoMobile from "./core/uploadListPhotoMobile"
import deepLinkBundle from "./core/deepLinkBundle"

// Site Map
import sitemapRoutes from "./core/sitemap/sitemapRoutes"

import pushNotificationRoutes from "./core/pushNotifications/pushNotificationRoutes"
import { getHomeData } from "./actions/Home/getHomeData"
import whyHostUpload from "./core/whyHostUpload"
import iCalUpdate from "./core/cron/iCalUpdate"

// import socketRoutes from './socket/socketRoutes';
// import sendSocketNotification from './socket/sendSocketNotification';

const app = express()
app.use(compression())

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
if (typeof global.navigator === 'undefined') {
  global.navigator = global.navigator || { userAgent: 'all' };
}
if (typeof global.navigator.userAgent === 'undefined') {
  global.navigator.userAgent = global.navigator.userAgent || 'all';
}

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, "public")))
app.use("/images", express.static(path.join(__dirname, "../images")))
app.use("/.well-known", express.static(path.join(__dirname, "../well-known")))
app.use(cookieParser())
app.use(
  requestLanguage({
    languages: locales,
    queryName: "lang",
    cookie: {
      name: "lang",
      options: {
        path: "/",
        maxAge: 3650 * 24 * 3600 * 1000, // 10 years in miliseconds
      },
      url: "/lang/{language}",
    },
  })
)

app.use(bodyParser.urlencoded({ extended: true, limit: "100mb" }))
app.use(bodyParser.json({ limit: "100mb" }))

//
// Authentication
// -----------------------------------------------------------------------------
app.use(function (req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  )
  next()
})
app.use(
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: (req) => req.cookies.id_token,
  })
)
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.clearCookie("id_token")
    res.status(401).redirect("/")
  }
})
app.use(passport.initialize())

if (__DEV__) {
  app.enable("trust proxy")
}

// Socket
// socketRoutes(app);

// Authentication
facebookAuth(app)
googleAuth(app)

// File Upload
fileUpload(app)

//doucment upload
documentUpload(app)

// Logo Upload
logoUpload(app)

//ogImage Upload
ogImageUpload(app)

// Location Upload
locationUpload(app)

//Profile Photo Upload
profilePhotoUpload(app)

// Profile Photo upload from social media
downloadRoute(app)

// For Export CSV files
CSVRoutes(app)

// Banner Upload
bannerUpload(app)
homeBannerUpload(app)
whyHostUpload(app)
//Amenities
amenitiesUpload(app)
favIconUpload(app)

// Send Email Function
sendEmail(app)

// Payment Gateway
paypalRoutes(app)
payoutRoutes(app)
refundRoutes(app)

// Cron Job
cron(app)
reservationExpire(app)
reservationComplete(app)
updateListStatus(app)
autoPayoutToHost(app)

// iCal
iCalRoutes(app)
iCalCron(app)
exportICalRoutes(app)

// Razorpay
razorpayPayment(app)
razorpayAddPayout(app)
razorpayRefund(app)
razorpayPayout(app)

// Twilio -SMS
TwilioSms(app)

// Mobile API helper routes
mobileRoutes(app)
uploadListPhotoMobile(app)
deepLinkBundle(app)

// Site Map
sitemapRoutes(app, routes)
pushNotificationRoutes(app)

// iCal post call
iCalUpdate(app)

app.post("/logout", function (req, res) {
  // let userId = req?.user?.id;
  res.clearCookie("id_token")
  res.redirect("/")
  // sendSocketNotification(`updateUserLogout-${userId}`, '')
})

app.post("/admin-logout", function (req, res) {
  // let userId = req?.user?.id;
  res.clearCookie("id_token")
  res.redirect("/siteadmin/login")
  // sendSocketNotification(`adminUserLogout-${userId}`)
})

//
// Register API middleware
// -----------------------------------------------------------------------------
const graphqlMiddleware = expressGraphQL((req, res) => ({
  schema,
  graphiql: __DEV__,
  rootValue: {
    request: req,
    response: res,
  },
  pretty: __DEV__,
}))

app.use("/graphql", graphqlMiddleware)

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get("*", async (req, res, next) => {
  try {
    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    })

    const store = configureStore(
      {
        user: req.user || null,
      },
      {
        cookie: req.headers.cookie,
        apolloClient,
      }
    )

    let baseCurrency = req.cookies.currency
    let theme = req.cookies.theme || "light"

    // Currency Rates
    await store.dispatch(getCurrencyRates(baseCurrency))

    // Get Available Currencies
    await store.dispatch(getCurrenciesData())

    // Start Site Settings
    await store.dispatch(setSiteSettings())

    await store.dispatch(getListingFields())

    // Get Service Fees
    await store.dispatch(getServiceFees())

    await store.dispatch(getHomeData())
    // Admin Login
    if (req.user != null && req.user != undefined && req.user.admin == true) {
      store.dispatch(
        setRuntimeVariable({
          name: "isAdminAuthenticated",
          value: true,
        })
      )

      store.dispatch(getAdminUser())
    }

    // User Login
    if (req.user != null && req.user != undefined && req.user.admin != true) {
      store.dispatch(
        setRuntimeVariable({
          name: "isAuthenticated",
          value: req.user ? true : false,
        })
      )
      await store.dispatch(loadAccount())
    }

    store.dispatch(
      setRuntimeVariable({
        name: "initialNow",
        value: Date.now(),
      })
    )

    store.dispatch(
      setRuntimeVariable({
        name: "availableLocales",
        value: locales,
      })
    )

    const locale = req.language
    const intl = await store.dispatch(
      setLocale({
        locale,
      })
    )

    await store.dispatch(choseToTheme(theme))

    const css = new Set()

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach((style) => css.add(style._getCss()))
      },
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
      // Apollo Client for use with react-apollo
      client: apolloClient,
      pathname: req.path,
      query: req.query,
      locale,
      intl,
    }

    const route = await router.resolve(context)
    // const route = await UniversalRouter.resolve(routes, {
    //   ...context,
    //   path: req.path,
    //   query: req.query,
    //   locale,
    // });

    let currentLocation = req.path
    let collectionArray = [
      "/message/",
      "/users/trips/itinerary/",
      "/review/write/",
    ]

    if (!req.user) {
      collectionArray &&
        collectionArray.length > 0 &&
        collectionArray.map((value, index) => {
          if (currentLocation.includes(value)) {
            if (req.url) {
              res.redirect("/login?refer=" + currentLocation)
              return
            } else {
              res.redirect("/login")
              return
            }
          }
        })
    }

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect)
      return
    }

    const data = { ...route }

    data.children = await renderToStringWithData(
      <App locale={locale} context={context}>
        {route.component}
      </App>
    )
    data.styles = [{ id: "css", cssText: [...css].join("") }]
    // data.scripts = [
    //   assets.vendor.js
    // ];

    // Furthermore invoked actions will be ignored, client will not receive them!
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log("Serializing store...")
    }
    data.state = context.store.getState()

    data.scripts = [assets["vendors~polyfills"].js]
    // if (route.chunks) {
    //   data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    // }
    data.scripts.push(assets.client.js)

    data.lang = locale
    data.theme = theme

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />)
    res.status(route.status || 200)
    res.send(`<!doctype html>${html}`)
  } catch (err) {
    next(err)
  }
})

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage("express")

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  // console.log(pe.render(err)); // eslint-disable-line no-console

  //URL contain with % symbol, then redirect to not found page
  try {
    decodeURIComponent(req.path)
  } catch (error) {
    return res.redirect("/notFound")
  }
  const locale = req.language
  let theme = req.cookies.theme || "light"
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: "css", cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
      lang={locale}
      theme={theme}
    >
      {ReactDOM.renderToString(
        <IntlProvider locale={locale}>
          <ErrorPageWithoutStyle error={err} />
        </IntlProvider>
      )}
    </Html>
  )
  res.status(err.status || 500)
  res.send(`<!doctype html>${html}`)
})

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
models
  .sync()
  .catch((err) => console.error(err.stack))
  .then(() => {
    app.listen(port, () => {
      console.log(`The server is running at http://localhost:${port}/`)
    })
  })
