/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';
import { constrainRangeSliderValues } from './utils';

class PriceSlider extends Component {
	constructor( props ) {
		const { min, max } = props;
		super( ...arguments );
		this.state = {
			currentMin: parseInt( min, 10 ),
			currentMax: parseInt( max, 10 ),
			inputMin: this.formatCurrencyForInput( min ),
			inputMax: this.formatCurrencyForInput( max ),
		};
		this.minInput = createRef();
		this.maxInput = createRef();
		this.minRange = createRef();
		this.maxRange = createRef();
		this.onDrag = this.onDrag.bind( this );
		this.onInputChange = this.onInputChange.bind( this );
		this.onInputBlur = this.onInputBlur.bind( this );
		this.findClosestRange = this.findClosestRange.bind( this );
		this.getProgressStyle = this.getProgressStyle.bind( this );
		this.formatCurrencyForInput = this.formatCurrencyForInput.bind( this );
	}

	componentDidUpdate( prevProps, prevState ) {
		const { currentMin, currentMax } = this.state;

		if ( prevState.currentMin !== currentMin || prevState.currentMax !== currentMax ) {
			const { onChange } = this.props;

			onChange( {
				min: currentMin,
				max: currentMax,
			} );
		}
	}

	formatCurrencyForInput( value ) {
		if ( '' === value ) {
			return '';
		}
		const { currencySymbol, priceFormat } = this.props;

		const formattedNumber = parseInt( value, 10 );
		const formattedValue = sprintf( priceFormat, currencySymbol, formattedNumber );

		// This uses a textarea to magically decode HTML currency symbols.
		const txt = document.createElement( 'textarea' );
		txt.innerHTML = formattedValue;
		return txt.value;
	}

	onInputChange( event ) {
		const newValue = event.target.value.replace( /[^0-9.-]+/g, '' );
		const isMin = event.target.classList.contains( 'wc-block-price-filter__amount--min' );
		const editing = isMin ? 'inputMin' : 'inputMax';

		this.setState( {
			[ editing ]: newValue,
		} );
	}

	onInputBlur( event ) {
		const { min, max, step } = this.props;
		const isMin = event.target.classList.contains( 'wc-block-price-filter__amount--min' );
		const values = constrainRangeSliderValues(
			[
				this.minInput.current.value.replace( /[^0-9.-]+/g, '' ),
				this.maxInput.current.value.replace( /[^0-9.-]+/g, '' ),
			],
			min,
			max,
			step,
			isMin
		);

		this.setState( {
			currentMin: parseInt( values[ 0 ], 10 ),
			currentMax: parseInt( values[ 1 ], 10 ),
			inputMin: this.formatCurrencyForInput( values[ 0 ] ),
			inputMax: this.formatCurrencyForInput( values[ 1 ] ),
		} );
	}

	onDrag( event ) {
		const { min, max, step } = this.props;
		const isMin = event.target.classList.contains( 'wc-block-price-filter__range-input--min' );
		const values = constrainRangeSliderValues(
			[
				this.minRange.current.value,
				this.maxRange.current.value,
			],
			min,
			max,
			step,
			isMin
		);

		this.setState( {
			currentMin: parseInt( values[ 0 ], 10 ),
			currentMax: parseInt( values[ 1 ], 10 ),
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
		const { max } = this.props;
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

		/**
		 * The default z-index in the stylesheet as 20. 20 vs 21 is just for determining which range
		 * slider should be at the front and has no meaning beyond this.
		 */
		if ( minXDiff > maxXDiff ) {
			this.minRange.current.style.zIndex = 20;
			this.maxRange.current.style.zIndex = 21;
		} else {
			this.minRange.current.style.zIndex = 21;
			this.maxRange.current.style.zIndex = 20;
		}
	}

	getProgressStyle() {
		const { min, max } = this.props;
		const { currentMin, currentMax } = this.state;

		const low = Math.round( 100 * ( ( currentMin - min ) / ( max - min ) ) ) - 0.5;
		const high = Math.round( 100 * ( ( currentMax - min ) / ( max - min ) ) ) + 0.5;

		return {
			'--low': low + '%',
			'--high': high + '%',
		};
	}

	render() {
		const { min, max, step, showInputFields, showFilterButton } = this.props;
		const { inputMin, inputMax, currentMin, currentMax } = this.state;

		const classes = classnames(
			'wc-block-price-filter',
			showInputFields && 'wc-block-price-filter--has-input-fields',
			showFilterButton && 'wc-block-price-filter--has-filter-button',
		);
		return (
			<div className={ classes }>
				<div className="wc-block-price-filter__controls">
					{ showInputFields && (
						<Fragment>
							<input
								type="text"
								className="wc-block-price-filter__amount wc-block-price-filter__amount--min wc-block-form-text-input"
								aria-label={ __( 'Filter products by minimum price', 'woo-gutenberg-products-block' ) }
								size="5"
								ref={ this.minInput }
								value={ inputMin }
								onChange={ this.onInputChange }
								onBlur={ this.onInputBlur }
							/>
							<input
								type="text"
								className="wc-block-price-filter__amount wc-block-price-filter__amount--max wc-block-form-text-input"
								aria-label={ __( 'Filter products by maximum price', 'woo-gutenberg-products-block' ) }
								size="5"
								ref={ this.maxInput }
								value={ inputMax }
								onChange={ this.onInputChange }
								onBlur={ this.onInputBlur }
							/>
						</Fragment>
					) }
					{ showFilterButton && (
						<button
							type="submit"
							className="wc-block-price-filter__button wc-block-form-button"
						>
							{ __( 'Go', 'woo-gutenberg-products-block' ) }
						</button>
					) }
				</div>
				<div
					className="wc-block-price-filter__range-input-wrapper"
					onMouseMove={ this.findClosestRange }
					onFocus={ this.findClosestRange }
				>
					<div className="wc-block-price-filter__range-input-progress" style={ this.getProgressStyle() } />
					<input
						type="range"
						className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min"
						aria-label={ __( 'Filter products by minimum price', 'woo-gutenberg-products-block' ) }
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
						aria-label={ __( 'Filter products by maximum price', 'woo-gutenberg-products-block' ) }
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

PriceSlider.propTypes = {
	/**
	 * Callback fired when prices changes.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * Minimum allowed price.
	 */
	min: PropTypes.number,
	/**
	 * Maximum allowed price.
	 */
	max: PropTypes.number.isRequired,
	/**
	 * Step for slider inputs.
	 */
	step: PropTypes.number,
	/**
	 * Currency symbol to use when formatting prices for display.
	 */
	currencySymbol: PropTypes.string,
	/**
	 * Price format to use when formatting prices for display.
	 */
	priceFormat: PropTypes.string,
	/**
	 * Whether or not to show input fields above the slider.
	 */
	showInputFields: PropTypes.boolean,
	/**
	 * Whether or not to show filter button above the slider.
	 */
	showFilterButton: PropTypes.boolean,
};

PriceSlider.defaultProps = {
	min: 0,
	step: 1,
	currencySymbol: '$',
	priceFormat: '%1$s%2$s',
	showInputFields: true,
	showFilterButton: false,
};

export default PriceSlider;
