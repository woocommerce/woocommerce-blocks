/**
 * External dependencies
 */
// import { __ } from '@wordpress/i18n';
import { Component, createRef } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

class PriceSlider extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			currentMin: 0,
			currentMax: 100,
			step: 10,
			min: 0,
			max: 100,
		};
		this.minInput = createRef();
		this.maxInput = createRef();
		this.minRange = createRef();
		this.maxRange = createRef();
		this.onChangeMin = this.onChangeMin.bind( this );
		this.onChangeMax = this.onChangeMax.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
	}

	onChangeMin() {
		const { step, max } = this.state;

		this.setState( {
			currentMin: this.minRange.current.value,
			currentMax: Math.min( max, Math.max( parseInt( this.minRange.current.value, 10 ) + step, this.maxRange.current.value ) ),
		} );
	}

	onChangeMax() {
		const { step, min } = this.state;

		this.setState( {
			currentMin: Math.max( min, Math.min( this.minRange.current.value, parseInt( this.maxRange.current.value, 10 ) - step ) ),
			currentMax: this.maxRange.current.value,
		} );
	}

	onInputChange() {
		this.setState( {
			currentMin: this.minInput.current.value,
			currentMax: this.maxInput.current.value,
		} );
	}

	render() {
		const { min, max, step, currentMin, currentMax } = this.state;

		const minProgress = ( ( currentMin / max ) * 100 );
		// eslint-disable-next-line no-mixed-operators
		const maxProgress = ( max - ( currentMax / max ) * 100 );
		return (
			<div className="wc-block-price-filter__slider_group">
				<input type="text" onInput={ this.onInputChange } ref={ this.minInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--min" value={ currentMin } size="5" />
				<input type="text" onInput={ this.onInputChange } ref={ this.maxInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--max" value={ currentMax } size="5" />
				<div className="wc-block-price-filter__slider_range">
					<input type="range" ref={ this.minRange } onChange={ this.onChangeMin } className="wc-block-price-filter__slider wc-block-price-filter__slider--min" value={ currentMin } step={ step } min={ min } max={ max } />
					<input type="range" ref={ this.maxRange } onChange={ this.onChangeMax } className="wc-block-price-filter__slider wc-block-price-filter__slider--max" value={ currentMax } step={ step } min={ min } max={ max } />
					<div className="wc-block-price-filter__slider_range_progress wc-block-price-filter__slider_range_progress--start" style={ {
						width: 'calc(' + minProgress + '% - 7px ',
					} } />
					<div className="wc-block-price-filter__slider_range_progress wc-block-price-filter__slider_range_progress--end" style={ {
						width: 'calc(' + maxProgress + '% - 7px ',
					} } />
				</div>
			</div>
		);
	}
}

export default PriceSlider;
