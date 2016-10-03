import request from 'request'

const apiUrl = 'http://data.benzinga.com/rest/richquoteDelayed';

export function lookupSymbol(symbol) {
	return new Promise((resolve, reject) => {
		request({uri: apiUrl, qs: {symbols: symbol}, json: true}, (err, res, body) => {
			if (err || res.statusCode !== 200) return reject(err || body)
			resolve(body[symbol] || null)
		})
	})
}