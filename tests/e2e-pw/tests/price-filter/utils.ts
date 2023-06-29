/**
 * External dependencies
 */
import { Locator } from '@playwright/test';

export const getMinMaxPriceInputs = async ( {
	blockName,
	getBlockByName,
}: {
	blockName: string;
	getBlockByName: ( blockName: string ) => Promise< Locator >;
} ) => {
	const priceFilterBlock = await getBlockByName( blockName );

	const maxPriceInput = await priceFilterBlock.locator(
		'.wc-block-price-filter__amount--max'
	);

	const minPriceInput = await priceFilterBlock.locator(
		'.wc-block-price-filter__amount--min'
	);

	return { maxPriceInput, minPriceInput };
};
