import React from 'react'

const ActiveStock = props => {
	const {stock} = props
	return (
		<section className="active-stock">
			{
				stock ?
				<div>
					<header>{stock.name} ({stock.symbol})</header>
					<div className="stock">
						<div className="active-stats">
							<div className="stats">
								<span className="text">Bid</span>: <strong>{stock.bidPrice}</strong>
							</div>
							<div className="stats">
								<span>Ask</span>: <strong>{stock.askPrice}</strong>
							</div>
						</div>
						<div className="stock-actions">
							<input type="number" placeholder="Quantity" value={stock.quantity}
								onChange={e => props.setQuantity(+e.target.value)} disabled={props.preventAction} />
							<button type="button" onClick={props.buy} disabled={props.preventAction}>Buy</button>
							<button type="button" onClick={props.sell} disabled={props.preventAction}>Sell</button>
						</div>
					</div>
				</div>
				:
				<div className="no-stock">No active stock selected</div>
			}
		</section>
	)
}

export default ActiveStock