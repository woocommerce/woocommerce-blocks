/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

const Label = () => {
	return (
		<span className="label">
			{ __(
				'Home / Clothing / Accessories / Beanie',
				'woo-gutenberg-products-block'
			) }
		</span>
	);
};

export const BreadcrumbsBlock = (): JSX.Element => {
	return (
		<a href={ getSetting( 'homeUrl' ) }>
			<Label />
		</a>
	);
};

export default BreadcrumbsBlock;
