/**
 * External dependencies
 */
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

interface Props {
	attributes: {
		className?: string;
	};
}

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

const Edit = ( { attributes }: Props ): JSX.Element => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-store-notices', className ),
	} );

	return (
		<div { ...blockProps }>
			<StoreNotices />
		</div>
	);
};

export default Edit;
