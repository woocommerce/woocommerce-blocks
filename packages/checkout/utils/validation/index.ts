/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

/**
 * Ensures that a given value contains a string, or throws an error.
 */
export const mustContain = (
	value: string,
	requiredValue: string
): true | Error => {
	if ( ! value.includes( requiredValue ) ) {
		throw Error(
			sprintf(
				/* translators: %1$s value passed to filter, %2$s : value that must be included. */
				__(
					'Returned value must include %1$s, you passed "%2$s"',
					'woo-gutenberg-products-block'
				),
				value,
				requiredValue
			)
		);
	}
	return true;
};
