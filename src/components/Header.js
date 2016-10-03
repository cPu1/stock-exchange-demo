import React from 'react'

export default class Header extends React.Component {
	constructor(props) {
		super(props)
		this.state = {symbol: ''}
		this.setSymbol = this.setSymbol.bind(this)
	}

	setSymbol(e) {
		this.setState({symbol: e.target.value});
	}

	render() {
		const {state} = this
		return (
			<header className="header">
				<h3>Simple Stock Exchange</h3>
				<div className="symbol-lookup">
					<input type="text" className="symbol-input" value={state.symbol} onChange={this.setSymbol} placeholder="Enter Symbol"
						onKeyPress={e => e.key === 'Enter' && this.props.lookup(state.symbol)}/>
					<button type="button" className="lookup-btn" onClick={() => this.props.lookup(state.symbol)}>Lookup</button>
				</div>
			</header>
		)
	}
}