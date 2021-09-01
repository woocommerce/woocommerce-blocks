/**
 * External dependencies
 */
import { BlockConfiguration } from '@wordpress/blocks';
import { registerBlockComponent } from '@woocommerce/blocks-registry';
import { registerExperimentalBlockType } from '@woocommerce/block-settings';
import type { LazyExoticComponent } from 'react';
import { isObject } from '@woocommerce/types';

export enum InnerBlockAreas {
	CHECKOUT_FIELDS = 'woocommerce/checkout-fields-block',
	CHECKOUT_TOTALS = 'woocommerce/checkout-totals-block',
	CONTACT_INFORMATION = 'woocommerce/checkout-contact-information-block',
	SHIPPING_ADDRESS = 'woocommerce/checkout-shipping-address-block',
	BILLING_ADDRESS = 'woocommerce/checkout-billing-address-block',
	SHIPPING_METHODS = 'woocommerce/checkout-shipping-methods-block',
	PAYMENT_METHODS = 'woocommerce/checkout-payment-methods-block',
}

/**
 * List of block areas where blocks can be registered for use. Keyed by area name.
 */
export type RegisteredBlocks = Record< InnerBlockAreas, Array< string > >;
export type RegisteredForcedComponents = Record<
	InnerBlockAreas,
	Array< string >
>;

let registeredBlocks: RegisteredBlocks = {
	'woocommerce/checkout-fields-block': [],
	'woocommerce/checkout-totals-block': [],
	'woocommerce/checkout-contact-information-block': [ 'core/paragraph' ],
	'woocommerce/checkout-shipping-address-block': [ 'core/paragraph' ],
	'woocommerce/checkout-billing-address-block': [ 'core/paragraph' ],
	'woocommerce/checkout-shipping-methods-block': [ 'core/paragraph' ],
	'woocommerce/checkout-payment-methods-block': [ 'core/paragraph' ],
};

let registeredForcedComponents: RegisteredForcedComponents = {
	'woocommerce/checkout-fields-block': [],
	'woocommerce/checkout-totals-block': [],
	'woocommerce/checkout-contact-information-block': [],
	'woocommerce/checkout-shipping-address-block': [],
	'woocommerce/checkout-billing-address-block': [],
	'woocommerce/checkout-shipping-methods-block': [],
	'woocommerce/checkout-payment-methods-block': [],
};

/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
const assertType = (
	optionName: string,
	option: unknown,
	expectedType: unknown
): void => {
	const actualType = typeof option;
	if ( actualType !== expectedType ) {
		throw new Error(
			`Incorrect value for the ${ optionName } argument when registering a checkout block. It was a ${ actualType }, but must be a ${ expectedType }.`
		);
	}
};

/**
 * Validation to ensure an area exists.
 */
const assertValidArea = ( area: string ): void => {
	if (
		! Object.values( InnerBlockAreas ).includes( area as InnerBlockAreas )
	) {
		throw new Error(
			`Incorrect value for the "area" argument. It was a ${ area }, but must be one of ${ Object.keys(
				registeredBlocks
			).join( ', ' ) }.`
		);
	}
};

/**
 * Validate the block name.
 *
 * @throws Will throw an error if the block name is invalid.
 */
const assertBlockName = ( blockName: string ): void => {
	assertType( 'blockName', blockName, 'string' );

	if ( ! blockName ) {
		throw new Error(
			`Value for the blockName argument must not be empty.`
		);
	}
};

/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
const assertOption = (
	options: Record< string, unknown >,
	optionName: string,
	expectedType: 'array' | 'object' | 'string' | 'boolean' | 'number'
): void => {
	const actualType = typeof options[ optionName ];

	if ( expectedType === 'array' ) {
		if ( ! Array.isArray( options[ optionName ] ) ) {
			throw new Error(
				`Incorrect value for the ${ optionName } argument when registering a checkout block component. It was a ${ actualType }, but must be an array.`
			);
		}
	} else if ( actualType !== expectedType ) {
		throw new Error(
			`Incorrect value for the ${ optionName } argument when registering a checkout block component. It was a ${ actualType }, but must be a ${ expectedType }.`
		);
	}
};

/**
 * Asserts that an option is a valid react element or lazy callback. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
const assertBlockComponent = (
	options: Record< string, unknown >,
	optionName: string
) => {
	const optionValue = options[ optionName ];

	if ( optionValue ) {
		if ( typeof optionValue === 'function' ) {
			return;
		}
		if (
			isObject( optionValue ) &&
			optionValue.$$typeof &&
			optionValue.$$typeof === Symbol.for( 'react.lazy' )
		) {
			return;
		}
	}
	throw new Error(
		`Incorrect value for the ${ optionName } argument when registering a block component. Component must be a valid React Element or Lazy callback.`
	);
};

/**
 * Adds a block (block name) to an area, if the area exists. If the area does not exist, an error is thrown.
 */
const registerBlockForArea = (
	area: InnerBlockAreas,
	blockName: string
): void | Error => {
	assertValidArea( area );
	registeredBlocks = {
		...registeredBlocks,
		[ area ]: [ ...registeredBlocks[ area ], blockName ],
	};
};

/**
 * Adds a component to an area, if the area exists. If the area does not exist, an error is thrown.
 */
const registerForcedComponent = (
	area: InnerBlockAreas,
	component: string
): void | Error => {
	assertValidArea( area );
	registeredForcedComponents = {
		...registeredForcedComponents,
		[ area ]: [ ...registeredForcedComponents[ area ], component ],
	};
};

/**
 * Check area is valid.
 */
export const isInnerBlockArea = ( area: string ): area is InnerBlockAreas => {
	return Object.values( InnerBlockAreas ).includes( area as InnerBlockAreas );
};

/**
 * Get a list of blocks available within a specific area.
 */
export const getRegisteredBlocks = (
	area: InnerBlockAreas
): Array< string > => {
	return isInnerBlockArea( area ) ? [ ...registeredBlocks[ area ] ] : [];
};

/**
 * Get a list of blocks available within a specific area.
 */
export const getRegisteredForcedComponents = (
	area: InnerBlockAreas
): Array< string > => {
	return isInnerBlockArea( area )
		? [ ...registeredForcedComponents[ area ] ]
		: [];
};

export type CheckoutBlockOptions = {
	// This is a component to render on the frontend in place of this block, when used.
	component:
		| LazyExoticComponent< React.ComponentType< unknown > >
		| ( () => JSX.Element );
	// Area(s) to add the block to. This can be a single area (string) or an array of areas.
	areas: Array< InnerBlockAreas >;
	// Should this block be forced? If true, it cannot be removed from the editor interface, and will be rendered in defined areas automatically.
	force?: boolean;
	// Standard block configuration object. If not passed, the block will not be registered with WordPress and must be done manually.
	configuration?: BlockConfiguration;
};

/**
 * Main API for registering a new checkout block within areas.
 */
export const registerCheckoutBlock = (
	blockName: string,
	options: CheckoutBlockOptions
): void => {
	assertBlockName( blockName );
	assertOption( options, 'areas', 'array' );
	assertBlockComponent( options, 'component' );

	/**
	 * This ensures the frontend component for the checkout block is available.
	 */
	registerBlockComponent( {
		blockName,
		component: options.component,
	} );

	/**
	 * If provided with a configuration object, this registers the block with WordPress.
	 */
	if ( options?.configuration ) {
		assertOption( options, 'configuration', 'object' );
		registerExperimentalBlockType( blockName, {
			...options.configuration,
			attributes: {
				...( options.configuration?.attributes || {} ),
				...( options.force
					? {
							lock: {
								type: 'object',
								default: {
									remove: true,
								},
							},
					  }
					: {} ),
			},
			category: 'woocommerce',
			parent: [],
		} );
	}

	/**
	 * This enables the inner block within specific areas. See RegisteredBlocks.
	 */
	options.areas.forEach( ( area ) => {
		registerBlockForArea( area, blockName );
		registerForcedComponent( area, blockName );
	} );
};
