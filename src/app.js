import React from 'react'
import ReactDOM from 'react-dom'
import {combineReducers, compose, applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import {syncHistoryWithStore, routerReducer, routerMiddleware} from 'react-router-redux'
import {Router, browserHistory} from 'react-router'
import reduxThunk from 'redux-thunk'
import promiseMiddleware from './middleware/promise.js'
import 'whatwg-fetch'

import reducers from './reducers'

const appReducers = combineReducers({app: reducers})

const appState = window.appState || {}

const store = compose(
  applyMiddleware(reduxThunk, promiseMiddleware),
  window.devToolsExtension? window.devToolsExtension() : f => f
)(createStore)(appReducers, appState)

window.store = store

import StockExchange from './containers/StockExchange.js';

ReactDOM.render(
  <Provider store={store}>
    <StockExchange />
  </Provider>,
  document.getElementById('root'));