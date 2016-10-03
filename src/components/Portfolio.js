import React from 'react'

const Portfolio = props => {
	return (
		<section className="portfolio">
			<header>
				<span>Current Portfolio</span>
				<span className="cash">Cash: <strong>${props.cash.toFixed(2)}</strong></span>
			</header>
			<table className="stocks table">
				<thead>
					<tr>
						<th>Company</th>
						<th>Quantity</th>
						<th>Price Paid</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(props.stocks).map(symbol => {
							const stock = props.stocks[symbol]
							return (
								<tr key={symbol}>
									<td>{stock.name}</td>
									<td>{stock.shares}</td>
									<td>{stock.pricePaid.toFixed(2)}</td>
									<td>
										<button type="button" onClick={() => props.viewStock(stock)}>View Stock</button>
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</section>
	)
}

export default Portfolio