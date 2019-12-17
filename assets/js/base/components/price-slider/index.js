/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	Fragment,
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from '@wordpress/element';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import NumberFormat from 'react-number-format';

/**
 * Internal dependencies
 */
import './style.scss';
import { constrainRangeSliderValues } from './utils';
import FilterSubmitButton from '../filter-submit-button';

/**
 * Price slider component.
 *
 * @param {Object} props Component props.
 */
const PriceSlider = ( {
	minPrice,
	maxPrice,
	minConstraint,
	maxConstraint,
	onChange = () => {},
	step,
	thousandSeparator = ',',
	decimalSeparator = '.',
	decimalScale = 2,
	prefix = '$',
	suffix,
	showInputFields = true,
	showFilterButton = false,
	isLoading = false,
	onSubmit = () => {},
} ) => {
	const minRange = useRef();
	const maxRange = useRef();

	// We want step to default to 10 major units, e.g. $10.
	const stepValue = step ? step : 10 * 10 ** decimalScale;

	const [ minPriceInput, setMinPriceInput ] = useState(
		minPrice / 10 ** decimalScale
	);
	const [ maxPriceInput, setMaxPriceInput ] = useState(
		maxPrice / 10 ** decimalScale
	);

	useEffect( () => {
		setMinPriceInput( minPrice / 10 ** decimalScale );
	}, [ minPrice ] );

	useEffect( () => {
		setMaxPriceInput( maxPrice / 10 ** decimalScale );
	}, [ maxPrice ] );

	/**
	 * Checks if the min and max constraints are valid.
	 */
	const hasValidConstraints = useMemo( () => {
		return isFinite( minConstraint ) && isFinite( maxConstraint );
	}, [ minConstraint, maxConstraint ] );

	/**
	 * Handles styles for the shaded area of the range slider.
	 */
	const progressStyles = useMemo( () => {
		if (
			! isFinite( minPrice ) ||
			! isFinite( maxPrice ) ||
			! hasValidConstraints
		) {
			return {
				'--low': '0%',
				'--high': '100%',
			};
		}

		// Normalize to whatever is the closest step (because range input will
		// only jump to the closest step in the range).
		const min = Math.round( minPrice / stepValue ) * stepValue;
		const max = Math.round( maxPrice / stepValue ) * stepValue;

		const low =
			Math.round(
				100 *
					( ( min - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) - 0.5;
		const high =
			Math.round(
				100 *
					( ( max - minConstraint ) /
						( maxConstraint - minConstraint ) )
			) + 0.5;

		return {
			'--low': low + '%',
			'--high': high + '%',
		};
	}, [
		minPrice,
		maxPrice,
		minConstraint,
		maxConstraint,
		hasValidConstraints,
		stepValue,
	] );

	/**
	 * Works around an IE issue where only one range selector is visible by changing the display order
	 * based on the mouse position.
	 *
	 * @param {Object} event event data.
	 */
	const findClosestRange = useCallback(
		( event ) => {
			if ( isLoading || ! hasValidConstraints ) {
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
		[ isLoading, maxConstraint, hasValidConstraints ]
	);

	/**
	 * Called when the slider is dragged.
	 *
	 * @param {Object} event Event object.
	 */
	const rangeInputOnChange = useCallback(
		( event ) => {
			const isMin = event.target.classList.contains(
				'wc-block-price-filter__range-input--min'
			);
			const targetValue = event.target.value;
			const currentValues = isMin
				? [ targetValue, maxPrice ]
				: [ minPrice, targetValue ];
			const values = constrainRangeSliderValues(
				currentValues,
				minConstraint,
				maxConstraint,
				stepValue,
				isMin
			);
			onChange( [
				parseInt( values[ 0 ], 10 ),
				parseInt( values[ 1 ], 10 ),
			] );
		},
		[ minPrice, maxPrice, minConstraint, maxConstraint, stepValue ]
	);

	/**
	 * Called when a price input loses focus - commit changes to slider.
	 *
	 * @param {Object} event Event object.
	 */
	const priceInputOnBlur = useCallback(
		( event ) => {
			// Only refresh when finished editing the min and max fields.
			if (
				event.relatedTarget &&
				event.relatedTarget.classList &&
				event.relatedTarget.classList.contains(
					'wc-block-price-filter__amount'
				)
			) {
				return;
			}
			const isMin = event.target.classList.contains(
				'wc-block-price-filter__amount--min'
			);
			const values = constrainRangeSliderValues(
				[
					minPriceInput * 10 ** decimalScale,
					maxPriceInput * 10 ** decimalScale,
				],
				minConstraint,
				maxConstraint,
				stepValue,
				isMin
			);
			onChange( [
				parseInt( values[ 0 ], 10 ),
				parseInt( values[ 1 ], 10 ),
			] );
		},
		[
			minConstraint,
			maxConstraint,
			stepValue,
			minPriceInput,
			maxPriceInput,
			decimalScale,
		]
	);

	const classes = classnames(
		'wc-block-price-filter',
		showInputFields && 'wc-block-price-filter--has-input-fields',
		showFilterButton && 'wc-block-price-filter--has-filter-button',
		isLoading && 'is-loading',
		! hasValidConstraints && 'is-disabled'
	);

	return (
		<div className={ classes }>
			<div
				className="wc-block-price-filter__range-input-wrapper"
				onMouseMove={ findClosestRange }
				onFocus={ findClosestRange }
			>
				{ hasValidConstraints && (
					<Fragment>
						<div
							className="wc-block-price-filter__range-input-progress"
							style={ progressStyles }
						/>
						<input
							type="range"
							className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min"
							aria-label={ __(
								'Filter products by minimum price',
								'woo-gutenberg-products-block'
							) }
							value={ minPrice || 0 }
							onChange={ rangeInputOnChange }
							step={ stepValue }
							min={ minConstraint }
							max={ maxConstraint }
							ref={ minRange }
							disabled={ isLoading }
						/>
						<input
							type="range"
							className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max"
							aria-label={ __(
								'Filter products by maximum price',
								'woo-gutenberg-products-block'
							) }
							value={ maxPrice || 0 }
							onChange={ rangeInputOnChange }
							step={ stepValue }
							min={ minConstraint }
							max={ maxConstraint }
							ref={ maxRange }
							disabled={ isLoading }
						/>
					</Fragment>
				) }
			</div>
			<div className="wc-block-price-filter__controls">
				{ showInputFields && (
					<Fragment>
						<NumberFormat
							displayType="input"
							thousandSeparator={ thousandSeparator }
							decimalSeparator={ decimalSeparator }
							decimalScale={ decimalScale }
							prefix={ prefix }
							suffix={ suffix }
							className="wc-block-price-filter__amount wc-block-price-filter__amount--min wc-block-form-text-input"
							aria-label={ __(
								'Filter products by minimum price',
								'woo-gutenberg-products-block'
							) }
							onValueChange={ ( values ) => {
								if ( values.value === minPriceInput ) {
									return;
								}
								setMinPriceInput( values.value );
							} }
							onBlur={ priceInputOnBlur }
							disabled={ isLoading || ! hasValidConstraints }
							value={ minPriceInput }
						/>
						<NumberFormat
							displayType="input"
							thousandSeparator={ thousandSeparator }
							decimalSeparator={ decimalSeparator }
							decimalScale={ decimalScale }
							prefix={ prefix }
							suffix={ suffix }
							className="wc-block-price-filter__amount wc-block-price-filter__amount--max wc-block-form-text-input"
							aria-label={ __(
								'Filter products by maximum price',
								'woo-gutenberg-products-block'
							) }
							onValueChange={ ( values ) => {
								if ( values.value === maxPriceInput ) {
									return;
								}
								setMaxPriceInput( values.value );
							} }
							onBlur={ priceInputOnBlur }
							disabled={ isLoading || ! hasValidConstraints }
							value={ maxPriceInput }
						/>
					</Fragment>
				) }
				{ ! showInputFields &&
					! isLoading &&
					Number.isFinite( minPrice ) &&
					Number.isFinite( maxPrice ) && (
						<div className="wc-block-price-filter__range-text">
							{ __( 'Price', 'woo-gutenberg-products-block' ) }:
							&nbsp;
							<NumberFormat
								displayType="text"
								thousandSeparator={ thousandSeparator }
								decimalSeparator={ decimalSeparator }
								decimalScale={ decimalScale }
								prefix={ prefix }
								suffix={ suffix }
								value={ minPrice / 10 ** decimalScale }
							/>
							&nbsp;&ndash;&nbsp;
							<NumberFormat
								displayType="text"
								thousandSeparator={ thousandSeparator }
								decimalSeparator={ decimalSeparator }
								decimalScale={ decimalScale }
								prefix={ prefix }
								suffix={ suffix }
								value={ maxPrice / 10 ** decimalScale }
							/>
						</div>
					) }
				{ showFilterButton && (
					<FilterSubmitButton
						className="wc-block-price-filter__button"
						disabled={ isLoading || ! hasValidConstraints }
						onClick={ onSubmit }
					/>
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
	 * Callback fired when the filter button is pressed.
	 */
	onSubmit: PropTypes.func,
	/**
	 * Min value.
	 */
	minPrice: PropTypes.number,
	/**
	 * Max value.
	 */
	maxPrice: PropTypes.number,
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
	 * Number formatting thousand separator.
	 */
	thousandSeparator: PropTypes.string,
	/**
	 * Number formatting decimal separator.
	 */
	decimalSeparator: PropTypes.string,
	/**
	 * Number formatting scale.
	 */
	decimalScale: PropTypes.number,
	/**
	 * Number formatting prefix.
	 */
	prefix: PropTypes.string,
	/**
	 * Number formatting suffix.
	 */
	suffix: PropTypes.string,
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

export default PriceSlider;
