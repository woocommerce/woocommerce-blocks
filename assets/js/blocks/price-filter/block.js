/**
 * External dependencies
 */
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-hooks';
import { Fragment, useCallback, useState, useEffect } from '@wordpress/element';
import PriceSlider from '@woocommerce/base-components/price-slider';
import { useDebouncedCallback } from 'use-debounce';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import usePriceConstraints from './use-price-constraints.js';

/**
 * Component displaying a price filter.
 *
 * @param {Object} props Component props.
 */
const PriceFilterBlock = ( { attributes, isEditor = false } ) => {
	const [ minPriceQuery, setMinPriceQuery ] = useQueryStateByKey(
		'min_price'
	);
	const [ maxPriceQuery, setMaxPriceQuery ] = useQueryStateByKey(
		'max_price'
	);
	const [ queryState ] = useQueryStateByContext();
	const { results, isLoading } = useCollectionData( {
		queryPrices: true,
		queryState,
	} );

	const [ minPrice, setMinPrice ] = useState();
	const [ maxPrice, setMaxPrice ] = useState();

	const priceRangeData =
		typeof results.price_range !== 'object'
			? {
					currency_code: 'USD',
					currency_symbol: '$',
					currency_minor_unit: 2,
					currency_decimal_separator: '.',
					currency_thousand_separator: ',',
					currency_prefix: '$',
					currency_suffix: '',
					min_price: undefined,
					max_price: undefined,
			  }
			: results.price_range;

	const { minConstraint, maxConstraint } = usePriceConstraints( {
		minPrice: priceRangeData.min_price,
		maxPrice: priceRangeData.max_price,
	} );

	// Updates the query after a short delay.
	const [ debouncedUpdateQuery ] = useDebouncedCallback( () => {
		onSubmit();
	}, 500 );

	// Updates the query based on slider values.
	const onSubmit = useCallback( () => {
		setMinPriceQuery( minPrice === minConstraint ? undefined : minPrice );
		setMaxPriceQuery( maxPrice === maxConstraint ? undefined : maxPrice );
	}, [ minPrice, maxPrice, minConstraint, maxConstraint ] );

	// Callback when slider is changed.
	const onChange = useCallback(
		( prices ) => {
			if ( prices[ 0 ] !== minPrice ) {
				setMinPrice( prices[ 0 ] );
			}
			if ( prices[ 1 ] !== maxPrice ) {
				setMaxPrice( prices[ 1 ] );
			}
		},
		[ minConstraint, maxConstraint, minPrice, maxPrice ]
	);

	// Track price STATE changes - if state changes, update the query.
	useEffect( () => {
		if ( ! attributes.showFilterButton ) {
			debouncedUpdateQuery();
		}
	}, [ minPrice, maxPrice, attributes.showFilterButton ] );

	// Track PRICE QUERY changes so the slider reflects current filters.
	useEffect( () => {
		if ( minPriceQuery !== minPrice ) {
			setMinPrice(
				Number.isFinite( minPriceQuery ) ? minPriceQuery : minConstraint
			);
		}
		if ( maxPriceQuery !== maxPrice ) {
			setMaxPrice(
				Number.isFinite( maxPriceQuery ) ? maxPriceQuery : maxConstraint
			);
		}
	}, [ minPriceQuery, maxPriceQuery, minConstraint, maxConstraint ] );

	if (
		! isLoading &&
		( minConstraint === null ||
			maxConstraint === null ||
			minConstraint === maxConstraint )
	) {
		return null;
	}

	const TagName = `h${ attributes.headingLevel }`;
	const min = Math.max(
		Number.isFinite( minPrice ) ? minPrice : -Infinity,
		Number.isFinite( minConstraint ) ? minConstraint : -Infinity
	);
	const max = Math.min(
		Number.isFinite( maxPrice ) ? maxPrice : Infinity,
		Number.isFinite( maxConstraint ) ? maxConstraint : Infinity
	);

	return (
		<Fragment>
			{ ! isEditor && attributes.heading && (
				<TagName>{ attributes.heading }</TagName>
			) }
			<div className="wc-block-price-slider">
				<PriceSlider
					minConstraint={ minConstraint }
					maxConstraint={ maxConstraint }
					minPrice={ min }
					maxPrice={ max }
					step={ 10 ** priceRangeData.currency_minor_unit }
					thousandSeparator={
						priceRangeData.currency_thousand_separator
					}
					decimalSeparator={
						priceRangeData.currency_decimal_separator
					}
					decimalScale={ priceRangeData.currency_minor_unit }
					prefix={ priceRangeData.currency_prefix }
					suffix={ priceRangeData.currency_suffix }
					showInputFields={ attributes.showInputFields }
					showFilterButton={ attributes.showFilterButton }
					onChange={ onChange }
					onSubmit={ onSubmit }
					isLoading={ isLoading }
				/>
			</div>
		</Fragment>
	);
};

PriceFilterBlock.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * Whether it's in the editor or frontend display.
	 */
	isEditor: PropTypes.bool,
};

export default PriceFilterBlock;
