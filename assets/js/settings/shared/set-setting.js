import { allSettings } from './settings-init';

/**
 * Sets a value to a property on the settings state.
 *
 * @export
 * @param {string}   name                        The setting property key for the
 *                                               setting being mutated.
 * @param {mixed}    value                       The value to set.
 * @param {function} [validation=( val ) => val] Allows for providing a callback
 *                                               to validate/sanitize the
 *                                               setting
 */
export function setSetting( name, value, validation = ( val ) => val ) {
	value = validation( value );
	allSettings[ name ] = validation( value );
}
