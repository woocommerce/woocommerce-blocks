/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const StoreNotices = () => {
	return (
		<div className="wc-block-woocommerce-notice">
			{ __(
				'This is an example notice. Notices added WooCommerce or extensions will show up here.',
				'woo-gutenberg-products-block'
			) }
		</div>
	);
};

export default StoreNotices;
