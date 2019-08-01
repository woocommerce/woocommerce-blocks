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

		let value = this.minRange.current.value;

		if ( max <= value ) {
			value = max - step;
		}

		this.setState( {
			currentMin: value,
			currentMax: Math.min( max, Math.max( this.maxRange.current.value, parseInt( value, 10 ) + step ) ),
		} );
	}

	onChangeMax() {
		const { step, min } = this.state;

		let value = this.maxRange.current.value;

		if ( min >= value ) {
			value = min + step;
		}

		this.setState( {
			currentMin: Math.max( min, Math.min( this.minRange.current.value, parseInt( value, 10 ) - step ) ),
			currentMax: value,
		} );
	}

	onInputMin() {
		const { min, max, step } = this.state;

		let value = this.minInput.current.value.replace( /[^0-9.-]+/g, '' );

		if ( min > value ) {
			value = min;
		}

		if ( max <= value ) {
			value = max - step;
		}

		this.setState( {
			currentMin: value ? parseInt( value, 10 ) : '',
			currentMax: Math.min( max, Math.max( ( parseInt( value, 10 ) || 0 ) + step, this.maxRange.current.value ) ),
		} );
	}

	onInputMax() {
		const { min, max, step } = this.state;

		let value = this.maxInput.current.value.replace( /[^0-9.-]+/g, '' );

		if ( min >= value ) {
			value = min + step;
		}

		if ( max < value ) {
			value = max;
		}

		this.setState( {
			currentMin: Math.max( min, Math.min( ( parseInt( value, 10 ) || 0 ) - step ), this.minRange.current.value ),
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

		const low = Math.round( 100 * ( ( currentMin - min ) / ( max - min ) ) ) + 0.5;
		const high = Math.round( 100 * ( ( currentMax - min ) / ( max - min ) ) ) + 0.5;

		return (
			<div className="wc-block-price-filter">
				<input type="text" onInput={ this.onInputMin } ref={ this.minInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--min" value={ this.formatCurrencyForInput( currentMin ) } size="5" />
				<input type="text" onInput={ this.onInputMax } ref={ this.maxInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--max" value={ this.formatCurrencyForInput( currentMax ) } size="5" />
				<div className="wc-block-price-filter__range-input-wrapper">
					<div className="wc-block-price-filter__range-input-progress" style={
						{
							'--low': low + '%',
							'--high': high + '%',
						}
					} />
					<input
						type="range"
						className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min"
						ref={ this.minRange }
						onChange={ this.onChangeMin }
						value={ currentMin ? currentMin : 0 }
						step={ step }
						min={ min }
						max={ max }
					/>
					<input
						type="range"
						className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max"
						ref={ this.maxRange }
						onMouseDown={ this.onMouseOver }
						onChange={ this.onChangeMax }
						value={ currentMax ? currentMax : max }
						step={ step }
						min={ min }
						max={ max }
					/>
				</div>
			</div>
		);
	}
}

export default PriceSlider;
