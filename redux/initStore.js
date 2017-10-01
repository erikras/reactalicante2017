import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

const initStore = (initialState = {}) => {
  if (process.browser && window.__store) {
    return window.__store
  }

  const middleware = []

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  )

  if (process.browser) {
    window.__store = store
  }

  return store
}

export default initStore
