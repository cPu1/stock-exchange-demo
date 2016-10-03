import {lookupSymbol} from './benzinga.js'

const DEFAULT_CASH = 10e5

class UserService {

	create(id) {
		return {stocks: {}, cash: DEFAULT_CASH}
	}

	buyStock(symbol, shares) {
		return lookupSymbol(symbol).then(stock => {
			if (!stock) return Promise.reject({error: 'Invalid stock'})
			const user = this
			const pricePaid = stock.askPrice * shares
			const newBalance = user.cash - pricePaid
			if (newBalance < 0) return Promise.reject({error: 'Insufficient funds'})
			user.cash = newBalance
			const existingStock = user.stocks[symbol]
			
			if (existingStock) {
				existingStock.pricePaid += pricePaid
				existingStock.shares += shares
			} else {
				user.stocks[symbol] = {...stock, shares, pricePaid}
			}
			
			return {cash: newBalance, pricePaid}
		})
	}

	sellStock(symbol, shares) {
		return lookupSymbol(symbol).then(stock => {
			if (!stock) return
			const user = this
			const userStock = user.stocks[symbol]
			if (!userStock) return Promise.reject({error: `Failed to find stock ${stock.name}`})
			if (userStock.shares < shares) return Promise.reject({error: `Cannot sell ${shares} shares when only ${userStock.shares} are available`})

			const soldFor = stock.bidPrice * shares
			const newBalance = user.cash + soldFor
			user.cash = newBalance
			userStock.shares -= shares //can reach a negative value
			userStock.pricePaid -= soldFor
			if (!userStock.shares) delete user.stocks[symbol]
			return {cash: newBalance, soldFor}
		})
	}
}

export default new UserService