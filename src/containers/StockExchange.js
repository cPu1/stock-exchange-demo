import React from 'react'
import {connect} from 'react-redux'

import Header from '../components/Header.js'
import Portfolio from '../components/Portfolio.js'
import ActiveStock from '../components/ActiveStock.js'
import * as stockActions from '../actions/stock.js'


class StockExchange extends React.Component {
  componentWillMount() {
    this.props.dispatch(stockActions.getUser())
  }
  render() {
    const {props} = this
    return (
      <div id="app">
        <Header lookup={symbol => props.dispatch(stockActions.lookupSymbol(symbol))} />
        <div className="content">
          <ActiveStock stock={props.activeStock} setQuantity={quantity => props.dispatch(stockActions.setQuantity(quantity))}
            buy={() => props.dispatch(stockActions.buyShares())} sell={() => props.dispatch(stockActions.sellShares())}
            preventAction={props.preventAction} />
          <Portfolio {...props} viewStock={stock => props.dispatch(stockActions.viewStock(stock))} />
        </div>
      </div>
    )
  }
}


export default connect(state => state.app)(StockExchange)