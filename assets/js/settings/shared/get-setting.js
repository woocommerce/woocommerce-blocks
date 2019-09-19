/**
 * Internal dependencies
 */
import { allSettings } from './settings-init';

/**
 * Retrieves a setting value from the setting state.
 *
 * @export
 * @param {string} name                               The identifier for the
 *                                                    setting.
 * @param {mixed}  [fallback=false]                   The value to use as a
 *                                                    fallback if the setting is
 *                                                    not in the state.
 * @param {function} [validation=( value ) => value]  A callback to use for
 *                                                    validating or sanitizing
 *                                                    the setting value.
 * @returns {mixed}
 */
export function getSetting(
	name,
	fallback = false,
	validation = ( value ) => value
) {
	const value = allSettings.hasOwnProperty( name )
		? allSettings[ name ]
		: fallback;
	return validation( value );
}
