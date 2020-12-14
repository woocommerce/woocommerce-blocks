/**
 * External dependencies
 */
import compareVersions from 'compare-versions';

/**
 * Internal dependencies
 */
import { getSetting } from './get-setting';

export * from './default-constants';
export { setSetting } from './set-setting';
import '../../filters/exclude-draft-status-from-analytics';

/**
 * Note: this attempts to coerce the wpVersion to a semver for comparison
 * This will result in dropping any beta/rc values.
 *
 * `5.3-beta1-4252` would get converted to `5.3.0-rc.4252`
 * `5.3-beta1` would get converted to `5.3.0-rc`.
 * `5.3` would not be touched.
 *
 * For the purpose of these comparisons all pre-release versions are normalized
 * to `rc`.
 *
 * @param {string} version Version to compare.
 * @param {string} setting Setting name (e.g. wpVersion or wcVersion).
 * @param {string} operator Comparison operator.
 */
const compareVersionSettingIgnorePrerelease = (
	version,
	setting,
	operator
) => {
	let replacement = getSetting( setting, '' ).replace(
		/-[a-zA-Z0-9]*[\-]*/,
		'.0-rc.'
	);
	replacement = replacement.endsWith( '.' )
		? replacement.substring( 0, replacement.length - 1 )
		: replacement;
	return compareVersions.compare( version, replacement, operator );
};

/**
 * Compare the provided `version` param with the current WP version using the
 * `operator`.
 *
 * For example `compareWithWpVersion( '5.6', '<=' )` returns true if `5.6` is
 * smaller or equal than the site WP version.
 *
 * @param {string} version Version to use to compare against the current wpVersion.
 * @param {string} operator Operator to use in the comparison.
 */

export const compareWithWpVersion = ( version, operator ) => {
	return compareVersionSettingIgnorePrerelease(
		version,
		'wpVersion',
		operator
	);
};

/**
 * Compare the provided `version` param with the current WC version using the
 * `operator`.
 *
 * For example `compareWithWooVersion( '4.9.0', '<=' )` returns true if `4.9` is
 * smaller or equal than the site WC version.
 *
 * @param {string} version Version to use to compare against the current wcVersion.
 * @param {string} operator Operator to use in the comparison.
 */
export const compareWithWooVersion = ( version, operator ) => {
	return compareVersionSettingIgnorePrerelease(
		version,
		'wcVersion',
		operator
	);
};

export { compareVersions, getSetting };

/**
 * Returns a string with the site's wp-admin URL appended. JS version of `admin_url`.
 *
 * @param {string} path Relative path.
 * @return {string} Full admin URL.
 */
export const getAdminLink = ( path ) => getSetting( 'adminUrl' ) + path;
