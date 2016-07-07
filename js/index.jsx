import React from 'react'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers'
import App from './components/App.jsx'

const loggerMiddleware = createLogger()

let store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('App'))
