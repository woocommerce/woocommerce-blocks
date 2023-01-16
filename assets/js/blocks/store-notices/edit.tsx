/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const StoreNotices = () => {
	return (
		<div className="wc-block-woocommerce-notice">
			{ __(
				'This is an example notice. Notices added by WooCommerce or extensions will show up here.',
				'woo-gutenberg-products-block'
			) }
		</div>
	);
};

const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-store-notices',
	} );

	return (
		<div { ...blockProps }>
			<StoreNotices />
		</div>
	);
};

export default Edit;
