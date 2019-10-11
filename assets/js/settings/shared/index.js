/**
 * Internal dependencies
 */
import { getSetting } from './get-setting';

/**
 * External dependencies
 */
import compareVersions from 'compare-versions';

export * from './default-constants';
export { setSetting } from './set-setting';

/**
 * Note: this attempts to coerce the wp_version to a semver for comparison
 * This will result in dropping any beta/rc values.
 *
 * `5.3-beta1-4252` would get converted to `5.3.0-rc.4252`
 * `5.3-beta1` would get converted to `5.3.0-rc`.
 * `5.3` would not be touched.
 *
 * For the purpose of these comparisons all pre-release versions are normalized
 * to `rc`.
 */
export const compareWithWpVersion = ( version, operator ) => {
	let replacement = getSetting( 'wp_version', '' ).replace(
		/-[a-zA-Z0-9]*[\-]*/,
		'.0-rc.'
	);
	replacement = replacement.endsWith( '.' )
		? replacement.substring( 0, replacement.length - 1 )
		: replacement;
	return compareVersions.compare( version, replacement, operator );
};

export { compareVersions, getSetting };
