/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
	Button,
	Disabled,
	Notice,
	__experimentalInputControl as InputControl,
} from '@wordpress/components';
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
				<Notice
					className={ 'wc-block-add-to-cart-form__notice' }
					status={ 'warning' }
					isDismissible={ false }
				>
					<p>
						{ __(
							'The content displayed on this block can vary depending on the product type. The editor preview corresponds to a Simple Product.',
							'woo-gutenberg-products-block'
						) }
					</p>
				</Notice>
				<InputControl
					type={ 'number' }
					value={ '1' }
					className={ 'wc-block-add-to-cart-form__quantity' }
				/>
				<Button
					variant={ 'primary' }
					className={ 'wc-block-add-to-cart-form__button' }
				>
					{ __( 'Add to Cart', 'woo-gutenberg-products-block' ) }
				</Button>
			</Disabled>
		</div>
	);
};

export default Edit;
