/**
 * External dependencies
 */
import { BlockConfiguration } from '@wordpress/blocks';
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { registerFeaturePluginBlockType } from '@woocommerce/block-settings';
import type { LazyExoticComponent } from 'react';

/**
 * List of block areas where blocks can be registered for use. Keyed by area name.
 */
export type RegisteredBlocks = {
	totals: Array< string >;
	fields: Array< string >;
	contactInformation: Array< string >;
	shippingAddress: Array< string >;
	billingAddress: Array< string >;
	shippingMethods: Array< string >;
	paymentMethods: Array< string >;
};

let registeredBlocks: RegisteredBlocks = {
	totals: [],
	fields: [],
	contactInformation: [ 'core/paragraph' ],
	shippingAddress: [ 'core/paragraph' ],
	billingAddress: [ 'core/paragraph' ],
	shippingMethods: [ 'core/paragraph' ],
	paymentMethods: [ 'core/paragraph' ],
};

/**
 * Validation to ensure an area exists.
 */
const isValidArea = ( area: string ): boolean => {
	return registeredBlocks.hasOwnProperty( area );
};

/**
 * Adds a block (block name) to an area, if the area exists. If the area does not exist, an error is thrown.
 */
const registerBlockForArea = (
	area: keyof RegisteredBlocks,
	blockName: string
): void | Error => {
	if ( ! isValidArea( area ) ) {
		throw new Error(
			`Incorrect value for the "area" argument when registering the checkout block. It was a ${ area }, but must be one of ${ Object.keys(
				registeredBlocks
			).join( ', ' ) }.`
		);
	}
	registeredBlocks = {
		...registeredBlocks,
		[ area ]: [ ...registeredBlocks[ area ], blockName ],
	};
};

/**
 * Get a list of blocks available within a specific area.
 */
export const getRegisteredBlocks = (
	area: keyof RegisteredBlocks
): Array< string > => {
	if ( ! isValidArea( area ) ) {
		throw new Error(
			`Incorrect value for the "area" argument. It was a ${ area }, but must be one of ${ Object.keys(
				registeredBlocks
			).join( ', ' ) }.`
		);
	}
	return registeredBlocks[ area ];
};

export type CheckoutBlockOptions = {
	// This is a component to render on the frontend in place of this block, when used.
	component:
		| LazyExoticComponent< React.ComponentType< unknown > >
		| JSX.Element
		| null;
	// Area(s) to add the block to. This can be a single area (string) or an array of areas.
	areas: keyof RegisteredBlocks | Array< keyof RegisteredBlocks >;
	// Standard block configuration object. If not passed, the block will not be registered with WordPress and must be done manually.
	configuration?: BlockConfiguration;
};

/**
 * Main API for registering a new checkout block within areas.
 */
export const registerCheckoutBlock = (
	blockName: string,
	{ component = null, areas = [], configuration }: CheckoutBlockOptions
): void => {
	if ( configuration ) {
		registerFeaturePluginBlockType( blockName, {
			...configuration,
			category: 'woocommerce',
		} );
	}

	if ( Array.isArray( areas ) ) {
		areas.forEach( ( area ) => registerBlockForArea( area, blockName ) );
	} else {
		registerBlockForArea( areas, blockName );
	}

	registerBlockComponent( {
		blockName,
		component,
	} );
};
