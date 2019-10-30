/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useCollection } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import { constrainRangeSliderValues, formatCurrencyForInput } from './utils';

const PriceSlider = ( {
	min,
	max,
	onChange,
	step,
	currencySymbol,
	priceFormat,
	showInputFields,
	showFilterButton,
} ) => {
	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			calculate_price_range: true,
		},
	} );

	const minConstraint = isLoading
		? parseInt( min, 10 )
		: parseInt( results.min_price, 10 );
	const maxConstraint = isLoading
		? parseInt( max, 10 )
		: parseInt( results.max_price, 10 );

	const [ currentMin, setCurrentMin ] = useState( minConstraint );
	const [ currentMax, setCurrentMax ] = useState( maxConstraint );

	const [ inputMin, setInputMin ] = useState(
		formatCurrencyForInput( minConstraint, priceFormat, currencySymbol )
	);
	const [ inputMax, setInputMax ] = useState(
		formatCurrencyForInput( maxConstraint, priceFormat, currencySymbol )
	);

	/**
	 * Handles styles for the shaded area of the range slider.
	 */
	const getProgressStyle = () => {
		const low =
			Math.round(
				100 *
					( ( currentMin - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) - 0.5;
		const high =
			Math.round(
				100 *
					( ( currentMax - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) + 0.5;

		return {
			'--low': low + '%',
			'--high': high + '%',
		};
	};

	/**
	 * Works around an IE issue where only one range selector is visible by changing the display order
	 * based on the mouse position.
	 *
	 * @param {obj} event event data.
	 */
	const findClosestRange = ( event ) => {
		const bounds = event.target.getBoundingClientRect();
		const x = event.clientX - bounds.left;
		const minWidth = minRange.current.offsetWidth;
		const minValue = minRange.current.value;
		const maxWidth = maxRange.current.offsetWidth;
		const maxValue = maxRange.current.value;

		const minX = minWidth * ( minValue / maxConstraint );
		const maxX = maxWidth * ( maxValue / maxConstraint );

		const minXDiff = Math.abs( x - minX );
		const maxXDiff = Math.abs( x - maxX );

		/**
		 * The default z-index in the stylesheet as 20. 20 vs 21 is just for determining which range
		 * slider should be at the front and has no meaning beyond
		 */
		if ( minXDiff > maxXDiff ) {
			minRange.current.style.zIndex = 20;
			maxRange.current.style.zIndex = 21;
		} else {
			minRange.current.style.zIndex = 21;
			maxRange.current.style.zIndex = 20;
		}
	};

	const updateRanges = ( setMin, setMax ) => {
		setCurrentMin( parseInt( setMin, 10 ) );
		setCurrentMax( parseInt( setMax, 10 ) );
		setInputMin(
			formatCurrencyForInput( setMin, priceFormat, currencySymbol )
		);
		setInputMax(
			formatCurrencyForInput( setMax, priceFormat, currencySymbol )
		);
	};

	const onDrag = ( event ) => {
		const isMin = event.target.classList.contains(
			'wc-block-price-filter__range-input--min'
		);
		const values = constrainRangeSliderValues(
			[ minRange.current.value, maxRange.current.value ],
			minConstraint,
			maxConstraint,
			step,
			isMin
		);
		updateRanges( values[ 0 ], values[ 1 ] );
	};

	const onInputBlur = ( event ) => {
		const isMin = event.target.classList.contains(
			'wc-block-price-filter__amount--min'
		);
		const values = constrainRangeSliderValues(
			[
				minInput.current.value.replace( /[^0-9.-]+/g, '' ),
				maxInput.current.value.replace( /[^0-9.-]+/g, '' ),
			],
			minConstraint,
			maxConstraint,
			step,
			isMin
		);
		updateRanges( values[ 0 ], values[ 1 ] );
	};

	const onInputChange = ( event ) => {
		const newValue = event.target.value.replace( /[^0-9.-]+/g, '' );
		const isMin = event.target.classList.contains(
			'wc-block-price-filter__amount--min'
		);

		if ( isMin ) {
			setInputMin( newValue );
		} else {
			setInputMax( newValue );
		}
	};

	useEffect( () => {
		/**
		 * Passes values to a callback provided in props.
		 */
		onChange( {
			min: currentMin,
			max: currentMax,
		} );
	}, [ currentMin, currentMax ] );

	const minInput = useRef( inputMin );
	const maxInput = useRef( inputMax );
	const minRange = useRef( currentMin ? currentMin : 0 );
	const maxRange = useRef( currentMax ? currentMax : maxConstraint );
	const classes = classnames(
		'wc-block-price-filter',
		showInputFields && 'wc-block-price-filter--has-input-fields',
		showFilterButton && 'wc-block-price-filter--has-filter-button'
	);
	return (
		<div className={ classes }>
			<div
				className="wc-block-price-filter__range-input-wrapper"
				onMouseMove={ findClosestRange }
				onFocus={ findClosestRange }
			>
				<div
					className="wc-block-price-filter__range-input-progress"
					style={ getProgressStyle() }
				/>
				<input
					type="range"
					className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min"
					aria-label={ __(
						'Filter products by minimum price',
						'woo-gutenberg-products-block'
					) }
					ref={ minRange }
					onChange={ onDrag }
					value={ currentMin ? currentMin : 0 }
					step={ step }
					min={ minConstraint }
					max={ maxConstraint }
				/>
				<input
					type="range"
					className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max"
					aria-label={ __(
						'Filter products by maximum price',
						'woo-gutenberg-products-block'
					) }
					ref={ maxRange }
					onChange={ onDrag }
					value={ currentMax ? currentMax : maxConstraint }
					step={ step }
					min={ minConstraint }
					max={ maxConstraint }
				/>
			</div>
			<div className="wc-block-price-filter__controls">
				{ showInputFields ? (
					<Fragment>
						<input
							type="text"
							className="wc-block-price-filter__amount wc-block-price-filter__amount--min wc-block-form-text-input"
							aria-label={ __(
								'Filter products by minimum price',
								'woo-gutenberg-products-block'
							) }
							size="5"
							ref={ minInput }
							value={ inputMin }
							onChange={ onInputChange }
							onBlur={ onInputBlur }
						/>
						<input
							type="text"
							className="wc-block-price-filter__amount wc-block-price-filter__amount--max wc-block-form-text-input"
							aria-label={ __(
								'Filter products by maximum price',
								'woo-gutenberg-products-block'
							) }
							size="5"
							ref={ maxInput }
							value={ inputMax }
							onChange={ onInputChange }
							onBlur={ onInputBlur }
						/>
					</Fragment>
				) : (
					<div className="wc-block-price-filter__range-text">
						{ sprintf(
							__(
								'Price: %s — %s',
								'woo-gutenberg-products-block'
							),
							inputMin,
							inputMax
						) }
					</div>
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
		</div>
	);
};

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
	max: PropTypes.number,
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
	showInputFields: PropTypes.bool,
	/**
	 * Whether or not to show filter button above the slider.
	 */
	showFilterButton: PropTypes.bool,
};

PriceSlider.defaultProps = {
	min: 0,
	max: 0,
	step: 1,
	currencySymbol: '$',
	priceFormat: '%1$s%2$s',
	showInputFields: true,
	showFilterButton: false,
};

export default PriceSlider;
