/**
 * External dependencies
 */
// import { __ } from '@wordpress/i18n';
import { Component, createRef } from 'react';

class PriceSlider extends Component {
	constructor() {
		super( ...arguments );
		this.minInput = createRef();
		this.maxInput = createRef();
		this.minRange = createRef();
		this.maxRange = createRef();
		this.onRangeChange = this.onRangeChange.bind( this );
	}

	onRangeChange() {
		console.log( 1 );
	}

	render() {
		return (
			<div className="wc-block-price-filter__slider_group">
				<input type="text" ref={ this.minInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--min" value="20" size="5" />
				<input type="text" ref={ this.maxInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--max" value="50" size="5" />
				<div className="wc-block-price-filter__slider_range">
					<input type="range" ref={ this.minRange } onChange={ this.onRangeChange } className="wc-block-price-filter__slider wc-block-price-filter__slider--min" value="20" step="10" min="0" max="100" />
					<input type="range" ref={ this.maxRange } onChange={ this.onRangeChange } className="wc-block-price-filter__slider wc-block-price-filter__slider--max" value="50" step="10" min="0" max="100" />
				</div>
			</div>
		);
	}
}

export default PriceSlider;
