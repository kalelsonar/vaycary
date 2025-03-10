import React, { Children } from "react"
import PropTypes from "prop-types"
import { IntlProvider } from "react-intl"
import { Provider as ReduxProvider } from "react-redux"
import moment from "moment"
// import io from 'socket.io-client';

// Helpers
// import SocketProvider from './SocketProvider';
// Moment Locale
import { isRTL, generateMomentLocaleSettings } from "../helpers/formatLocale"

import { payment, socketUrl } from "../config"

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.any.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  store: PropTypes.shape({
    subscribe: PropTypes.any.isRequired,
    dispatch: PropTypes.any.isRequired,
    getState: PropTypes.any.isRequired,
  }).isRequired,
  // Apollo Client
  client: PropTypes.object.isRequired,
  pathname: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  query: PropTypes.object,
  intl: PropTypes.object,
  ...ReduxProvider.childContextTypes,
}

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(
 *     <App context={context}>
 *       <Layout>
 *         <LandingPage />
 *       </Layout>
 *     </App>,
 *     container,
 *   );
 */
class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      load: false,
    }
  }

  static childContextTypes = ContextType

  getChildContext() {
    return this.props.context
  }

  componentDidMount() {
    const { context } = this.props
    const store = context && context.store
    if (store) {
      this.lastLocale = store.getState().intl.locale
      this.unsubscribe = store.subscribe(() => {
        const state = store.getState()
        const { newLocale, locale } = state.intl
        if (!newLocale && this.lastLocale !== locale) {
          this.lastLocale = locale
          this.forceUpdate()
        }
      })
    }
    const locale = context && context.locale

    moment.updateLocale(locale + "-dup", {
      // Updating moment locale
      parentLocale: isRTL(locale) ? locale : "en",
      preparse: function (string) {
        return string
      },
      postformat: function (string) {
        return string
      },
    })

    this.setState({
      load: true,
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    const store = this.props.context && this.props.context.store
    const state = store && store.getState()
    this.intl = (state && state.intl) || {}
    const { initialNow, locale, messages } = this.intl
    const localeMessages = (messages && messages[locale]) || {}

    return (
      <IntlProvider
        initialNow={initialNow}
        locale={locale}
        messages={localeMessages}
        defaultLocale="en-US"
      >
        {/* <SocketProvider /> */}
        {React.Children.only(this.props.children)}
      </IntlProvider>
    )
  }
}

export default App
