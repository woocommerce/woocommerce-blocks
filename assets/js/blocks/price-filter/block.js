/**
 * External dependencies
 */
import {
	useCollection,
	useQueryStateByKey,
	useQueryStateByContext,
} from '@woocommerce/base-hooks';
import { useCallback, useState, useEffect } from '@wordpress/element';
import PriceSlider from '@woocommerce/base-components/price-slider';
import { CURRENCY } from '@woocommerce/settings';
import { useDebouncedCallback } from 'use-debounce';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * Component displaying a price filter.
 */
const PriceFilterBlock = ( { attributes, isPreview = false } ) => {
	const [ minPriceQuery, setMinPriceQuery ] = useQueryStateByKey(
		'min_price'
	);
	const [ maxPriceQuery, setMaxPriceQuery ] = useQueryStateByKey(
		'max_price'
	);
	const [ queryState ] = useQueryStateByContext();
	const { results, isLoading } = useCollection( {
		namespace: '/wc/store',
		resourceName: 'products/collection-data',
		query: {
			...queryState,
			min_price: undefined,
			max_price: undefined,
			orderby: undefined,
			order: undefined,
			per_page: undefined,
			page: undefined,
			calculate_price_range: true,
		},
	} );

	const [ minPrice, setMinPrice ] = useState();
	const [ maxPrice, setMaxPrice ] = useState();

	const minConstraint = isNaN( results.min_price )
		? null
		: Math.floor( parseInt( results.min_price, 10 ) / 10 ) * 10;
	const maxConstraint = isNaN( results.max_price )
		? null
		: Math.ceil( parseInt( results.max_price, 10 ) / 10 ) * 10;

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
		debouncedUpdateQuery();
	}, [ minPrice, maxPrice ] );

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
	const min = Number.isFinite( minConstraint )
		? Math.max( minPrice, minConstraint )
		: minPrice;
	const max = Number.isFinite( maxConstraint )
		? Math.min( maxPrice, maxConstraint )
		: maxPrice;

	return (
		<BlockErrorBoundary>
			{ ! isPreview && attributes.heading && (
				<TagName>{ attributes.heading }</TagName>
			) }
			<div className="wc-block-price-slider">
				<PriceSlider
					minConstraint={ minConstraint }
					maxConstraint={ maxConstraint }
					minPrice={ min }
					maxPrice={ max }
					step={ 10 }
					currencySymbol={ CURRENCY.symbol }
					priceFormat={ CURRENCY.price_format }
					showInputFields={ attributes.showInputFields }
					showFilterButton={ attributes.showFilterButton }
					onChange={ onChange }
					onSubmit={ onSubmit }
					isLoading={ isLoading }
				/>
			</div>
		</BlockErrorBoundary>
	);
};

export default PriceFilterBlock;
