/**
 * External dependencies
 */
import compareVersions from 'compare-versions';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import { getSetting } from './get-setting';

export * from './default-constants';
export { setSetting } from './set-setting';

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

export const compareWithWpVersion = ( version, operator ) => {
	return compareVersionSettingIgnorePrerelease(
		version,
		'wpVersion',
		operator
	);
};

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

addFilter(
	'woocommerce_admin_analytics_settings',
	'woocommerce-admin',
	( settings ) => {
		const removeCheckoutDraft = ( optionsGroup ) => {
			if ( optionsGroup.key === 'customStatuses' ) {
				return {
					...optionsGroup,
					options: optionsGroup.options.filter(
						( option ) => option.value !== 'checkout-draft'
					),
				};
			}
			return optionsGroup;
		};

		const actionableStatusesOptions = settings.woocommerce_actionable_order_statuses.options.map(
			removeCheckoutDraft
		);
		const excludedStatusesOptions = settings.woocommerce_excluded_report_order_statuses.options.map(
			removeCheckoutDraft
		);

		return {
			...settings,
			woocommerce_actionable_order_statuses: {
				...settings.woocommerce_actionable_order_statuses,
				options: actionableStatusesOptions,
			},
			woocommerce_excluded_report_order_statuses: {
				...settings.woocommerce_excluded_report_order_statuses,
				options: excludedStatusesOptions,
			},
		};
	}
);
