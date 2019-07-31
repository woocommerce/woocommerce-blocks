/**
 * External dependencies
 */
import { sprintf } from '@wordpress/i18n';
import { Component, createRef } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

const get = ( obj, path, defaultValue ) => {
	const result = String.prototype.split.call( path, /[,[\].]+?/ )
		.filter( Boolean )
		.reduce( ( res, key ) => ( res !== null && res !== undefined ) ? res[ key ] : res, obj );
	return ( result === undefined || result === obj ) ? defaultValue : result;
};

class PriceSlider extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			currentMin: 0,
			currentMax: 100,
			step: 1,
			min: 0,
			max: 100,
		};
		this.minInput = createRef();
		this.maxInput = createRef();
		this.minRange = createRef();
		this.maxRange = createRef();
		this.onChangeMin = this.onChangeMin.bind( this );
		this.onChangeMax = this.onChangeMax.bind( this );
		this.onInputMin = this.onInputMin.bind( this );
		this.onInputMax = this.onInputMax.bind( this );
		this.formatCurrencyForInput = this.formatCurrencyForInput.bind( this );
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

	onInputMin() {
		const { min, max } = this.state;

		let value = this.minInput.current.value.replace( /[^0-9.-]+/g, '' );

		if ( min > value ) {
			value = min;
		}

		if ( max < value ) {
			value = max;
		}

		this.setState( {
			currentMin: value ? parseInt( value, 10 ) : '',
			currentMax: Math.min( max, Math.max( parseInt( value, 10 ) || 0, this.maxRange.current.value ) ),
		} );
	}

	onInputMax() {
		const { min, max } = this.state;

		let value = this.maxInput.current.value.replace( /[^0-9.-]+/g, '' );

		if ( min > value ) {
			value = min;
		}

		if ( max < value ) {
			value = max;
		}

		this.setState( {
			currentMin: Math.max( min, Math.min( this.minRange.current.value, parseInt( value, 10 ) || 0 ) ),
			currentMax: value ? parseInt( value, 10 ) : '',
		} );
	}

	formatCurrencyForInput( value ) {
		if ( '' === value ) {
			return '';
		}
		const formattedNumber = parseInt( value, 10 );
		const currencySymbol = get( wcSettings, [ 'currency', 'symbol' ], '$' );
		const priceFormat = get( wcSettings, [ 'currency', 'price_format' ], '%1$s%2$s' );

		if ( '' === formattedNumber ) {
			return formattedNumber;
		}

		const formattedValue = sprintf( priceFormat, currencySymbol, formattedNumber );
		const txt = document.createElement( 'textarea' );
		txt.innerHTML = formattedValue;
		return txt.value;
	}

	render() {
		const { min, max, step, currentMin, currentMax } = this.state;

		const minProgress = ( ( currentMin / max ) * 100 );
		// eslint-disable-next-line no-mixed-operators
		const maxProgress = ( max - ( currentMax / max ) * 100 );
		return (
			<div className="wc-block-price-filter__slider_group">
				<input type="text" onInput={ this.onInputMin } ref={ this.minInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--min" value={ this.formatCurrencyForInput( currentMin ) } size="5" />
				<input type="text" onInput={ this.onInputMax } ref={ this.maxInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--max" value={ this.formatCurrencyForInput( currentMax ) } size="5" />
				<div className="wc-block-price-filter__slider_range">
					<input type="range" ref={ this.minRange } onChange={ this.onChangeMin } className="wc-block-price-filter__slider wc-block-price-filter__slider--min" value={ currentMin ? currentMin : 0 } step={ step } min={ min } max={ max } />
					<input type="range" ref={ this.maxRange } onChange={ this.onChangeMax } className="wc-block-price-filter__slider wc-block-price-filter__slider--max" value={ currentMax ? currentMax : max } step={ step } min={ min } max={ max } />
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
