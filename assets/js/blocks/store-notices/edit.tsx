/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Notice } from '@wordpress/components';

const StoreNotices = () => {
	return (
		<Notice status="warning" isDismissible={ false }>
			{ __(
				'Notices added by WooCommerce or extensions will show up here.',
				'woo-gutenberg-products-block'
			) }
		</Notice>
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
