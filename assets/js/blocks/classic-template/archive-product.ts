/**
 * External dependencies
 */
import {
	getBlockType,
	createBlock,
	createBlocksFromInnerBlocksTemplate,
	type BlockInstance,
} from '@wordpress/blocks';
import { isWpVersion } from '@woocommerce/settings';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE as productsInnerBlocksTemplate,
	QUERY_DEFAULT_ATTRIBUTES as productsQueryDefaultAttributes,
} from '../product-query/constants';
import { VARIATION_NAME as productsVariationName } from '../product-query/variations/product-query';
import { type InheritedAttributes } from './types';

const createRowBlock = (
	innerBlocks: Array< BlockInstance >,
	inheritedAttributes: InheritedAttributes
) => {
	const rowVariationName = `group-row`;
	const groupBlockVariations = getBlockType( 'core/group' )?.variations || [];
	const rowVariation = groupBlockVariations.find(
		( { name }: { name: string } ) => name === rowVariationName
	);

	if ( ! rowVariation ) {
		return null;
	}

	const { attributes } = rowVariation;
	const extendedAttributes = {
		...attributes,
		...inheritedAttributes,
		layout: {
			...attributes.layout,
			justifyContent: 'space-between',
		},
	};

	return createBlock( `core/group`, extendedAttributes, innerBlocks );
};

const createProductsBlock = ( inheritedAttributes: InheritedAttributes ) =>
	createBlock(
		'core/query',
		{
			...productsQueryDefaultAttributes,
			...inheritedAttributes,
			namespace: productsVariationName,
		},
		createBlocksFromInnerBlocksTemplate( productsInnerBlocksTemplate )
	);

const getBlockifiedTemplate = ( inheritedAttributes: InheritedAttributes ) =>
	[
		createBlock( 'woocommerce/store-notices', inheritedAttributes ),
		createRowBlock(
			[
				createBlock( 'woocommerce/product-results-count' ),
				createBlock( 'woocommerce/catalog-sorting' ),
			],
			inheritedAttributes
		),
		createProductsBlock( inheritedAttributes ),
	].filter( Boolean ) as BlockInstance[];

const isConversionPossible = () => {
	// Blockification is possible for the WP version 6.1 and above,
	// which are the versions the Products block supports.
	return isWpVersion( '6.1', '>=' );
};

const getDescriptionAllowingConversion = ( templateTitle: string ) =>
	sprintf(
		/* translators: %s is the template title */
		__(
			"This block serves as a placeholder for your %s. We recommend upgrading to the Products block for more features to edit your products visually. Don't worry, you can always revert back.",
			'woo-gutenberg-products-block'
		),
		templateTitle
	);

const getDescriptionDisallowingConversion = ( templateTitle: string ) =>
	sprintf(
		/* translators: %s is the template title */
		__(
			'This block serves as a placeholder for your %s. It will display the actual product image, title, price in your store. You can move this placeholder around and add more blocks around to customize the template.',
			'woo-gutenberg-products-block'
		),
		templateTitle
	);

const getDescription = ( templateTitle: string, canConvert: boolean ) => {
	if ( canConvert ) {
		return getDescriptionAllowingConversion( templateTitle );
	}

	return getDescriptionDisallowingConversion( templateTitle );
};

const getButtonLabel = () =>
	__( 'Upgrade to Products block', 'woo-gutenberg-products-block' );

export {
	getBlockifiedTemplate,
	isConversionPossible,
	getDescription,
	getButtonLabel,
};
