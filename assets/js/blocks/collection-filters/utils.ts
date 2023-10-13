/**
 * External dependencies
 */
import {
	formatPrice,
	getCurrency,
	getCurrencyFromPriceResponse,
} from '@woocommerce/price-format';
import {
	objectHasProp,
	CurrencyResponse,
	Currency,
	isString,
} from '@woocommerce/types';

const formatPriceInt = ( price: string | number, currency: Currency ) => {
	const priceInt = typeof price === 'number' ? price : parseInt( price, 10 );
	return priceInt / 10 ** currency.minorUnit;
};

export function getFormattedPrice( results: unknown[] ) {
	const currencyWithoutDecimal = getCurrency( { minorUnit: 0 } );

	if ( ! objectHasProp( results, 'price_range' ) ) {
		return {
			minPrice: 0,
			maxPrice: 0,
			minRange: 0,
			maxRange: 0,
			formattedMinPrice: formatPrice( 0, currencyWithoutDecimal ),
			formattedMaxPrice: formatPrice( 0, currencyWithoutDecimal ),
		};
	}

	const currency = getCurrencyFromPriceResponse(
		results.price_range as CurrencyResponse
	);

	const minPrice =
		objectHasProp( results.price_range, 'min_price' ) &&
		isString( results.price_range.min_price )
			? formatPriceInt( results.price_range.min_price, currency )
			: 0;
	const maxPrice =
		objectHasProp( results.price_range, 'max_price' ) &&
		isString( results.price_range.max_price )
			? formatPriceInt( results.price_range.max_price, currency )
			: 0;

	return {
		minPrice,
		maxPrice,
		minRange: minPrice,
		maxRange: maxPrice,
		formattedMinPrice: formatPrice( minPrice, currencyWithoutDecimal ),
		formattedMaxPrice: formatPrice( maxPrice, currencyWithoutDecimal ),
	};
}

export function getFilterData( collectionData ) {
	return getFormattedPrice( collectionData );
}

function getInnerBlocksName( block ) {
	return block.innerBlocks.reduce( ( acc, innerBlock ) => {
		return acc.concat( innerBlock.name, getInnerBlocksName( innerBlock ) );
	}, [] );
}

export function getQueryParams( block ) {
	const innerBlocksName = getInnerBlocksName( block );
	const map = {
		queryPrices: 'woocommerce/collection-price-filter',
		queryAttributes: 'woocommerce/collection-attribute-filter',
		queryStock: 'woocommerce/collection-stock-filter',
		queryRating: 'woocommerce/collection-rating-filter',
	};

	return Object.entries( map ).reduce( ( acc, [ key, value ] ) => {
		acc[ key ] = innerBlocksName.some( ( name ) => name.includes( value ) );
		return acc;
	}, {} );
}
