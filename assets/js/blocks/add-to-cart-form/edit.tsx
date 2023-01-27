/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Disabled } from '@wordpress/components';
/**
 * Internal dependencies
 */
import './editor.scss';
export interface Attributes {
	className?: string;
}

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'woocommerce wc-block-add-to-cart-form',
	} );

	return (
		<div { ...blockProps }>
			<Disabled>
				<div className="quantity-placeholder">Qty</div>
				<button
					type="submit"
					name="add-to-cart"
					className="single_add_to_cart_button button alt wp-element-button"
				>
					{ __( 'Add to Cart', 'woo-gutenberg-products-block' ) }
				</button>
			</Disabled>
		</div>
	);
};

export default Edit;
