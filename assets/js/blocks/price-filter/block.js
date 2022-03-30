/**
 * External dependencies
 */
import { usePrevious } from '@woocommerce/base-hooks';
import {
	useQueryStateByKey,
	useQueryStateByContext,
	useCollectionData,
} from '@woocommerce/base-context/hooks';
import { useCallback, useState, useEffect } from '@wordpress/element';
import PriceSlider from '@woocommerce/base-components/price-slider';
import { useDebouncedCallback } from 'use-debounce';
import PropTypes from 'prop-types';
import { getCurrencyFromPriceResponse } from '@woocommerce/price-format';
import { getSetting } from '@woocommerce/settings';

/**
 * Internal dependencies
 */
import usePriceConstraints from './use-price-constraints.js';
import './style.scss';

function findGetParameter( paramName ) {
	const url = new URL( window.location );
	const params = new URLSearchParams( url.search );

	return params.get( paramName );
}

function formatParams( url, paramSettings ) {
	const params = new URLSearchParams( url.search );
	const keys = Object.keys( paramSettings );

	for ( let i = 0; keys.length > i; i++ ) {
		const { value, constraint } = paramSettings[ keys[ i ] ];
		if ( value === constraint ) {
			params.delete( keys[ i ] );
		} else {
			params.set( keys[ i ], value / 100 );
		}
	}

	return params.toString();
}

/**
 * Component displaying a price filter.
 *
 * @param {Object} props Component props.
 * @param {Object} props.attributes Incoming block attributes.
 * @param {boolean} props.isEditor Whether in editor context or not.
 */
const PriceFilterBlock = ( { attributes, isEditor = false } ) => {
	const filteringForPhpTemplate = getSetting(
		'is_rendering_php_template',
		''
	);

	const [ minPriceQuery, setMinPriceQuery ] = useQueryStateByKey(
		'min_price',
		findGetParameter( 'min_price' ) * 100 || null
	);
	const [ maxPriceQuery, setMaxPriceQuery ] = useQueryStateByKey(
		'max_price',
		findGetParameter( 'max_price' ) * 100 || null
	);
	const [ queryState ] = useQueryStateByContext();
	const { results, isLoading } = useCollectionData( {
		queryPrices: true,
		queryState,
	} );

	const [ minPrice, setMinPrice ] = useState(
		findGetParameter( 'min_price' ) * 100 || null
	);
	const [ maxPrice, setMaxPrice ] = useState(
		findGetParameter( 'max_price' ) * 100 || null
	);

	const currency = getCurrencyFromPriceResponse( results.price_range );

	const { minConstraint, maxConstraint } = usePriceConstraints( {
		minPrice: results.price_range
			? results.price_range.min_price
			: undefined,
		maxPrice: results.price_range
			? results.price_range.max_price
			: undefined,
		minorUnit: currency.minorUnit,
	} );

	// Updates the query based on slider values.
	const onSubmit = useCallback(
		( newMinPrice, newMaxPrice ) => {
			if ( filteringForPhpTemplate ) {
				const url = new URL( window.location );
				const currentParams = new URLSearchParams( url.search );
				const newParams = formatParams( url, {
					max_price: {
						value: newMaxPrice,
						constraint: maxConstraint,
					},
					min_price: {
						value: newMinPrice,
						constraint: minConstraint,
					},
				} );

				if ( currentParams.toString() !== newParams ) {
					window.location =
						url.origin + url.pathname + '?' + newParams;
				}
			} else {
				setMinPriceQuery(
					newMinPrice === minConstraint ? undefined : newMinPrice
				);
				setMaxPriceQuery(
					newMaxPrice === maxConstraint ? undefined : newMaxPrice
				);
			}
		},
		[ minConstraint, maxConstraint, setMinPriceQuery, setMaxPriceQuery, filteringForPhpTemplate ]
	);

	// Updates the query after a short delay.
	const debouncedUpdateQuery = useDebouncedCallback( onSubmit, 500 );

	// Callback when slider or input fields are changed.
	const onChange = useCallback(
		( prices ) => {
			if ( prices[ 0 ] !== minPrice ) {
				setMinPrice( prices[ 0 ] );
			}
			if ( prices[ 1 ] !== maxPrice ) {
				setMaxPrice( prices[ 1 ] );
			}
		},
		[ minPrice, maxPrice, setMinPrice, setMaxPrice ]
	);

	// Track price STATE changes - if state changes, update the query.
	useEffect( () => {
		if ( ! attributes.showFilterButton ) {
			debouncedUpdateQuery( minPrice, maxPrice );
		}
	}, [
		minPrice,
		maxPrice,
		attributes.showFilterButton,
		debouncedUpdateQuery,
	] );

	// Track price query/price constraint changes so the slider reflects current filters.
	const previousMinPriceQuery = usePrevious( minPriceQuery );
	const previousMaxPriceQuery = usePrevious( maxPriceQuery );
	const previousMinConstraint = usePrevious( minConstraint );
	const previousMaxConstraint = usePrevious( maxConstraint );
	useEffect( () => {
		if (
			! Number.isFinite( minPrice ) ||
			( minPriceQuery !== previousMinPriceQuery && // minPrice from query changed
				minPriceQuery !== minPrice ) || // minPrice from query doesn't match the UI min price
			( minConstraint !== previousMinConstraint && // minPrice from query changed
				minConstraint !== minPrice ) // minPrice from query doesn't match the UI min price
		) {
			setMinPrice(
				Number.isFinite( minPriceQuery ) ? minPriceQuery : minConstraint
			);
		}
		if (
			! Number.isFinite( maxPrice ) ||
			( maxPriceQuery !== previousMaxPriceQuery && // maxPrice from query changed
				maxPriceQuery !== maxPrice ) || // maxPrice from query doesn't match the UI max price
			( maxConstraint !== previousMaxConstraint && // maxPrice from query changed
				maxConstraint !== maxPrice ) // maxPrice from query doesn't match the UI max price
		) {
			setMaxPrice(
				Number.isFinite( maxPriceQuery ) ? maxPriceQuery : maxConstraint
			);
		}
	}, [
		minPrice,
		maxPrice,
		minPriceQuery,
		maxPriceQuery,
		minConstraint,
		maxConstraint,
		previousMinConstraint,
		previousMaxConstraint,
		previousMinPriceQuery,
		previousMaxPriceQuery,
	] );

	if (
		! isLoading &&
		( minConstraint === null ||
			maxConstraint === null ||
			minConstraint === maxConstraint )
	) {
		return null;
	}

	const TagName = `h${ attributes.headingLevel }`;

	return (
		<>
			{ ! isEditor && attributes.heading && (
				<TagName className="wc-block-price-filter__title">
					{ attributes.heading }
				</TagName>
			) }
			<div className="wc-block-price-slider">
				<PriceSlider
					minConstraint={ minConstraint }
					maxConstraint={ maxConstraint }
					minPrice={ minPrice }
					maxPrice={ maxPrice }
					currency={ currency }
					showInputFields={ attributes.showInputFields }
					showFilterButton={ attributes.showFilterButton }
					onChange={ onChange }
					onSubmit={ () => onSubmit( minPrice, maxPrice ) }
					isLoading={ isLoading }
				/>
			</div>
		</>
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
