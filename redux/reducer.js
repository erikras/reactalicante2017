import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import clients from './clients'
import widgets from './widgets'

export default combineReducers({
  auth,
  clients,
  form: formReducer,
  widgets
})
