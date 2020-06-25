/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from '@wordpress/element';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FormattedMonetaryAmount from '@woocommerce/base-components/formatted-monetary-amount';

/**
 * Internal dependencies
 */
import './style.scss';
import { constrainRangeSliderValues } from './constrain-range-slider-values';
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
	currency,
	showInputFields = true,
	showFilterButton = false,
	isLoading = false,
	onSubmit = () => {},
} ) => {
	const minRange = useRef( null );
	const maxRange = useRef( null );

	const minRangeValue = Number.isFinite( minPrice )
		? minPrice
		: minConstraint;
	const maxRangeValue = Number.isFinite( maxPrice )
		? maxPrice
		: maxConstraint;
	const stepValue = step ? step : 10 * 10 ** currency.minorUnit; // We want step to default to 10 major units, e.g. $10.
	const inputSize =
		( maxConstraint / 10 ** currency.minorUnit + '' ).length + 3;
	const hasValidConstraints =
		Number.isFinite( minConstraint ) && Number.isFinite( maxConstraint );

	const [ minPriceInput, setMinPriceInput ] = useState( minPrice );
	const [ maxPriceInput, setMaxPriceInput ] = useState( maxPrice );

	useEffect( () => {
		if ( minRange.current ) {
			minRange.current.value = minPrice;
		}
		setMinPriceInput( minPrice );
	}, [ minPrice ] );

	useEffect( () => {
		if ( maxRange.current ) {
			maxRange.current.value = maxPrice;
		}
		setMaxPriceInput( maxPrice );
	}, [ maxPrice ] );

	/**
	 * Handles styles for the shaded area of the range slider.
	 */
	const progressStyles = useMemo( () => {
		if (
			! Number.isFinite( minPrice ) ||
			! Number.isFinite( maxPrice ) ||
			! hasValidConstraints
		) {
			return {
				'--low': '0%',
				'--high': '100%',
			};
		}

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
	}, [
		minPrice,
		maxPrice,
		minConstraint,
		maxConstraint,
		hasValidConstraints,
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
			const currentMinRange = minRange.current;
			const currentMaxRange = maxRange.current;
			const bounds = event.target.getBoundingClientRect();
			const x = event.clientX - bounds.left;
			const minWidth = currentMinRange?.offsetWidth;
			const minValue = currentMinRange?.value;
			const maxWidth = currentMaxRange?.offsetWidth;
			const maxValue = currentMaxRange?.value;

			const minX = minWidth * ( minValue / maxConstraint );
			const maxX = maxWidth * ( maxValue / maxConstraint );

			const minXDiff = Math.abs( x - minX );
			const maxXDiff = Math.abs( x - maxX );

			/**
			 * The default z-index in the stylesheet as 20. 20 vs 21 is just for determining which range
			 * slider should be at the front and has no meaning beyond
			 */
			if ( minXDiff > maxXDiff ) {
				currentMinRange.style.zIndex = 20;
				currentMaxRange.style.zIndex = 21;
			} else {
				currentMinRange.style.zIndex = 21;
				currentMaxRange.style.zIndex = 20;
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
				? [
						Math.round( targetValue / stepValue ) * stepValue,
						maxPrice,
				  ]
				: [
						minPrice,
						Math.round( targetValue / stepValue ) * stepValue,
				  ];
			onChange(
				constrainRangeSliderValues(
					currentValues,
					minConstraint,
					maxConstraint,
					stepValue,
					isMin
				)
			);
		},
		[
			minPrice,
			maxPrice,
			minConstraint,
			maxConstraint,
			stepValue,
			onChange,
		]
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
			const [ minValue, maxValue ] = constrainRangeSliderValues(
				[ minPriceInput, maxPriceInput ],
				null,
				null,
				stepValue,
				isMin
			);

			// Update sliders.
			if ( minRange.current ) {
				minRange.current.value = minValue;
			}
			if ( minRange.current ) {
				maxRange.current.value = maxValue;
			}

			onChange( [ minValue, maxValue ] );
		},
		[ stepValue, minPriceInput, maxPriceInput, onChange ]
	);

	const classes = classnames(
		'wc-block-price-filter',
		'wc-block-components-price-slider',
		showInputFields && 'wc-block-price-filter--has-input-fields',
		showInputFields && 'wc-block-components-price-slider--has-input-fields',
		showFilterButton && 'wc-block-price-filter--has-filter-button',
		showFilterButton &&
			'wc-block-components-price-slider--has-filter-button',
		isLoading && 'is-loading',
		! hasValidConstraints && 'is-disabled'
	);

	return (
		<div className={ classes }>
			<div
				className="wc-block-price-filter__range-input-wrapper wc-block-components-price-slider__range-input-wrapper"
				onMouseMove={ findClosestRange }
				onFocus={ findClosestRange }
			>
				{ hasValidConstraints && (
					<div aria-hidden={ showInputFields }>
						<div
							className="wc-block-price-filter__range-input-progress wc-block-components-price-slider__range-input-progress"
							// @ts-ignore
							style={ progressStyles }
						/>
						<input
							type="range"
							className="wc-block-price-filter__range-input wc-block-price-filter__range-input--min wc-block-components-price-slider__range-input wc-block-components-price-slider__range-input--min"
							aria-label={ __(
								'Filter products by minimum price',
								'woo-gutenberg-products-block'
							) }
							aria-valuetext={
								minRangeValue / 10 ** currency.minorUnit + ''
							}
							onChange={ rangeInputOnChange }
							step={ stepValue }
							min={ minConstraint }
							max={ maxConstraint }
							ref={ minRange }
							disabled={ isLoading }
							tabIndex={ showInputFields ? -1 : 0 }
						/>
						<input
							type="range"
							className="wc-block-price-filter__range-input wc-block-price-filter__range-input--max wc-block-components-price-slider__range-input wc-block-components-price-slider__range-input--max"
							aria-label={ __(
								'Filter products by maximum price',
								'woo-gutenberg-products-block'
							) }
							aria-valuetext={
								maxRangeValue / 10 ** currency.minorUnit + ''
							}
							onChange={ rangeInputOnChange }
							step={ stepValue }
							min={ minConstraint }
							max={ maxConstraint }
							ref={ maxRange }
							disabled={ isLoading }
							tabIndex={ showInputFields ? -1 : 0 }
						/>
					</div>
				) }
			</div>
			<div className="wc-block-price-filter__controls wc-block-components-price-slider__controls">
				{ showInputFields && (
					<>
						<FormattedMonetaryAmount
							currency={ currency }
							displayType="input"
							className="wc-block-price-filter__amount wc-block-price-filter__amount--min wc-block-form-text-input wc-block-components-price-slider__amount wc-block-components-price-slider__amount--min"
							aria-label={ __(
								'Filter products by minimum price',
								'woo-gutenberg-products-block'
							) }
							onValueChange={ ( value ) => {
								if ( value === minPriceInput ) {
									return;
								}
								if ( ! Number.isFinite( value ) ) {
									value = 0;
								}
								setMinPriceInput( value );
							} }
							onBlur={ priceInputOnBlur }
							disabled={ isLoading || ! hasValidConstraints }
							value={ minPriceInput }
							size={ inputSize }
						/>
						<FormattedMonetaryAmount
							currency={ currency }
							displayType="input"
							className="wc-block-price-filter__amount wc-block-price-filter__amount--max wc-block-form-text-input wc-block-components-price-slider__amount wc-block-components-price-slider__amount--max"
							aria-label={ __(
								'Filter products by maximum price',
								'woo-gutenberg-products-block'
							) }
							onValueChange={ ( value ) => {
								if ( value === maxPriceInput ) {
									return;
								}
								if ( ! Number.isFinite( value ) ) {
									value = maxPriceInput;
								}
								setMaxPriceInput( value );
							} }
							onBlur={ priceInputOnBlur }
							disabled={ isLoading || ! hasValidConstraints }
							value={ maxPriceInput }
							size={ inputSize }
						/>
					</>
				) }
				{ ! showInputFields &&
					! isLoading &&
					Number.isFinite( minPrice ) &&
					Number.isFinite( maxPrice ) && (
						<div className="wc-block-price-filter__range-text wc-block-components-price-slider__range-text">
							{ __( 'Price', 'woo-gutenberg-products-block' ) }
							: &nbsp;
							<FormattedMonetaryAmount
								currency={ currency }
								displayType="text"
								value={ minPrice }
							/>
							&nbsp;&ndash;&nbsp;
							<FormattedMonetaryAmount
								currency={ currency }
								displayType="text"
								value={ maxPrice }
							/>
						</div>
					) }
				{ showFilterButton && (
					<FilterSubmitButton
						className="wc-block-price-filter__button wc-block-components-price-slider__button"
						disabled={ isLoading || ! hasValidConstraints }
						onClick={ onSubmit }
						screenReaderLabel={ __(
							'Apply price filter',
							'woo-gutenberg-products-block'
						) }
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
	 * Currency data used for formatting prices.
	 */
	currency: PropTypes.object.isRequired,
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
