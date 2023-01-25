/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import './editor.scss';

export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'woocommerce wc-block-breadcrumbs',
	} );

	return (
		<div { ...blockProps }>
			<a href="/">
				{ __( 'Breadcrumbs', 'woo-gutenberg-products-block' ) }
			</a>
			{ __( ' / Navigation / Path', 'woo-gutenberg-products-block' ) }
		</div>
	);
};

export default Edit;
