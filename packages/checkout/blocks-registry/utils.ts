/**
 * External dependencies
 */
import { isObject } from '@woocommerce/types';

/**
 * Asserts that an option is of the given type. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
export const assertType = (
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
 * Validate the block name.
 *
 * @throws Will throw an error if the block name is invalid.
 */
export const assertBlockName = ( blockName: string ): void => {
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
 * @param {Object} options      Object containing the option to validate.
 * @param {string} optionName   Name of the option to validate.
 * @param {string} expectedType Type expected for the option.
 */
export const assertOption = (
	options: unknown,
	optionName: string,
	expectedType: string
): void => {
	if ( ! isObject( options ) ) {
		return;
	}
	const actualType = typeof options[ optionName ];
	if ( actualType !== expectedType ) {
		throw new Error(
			`Incorrect value for the ${ optionName } argument when registering a block component. It was a ${ actualType }, but must be a ${ expectedType }.`
		);
	}
};

/**
 * Asserts that an option is a valid react element or lazy callback. Otherwise, throws an error.
 *
 * @throws Will throw an error if the type of the option doesn't match the expected type.
 */
export const assertBlockComponent = (
	options: Record< string, unknown >,
	optionName: string
): void => {
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
