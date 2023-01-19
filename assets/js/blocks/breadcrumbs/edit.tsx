/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'woocommerce wc-block-breadcrumbs',
	} );

	return (
		<div { ...blockProps }>
			{ __(
				'Breadcrumbs / Navigation / Path',
				'woo-gutenberg-products-block'
			) }
		</div>
	);
};

export default Edit;
