import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
import { persistStore } from 'redux-persist'
import io from 'socket.io-client'

// hack to (try to) disable double-tap zooming in iOS 10, see:
// http://stackoverflow.com/questions/37808180/disable-viewport-zooming-ios-10-safari
let lastTouchEnd = 0
document.documentElement.addEventListener('touchend', event => {
  var now = (new Date()).getTime()
  if (now - lastTouchEnd <= 300) {
    event.preventDefault()
  }
  lastTouchEnd = now
}, false)

// the "socket" side of the api requires authentication, so
// we only want to attempt socket connection if we think we
// have a valid session (via JWT in cookie). the socket.io
// handshake (http) will then include the JWT/cookie
window._socket = io({ autoConnect: false })

// ========================================================
// Store Instantiation
// ========================================================
const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

window._persistor = persistStore(store, null, () => {
  // rehydration complete; open socket connection
  // if it looks like we have a valid session
  if (store.getState().user.userId !== null) {
    window._socket.open()
  }
})

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <AppContainer store={store} routes={routes} persistor={window._persistor} />,
    MOUNT_NODE
  )
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

    // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(MOUNT_NODE)
        render()
      })
    )
  }
}

// ========================================================
// Go!
// ========================================================
render()
