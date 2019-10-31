/**
 * External dependencies
 */
import { sprintf, __ } from '@wordpress/i18n';
import {
	Fragment,
	useState,
	useEffect,
	useRef,
	useCallback,
	useMemo,
} from '@wordpress/element';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDebounce } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import './style.scss';
import { constrainRangeSliderValues, formatCurrencyForInput } from './utils';

const PriceSlider = ( {
	initialMin,
	initialMax,
	minConstraint,
	maxConstraint,
	onChange,
	step,
	currencySymbol,
	priceFormat,
	showInputFields,
	showFilterButton,
	isLoading,
} ) => {
	const minInput = useRef();
	const maxInput = useRef();
	const minRange = useRef();
	const maxRange = useRef();
	const [ minPrice, setMinPrice ] = useState( initialMin );
	const [ maxPrice, setMaxPrice ] = useState( initialMax );
	const [ formattedMinPrice, setFormattedMinPrice ] = useState(
		formatCurrencyForInput( minPrice, priceFormat, currencySymbol )
	);
	const [ formattedMaxPrice, setFormattedMaxPrice ] = useState(
		formatCurrencyForInput( maxPrice, priceFormat, currencySymbol )
	);
	const debouncedChangeValue = useDebounce( [ minPrice, maxPrice ], 500 );

	useEffect( () => {
		if (
			minPrice === undefined ||
			maxPrice === undefined ||
			minConstraint > minPrice ||
			maxConstraint < maxPrice
		) {
			setMinPrice( minConstraint );
			setMaxPrice( maxConstraint );
		}
	}, [ minConstraint, maxConstraint ] );

	useEffect( () => {
		setFormattedMinPrice(
			formatCurrencyForInput( minPrice, priceFormat, currencySymbol )
		);
		setFormattedMaxPrice(
			formatCurrencyForInput( maxPrice, priceFormat, currencySymbol )
		);
	}, [ minPrice, maxPrice ] );

	useEffect( () => {
		if ( ! showFilterButton && ! isLoading ) {
			triggerChangeCallback();
		}
	}, [ debouncedChangeValue ] );

	/**
	 * Handles styles for the shaded area of the range slider.
	 */
	const getProgressStyle = useMemo( () => {
		const low =
			Math.round(
				100 *
					( ( minPrice - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) - 0.5;
		const high =
			Math.round(
				100 *
					( ( maxPrice - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) + 0.5;

		return {
			'--low': low + '%',
			'--high': high + '%',
		};
	}, [ minPrice, minConstraint, maxPrice, maxConstraint ] );

	/**
	 * Trigger the onChange prop callback with new values.
	 */
	const triggerChangeCallback = useCallback( () => {
		onChange( [ minPrice, maxPrice ] );
	}, [ minPrice, maxPrice ] );

	/**
	 * Works around an IE issue where only one range selector is visible by changing the display order
	 * based on the mouse position.
	 *
	 * @param {obj} event event data.
	 */
	const findClosestRange = useCallback(
		( event ) => {
			if ( isLoading ) {
				return;
			}
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
		},
		[ isLoading, maxConstraint, minRange, maxRange ]
	);

	/**
	 * Called when the slider is dragged.
	 * @param {obj} event Event object.
	 */
	const onDrag = useCallback(
		( event ) => {
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
			setMinPrice( parseInt( values[ 0 ], 10 ) );
			setMaxPrice( parseInt( values[ 1 ], 10 ) );
		},
		[ minRange, minConstraint, maxConstraint, step ]
	);

	/**
	 * Called when a price input loses focus.
	 * @param {obj} event Event object.
	 */
	const onInputBlur = useCallback(
		( event ) => {
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
			setMinPrice( parseInt( values[ 0 ], 10 ) );
			setMaxPrice( parseInt( values[ 1 ], 10 ) );
		},
		[ minInput, maxInput, minConstraint, maxConstraint, step ]
	);

	/**
	 * Called when the value of a price input is changed.
	 * @param {obj} event Event object.
	 */
	const onInputChange = useCallback(
		( event ) => {
			const newValue = event.target.value.replace( /[^0-9.-]+/g, '' );
			const isMin = event.target.classList.contains(
				'wc-block-price-filter__amount--min'
			);
			if ( isMin ) {
				setFormattedMinPrice(
					formatCurrencyForInput(
						newValue,
						priceFormat,
						currencySymbol
					)
				);
			} else {
				setFormattedMaxPrice(
					formatCurrencyForInput(
						newValue,
						priceFormat,
						currencySymbol
					)
				);
			}
		},
		[ priceFormat, currencySymbol ]
	);

	/**
	 * Renders the submit button.
	 */
	const renderSubmit = () => {
		return (
			<button
				type="submit"
				className="wc-block-price-filter__button wc-block-form-button"
				disabled={ isLoading }
				onClick={ triggerChangeCallback }
			>
				{ __( 'Go', 'woo-gutenberg-products-block' ) }
			</button>
		);
	};

	/**
	 * Renders text showing current prices.
	 */
	const renderText = () => {
		if ( isLoading ) {
			return;
		}
		return (
			<div className="wc-block-price-filter__range-text">
				{ sprintf(
					__( 'Price: %s — %s', 'woo-gutenberg-products-block' ),
					formattedMinPrice,
					formattedMaxPrice
				) }
			</div>
		);
	};

	/**
	 * Renders text inputs for manual price input.
	 */
	const renderTextInputs = () => {
		return (
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
					value={ formattedMinPrice }
					onChange={ onInputChange }
					onBlur={ onInputBlur }
					disabled={ isLoading }
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
					value={ formattedMaxPrice }
					onChange={ onInputChange }
					onBlur={ onInputBlur }
					disabled={ isLoading }
				/>
			</Fragment>
		);
	};

	/**
	 * Render range input sliders.
	 */
	const renderRangeInputs = () => {
		const rangeInputProps = {
			onChange: onDrag,
			step,
			min: minConstraint,
			max: maxConstraint,
			disabled: isLoading,
		};
		return (
			<Fragment>
				<div
					className="wc-block-price-filter__range-input-progress"
					style={ getProgressStyle }
				/>
				<input
					type="range"
					className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min"
					aria-label={ __(
						'Filter products by minimum price',
						'woo-gutenberg-products-block'
					) }
					ref={ minRange }
					value={ minPrice || 0 }
					{ ...rangeInputProps }
				/>
				<input
					type="range"
					className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max"
					aria-label={ __(
						'Filter products by maximum price',
						'woo-gutenberg-products-block'
					) }
					ref={ maxRange }
					value={ maxPrice || 0 }
					{ ...rangeInputProps }
				/>
			</Fragment>
		);
	};

	const classes = classnames(
		'wc-block-price-filter',
		showInputFields && 'wc-block-price-filter--has-input-fields',
		showFilterButton && 'wc-block-price-filter--has-filter-button',
		isLoading && 'is-loading'
	);

	return (
		<div className={ classes }>
			<div
				className="wc-block-price-filter__range-input-wrapper"
				onMouseMove={ findClosestRange }
				onFocus={ findClosestRange }
			>
				{ ! isLoading && renderRangeInputs() }
			</div>
			<div className="wc-block-price-filter__controls">
				{ showInputFields ? renderTextInputs() : renderText() }
				{ showFilterButton && renderSubmit() }
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
	 * Initial min value.
	 */
	initialMin: PropTypes.number,
	/**
	 * Initial max value.
	 */
	initialMax: PropTypes.number,
	/**
	 * Minimum allowed price.
	 */
	minConstraint: PropTypes.number,
	/**
	 * Maximum allowed price.
	 */
	maxConstraint: PropTypes.number,
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
	/**
	 * Whether or not to show filter button above the slider.
	 */
	isLoading: PropTypes.bool,
};

PriceSlider.defaultProps = {
	step: 1,
	currencySymbol: '$',
	priceFormat: '%1$s%2$s',
	showInputFields: true,
	showFilterButton: false,
	isLoading: false,
};

export default PriceSlider;
