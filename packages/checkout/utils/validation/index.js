/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

export const mustBeString = ( value ) => {
	if ( typeof value !== 'string' ) {
		throw Error(
			sprintf(
				// translators: %s is type of value passed
				__(
					'Returned value must be a string, you passed "%s"',
					'woo-gutenberg-products-block'
				),
				typeof value
			)
		);
	}
	return true;
};

export const mustContain = ( value, label ) => {
	if ( ! value.includes( label ) ) {
		throw Error(
			sprintf(
				// translators: %s value passed to filter.
				__(
					'Returned value must include <price/>, you passed "%s"',
					'woo-gutenberg-products-block'
				),
				value
			)
		);
	}
	return true;
};
