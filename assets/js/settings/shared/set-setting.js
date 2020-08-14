/**
 * Internal dependencies
 */
import { allSettings } from './settings-init';

/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * Sets a value to a property on the settings state.
 *
 * @export
 * @param {string}   name                        The setting property key for the
 *                                               setting being mutated.
 * @param {*}    value                       The value to set.
 * @param {Function} [filter=( val ) => val]     Allows for providing a callback
 *                                               to sanitize the setting (eg.
 *                                               ensure it's a number)
 */
export function setSetting( name, value, filter = ( val ) => val ) {
	deprecated( 'setSetting', {
		version: '3.8.0',
		alternative: 'a locally scoped value instead',
		plugin: 'WooCommerce Blocks',
		hint:
			'wc.wcSettings is a global settings configuration object that should not be mutated during a session. Hence the removal of this function.',
	} );
	allSettings[ name ] = filter( value );
}
