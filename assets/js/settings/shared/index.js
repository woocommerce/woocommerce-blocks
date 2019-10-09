export * from './default-constants';
export { setSetting } from './set-setting';

/**
 * Internal dependencies
 */
import { getSetting } from './get-setting';
import compareVersions from 'compare-versions';

/**
 * Note: this attempts to coerce the wp_version to a semver for comparison
 * This will result in dropping any beta/rc values.
 *
 * `5.3-beta1-4252` would get converted to `5.3.4252`
 */
export const compareWithWpVersion = ( version, operator ) => {
	return compareVersions.compare(
		version,
		getSetting( 'wp_version', '' ).replace( /-[a-zA-Z0-9]*?-/, '.' ),
		operator
	);
};

export { compareVersions, getSetting };
