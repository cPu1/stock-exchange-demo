var Router = require('koa-router')

import {lookupSymbol} from '../service/benzinga.js'
import userService from '../service/user.js'

export default function (app) {
	let router = new Router()

	router.get('/symbols', function *() {
		try {
			const stock = yield lookupSymbol(this.query.symbol)
			if (!stock) this.status = 404
			this.body = {stock}
		} catch (err) {
			handleError(this, err)
		}
	})

	router.post('/stocks/:symbol/sell', function *() {
		const {user} = this.session
		try {
			this.body = yield userService.sellStock.call(user, this.params.symbol, this.request.body.shares)
		} catch (err) {
			handleError(this, err)
		}
	})

	router.post('/stocks/:symbol/buy', function *() {
		const {user} = this.session
		try {
			this.body = yield userService.buyStock.call(user, this.params.symbol, this.request.body.shares)
		} catch (err) {
			handleError(this, err)
		}
	})

	app.use(router.middleware())
}


function handleError(ctx, err) {
	if (err instanceof Error) ctx.status = 500
	else {
		ctx.status = 400
		ctx.body = err
	}
}