const initialState = {
	cash: 0,
	stocks: {}
}

export default function stockReducer(state = initialState, action) {
	switch (action.type) {
		case 'lookupSymbol':
			return {...state, loading: true}
		case 'lookupSymbolSuccess':
			return {...state, activeStock: {...action.stock, quantity: 1}, loading: false}
		case 'lookupSymbolFailure':
			return {...state, loading: false}
		case 'viewStock':
			let {stock} = action
			return {...state, activeStock: {name: stock.name, symbol: stock.symbol, bidPrice: stock.bidPrice, askPrice: stock.askPrice, quantity: 1}}
		case 'buyShares':
		case 'sellShares':
			return {...state, preventAction: true}
		case 'buySharesSuccess':
			return buyShares(state, action)
		case 'sellSharesSuccess':
			return sellShares(state, action)
		case 'buySharesFailure':
		case 'sellSharesFailure':
			return {...state, preventAction: false}
		case 'setQuantity':
			return {...state, activeStock: {...state.activeStock, quantity: action.quantity}}
		case 'getUserSuccess':
			return {cash: action.cash, stocks: action.stocks}
		case 'initState':
			return {cash: action.cash, stocks: action.stocks}
		default:
			return state
	}
}

function buyShares(state, action) {
	const {activeStock} = state
	let stock = state.stocks[activeStock.symbol]
	if (stock) {
		stock = {...stock, shares: stock.shares + activeStock.quantity, pricePaid: stock.pricePaid + action.pricePaid}
	} else {
		stock = {...activeStock, shares: activeStock.quantity, pricePaid: action.pricePaid}
	}
	return {...state, stocks: {...state.stocks, [activeStock.symbol]: stock }, cash: action.cash, preventAction: false}
}

function sellShares(state, action) {
	const {activeStock} = state
	let {stocks} = state
	let stock = stocks[activeStock.symbol]

	if (stock.shares - activeStock.quantity === 0) {
		stocks = {...stocks}
		delete stocks[stock.symbol]
	} else {
		stocks = {...stocks, [stock.symbol]: {...stock, shares: stock.shares - activeStock.quantity, pricePaid: stock.pricePaid - action.soldFor}} //could turn negative
	}

	return {...state, stocks, cash: action.cash, preventAction: false}
}