/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const StoreNotices = () => {
	return (
		<div className="woocommerce-notice">
			{ __( 'This is a demo notice.', 'woo-gutenberg-products-block' ) }
		</div>
	);
};

export default StoreNotices;
