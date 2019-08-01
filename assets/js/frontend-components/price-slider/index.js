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
			inputMin: this.formatCurrencyForInput( 0 ),
			inputMax: this.formatCurrencyForInput( 100 ),
			step: 1,
			min: 0,
			max: 100,
		};
		this.minInput = createRef();
		this.maxInput = createRef();
		this.minRange = createRef();
		this.maxRange = createRef();
		this.onDrag = this.onDrag.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
		this.onInputBlur = this.onInputBlur.bind( this );
		this.findClosestRange = this.findClosestRange.bind( this );
		this.validateValues = this.validateValues.bind( this );
		this.formatCurrencyForInput = this.formatCurrencyForInput.bind( this );
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

	validateValues( values, isMin ) {
		const { min, max, step } = this.state;

		let minValue = parseInt( values[ 0 ], 10 ) || min;
		let maxValue = parseInt( values[ 1 ], 10 ) || step;

		if ( min > minValue ) {
			minValue = min;
		}

		if ( max <= minValue ) {
			minValue = max - step;
		}

		if ( min >= maxValue ) {
			maxValue = min + step;
		}

		if ( max < maxValue ) {
			maxValue = max;
		}

		if ( ! isMin && minValue >= maxValue ) {
			minValue = maxValue - step;
		}

		if ( isMin && maxValue <= minValue ) {
			maxValue = minValue + step;
		}

		return [ minValue, maxValue ];
	}

	onInputChange( event ) {
		const newValue = event.target.value.replace( /[^0-9.-]+/g, '' );
		const isMin = event.target.classList.contains( 'wc-block-price-filter__amount--min' );
		const editing = isMin ? 'inputMin' : 'inputMax';
		const newState = {};
		newState[ editing ] = newValue;

		this.setState( newState );
	}

	onInputBlur( event ) {
		const isMin = event.target.classList.contains( 'wc-block-price-filter__amount--min' );
		const values = this.validateValues(
			[
				this.minInput.current.value.replace( /[^0-9.-]+/g, '' ),
				this.maxInput.current.value.replace( /[^0-9.-]+/g, '' ),
			],
			isMin
		);

		this.setState( {
			currentMin: values[ 0 ],
			currentMax: values[ 1 ],
			inputMin: this.formatCurrencyForInput( values[ 0 ] ),
			inputMax: this.formatCurrencyForInput( values[ 1 ] ),
		} );
	}

	onDrag( event ) {
		const isMin = event.target.classList.contains( 'wc-block-price-filter__range-input--min' );
		const values = this.validateValues(
			[
				this.minRange.current.value,
				this.maxRange.current.value,
			],
			isMin
		);

		this.setState( {
			currentMin: values[ 0 ],
			currentMax: values[ 1 ],
			inputMin: this.formatCurrencyForInput( values[ 0 ] ),
			inputMax: this.formatCurrencyForInput( values[ 1 ] ),
		} );
	}

	/**
	 * Works around an IE issue where only one range selector is visible by changing the display order
	 * based on the mouse position.
	 *
	 * @param {obj} event event data.
	 */
	findClosestRange( event ) {
		const { max } = this.state;
		const bounds = event.target.getBoundingClientRect();
		const x = event.clientX - bounds.left;
		const minWidth = this.minRange.current.offsetWidth;
		const minValue = this.minRange.current.value;
		const maxWidth = this.maxRange.current.offsetWidth;
		const maxValue = this.maxRange.current.value;

		const minX = minWidth * ( minValue / max );
		const maxX = maxWidth * ( maxValue / max );

		const minXDiff = Math.abs( x - minX );
		const maxXDiff = Math.abs( x - maxX );

		if ( minXDiff > maxXDiff ) {
			this.minRange.current.style.zIndex = 20;
			this.maxRange.current.style.zIndex = 21;
		} else {
			this.minRange.current.style.zIndex = 21;
			this.maxRange.current.style.zIndex = 20;
		}
	}

	render() {
		const { min, max, step, currentMin, currentMax } = this.state;

		const low = Math.round( 100 * ( ( currentMin - min ) / ( max - min ) ) ) + 0.5;
		const high = Math.round( 100 * ( ( currentMax - min ) / ( max - min ) ) ) + 0.5;

		return (
			<div className="wc-block-price-filter">
				<input type="text" onChange={ this.onInputChange } onBlur={ this.onInputBlur } ref={ this.minInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--min" value={ this.state.inputMin } size="5" />
				<input type="text" onChange={ this.onInputChange } onBlur={ this.onInputBlur } ref={ this.maxInput } className="wc-block-price-filter__amount wc-block-price-filter__amount--max" value={ this.state.inputMax } size="5" />
				<div
					className="wc-block-price-filter__range-input-wrapper"
					onMouseMove={ this.findClosestRange }
					onFocus={ this.findClosestRange }
				>
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
						onChange={ this.onDrag }
						value={ currentMin ? currentMin : 0 }
						step={ step }
						min={ min }
						max={ max }
					/>
					<input
						type="range"
						className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max"
						ref={ this.maxRange }
						onChange={ this.onDrag }
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
