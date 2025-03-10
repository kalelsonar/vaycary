import React from "react"
import PropTypes from "prop-types"
import serialize from "serialize-javascript"
import cx from "classnames"
import { analytics } from "../config"
import { isRTL } from "../helpers/formatLocale"
import { ogImageuploadDir, url } from "../config"

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    state: PropTypes.object,
    lang: PropTypes.string,
    children: PropTypes.string.isRequired,
  }

  static defaultProps = {
    styles: [],
    scripts: [],
    state: null,
    lang: "en",
  }
  render() {
    const {
      title,
      description,
      styles,
      scripts,
      state,
      lang,
      children,
      image,
      theme,
    } = this.props
    let bodyClassName, themeClass, ogImage, defaultImage
    bodyClassName = isRTL(lang) ? "rtl" : ""
    themeClass = theme == "dark" ? "darkMode" : "lightMode"
    ogImage = state?.siteSettings?.data?.ogImage
    defaultImage = url + ogImageuploadDir.replace(".", "") + "small_" + ogImage
    const metaKeyword = state?.siteSettings?.data?.metaKeyword

    return (
      <html className="no-js" lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="Cache-control" content="no-cache" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="metaKeyword" content={metaKeyword} />
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" /> */}
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={image ? image : defaultImage} />
          <meta name="twitter:card" content="photo" />
          <meta name="twitter:image" content={image ? image : defaultImage} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <link
            rel="apple-touch-icon"
            href="/images/favicon/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/images/favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/images/favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/images/favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/images/favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/images/favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/images/favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/images/favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/images/favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/images/favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/images/favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/images/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/images/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/images/favicon/favicon-16x16.png"
          />
          <link
            rel="icon"
            type="image/x-icon"
            href="/images/favicon/favicon.ico?"
          />
          <link
            rel="shortcut icon"
            href="/images/favicon/favicon.ico"
            type="image/x-icon"
          />

          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/images/favicon/ms-icon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff"></meta>
          <link rel="stylesheet" href="/css/bootstrap.min.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/react-slick/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/react-slick/slick-theme.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/react-swiper/swiper.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/react-swiper/swiper.min.css"
          />
          <link rel="stylesheet" href="/css/app-common.css" />
          <link rel="stylesheet" href="/css/min/dropzone.min.css" />
          <link rel="stylesheet" media="print" href="/css/print.css" />
          <link rel="stylesheet" type="text/css" href="/css/quill-snow.css" />
          <link rel="stylesheet" href="/css/rtl.css" />
          <link rel="stylesheet" href="/css/dark-mode.css" />
          <link rel="stylesheet" type="text/css" href="/css/phone-input.css" />
          <link
            rel="stylesheet"
            type="text/css"
            href="/css/react-tab-scrollable/tab-scroll.css"
          />

          {isRTL(lang) && (
            <link
              rel="stylesheet"
              id="rtl-style"
              href={"/css/app-rtl.min.css"}
            />
          )}
          {styles.map((style) => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
        </head>
        <body className={cx(bodyClassName, themeClass)}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {state && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.APP_STATE=${serialize(state, {
                  isJSON: true,
                })}`,
              }}
            />
          )}
          {scripts.map((script) => (
            <script key={script} src={script} />
          ))}
          {analytics.google.trackingId && (
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html:
                  `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date());` +
                  `gtag('config', '${analytics.google.trackingId}');`,
              }}
            />
          )}
          {analytics.google.trackingId && (
            <script
              src={`https://www.googletagmanager.com/gtag/js?id=${analytics.google.trackingId}`}
              async
              defer
            />
          )}
          <script
            src="https://checkout.razorpay.com/v1/checkout.js"
            async
          ></script>
        </body>
      </html>
    )
  }
}

export default Html
