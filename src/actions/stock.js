const BASE_URL = ''
const fetchOptions = {headers: {Accept: 'application/json', 'Content-Type': 'application/json'}, credentials: 'include'}

export function lookupSymbol(symbol) {
	return {type: 'lookupSymbol', promise: fetch(`${BASE_URL}/symbols?symbol=${symbol}`, fetchOptions).then(res => {
		if (res.status === 404) {
			alert(`Could not find symbol "${symbol}"`)
			return Promise.reject()
		}
		return res.json()
	})}
}

export function viewStock(stock) {
	return {type: 'viewStock', stock}
}

export function getUser() {
	return {type: 'getUser', promise: fetch(`${BASE_URL}/user`, fetchOptions).then(handleResponse)}
}

export function buyShares() {
	return (dispatch, getState) => {
		const state = getState().app
		const stock = state.activeStock
		const promise = fetch(`${BASE_URL}/stocks/${stock.symbol}/buy`, {...fetchOptions, method: 'post', body: JSON.stringify({shares: stock.quantity})})
		.then(handleResponse).catch(err => {
			alert('An error occurred in buying shares: ' + err.error)
			return Promise.reject(err)
		})
		dispatch({type: 'buyShares', symbol: stock.symbol, shares: stock.quantity, promise})
	}
}

export function sellShares(stock, shares) {
	return (dispatch, getState) => {
		const state = getState().app
		const stock = state.activeStock
		const promise = fetch(`${BASE_URL}/stocks/${stock.symbol}/sell`, {method: 'post', body: JSON.stringify({shares: stock.quantity}), ...fetchOptions}).then(handleResponse).catch(err => {
			alert('An error occurred in selling shares: ' + err.error)
			return Promise.reject(err)
		})
		dispatch({type: 'sellShares', symbol: stock.symbol, shares: stock.quantity, promise})
	}
}

export function setQuantity(quantity) {
	return {type: 'setQuantity', quantity}
}

function handleResponse(res) {
	return res.json().then(data => {
		if (res.ok) return data
		return Promise.reject(data)
	})
}