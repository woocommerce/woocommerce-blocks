/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import ProductControl from '@woocommerce/block-components/product-control';
import { Placeholder, Button, Toolbar } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';
import TextToolbarButton from '@woocommerce/block-components/text-toolbar-button';
import { useProductDataContext } from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import './editor.scss';

/**
 * Allows a product to be selected for display within a product element block.
 */
const ProductSelector = ( {
	productId = 0,
	setProductId,
	setIsEditing,
	icon,
	label,
	description,
} ) => {
	return (
		<>
			<Placeholder
				icon={ icon }
				label={ label }
				className="wc-atomic-blocks-product"
			>
				{ description }
				<div className="wc-atomic-blocks-product__selection">
					<ProductControl
						selected={ productId || 0 }
						showVariations
						onChange={ ( value = [] ) => {
							setProductId( value[ 0 ] ? value[ 0 ].id : 0 );
						} }
					/>
					<Button
						isDefault
						disabled={ ! productId }
						onClick={ () => {
							setIsEditing( false );
						} }
					>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		</>
	);
};

/**
 * This HOC shows a product selection interface if context is not present in the editor.
 *
 * @param {Function} OriginalComponent Component being wrapped.
 * @param {Object} selectorArgs Options for the selector.
 *
 */
const withProductSelector = ( OriginalComponent, selectorArgs ) => {
	return ( props ) => {
		const productDataContext = useProductDataContext();
		const { attributes, setAttributes } = props;
		const { productId } = attributes;
		const [ isEditing, setIsEditing ] = useState( ! productId );

		if ( productDataContext.hasContext ) {
			return <OriginalComponent { ...props } />;
		}

		return (
			<>
				{ isEditing ? (
					<ProductSelector
						{ ...selectorArgs }
						productId={ productId }
						setProductId={ ( id ) =>
							setAttributes( { productId: id } )
						}
						setIsEditing={ setIsEditing }
					/>
				) : (
					<>
						<BlockControls>
							<Toolbar>
								<TextToolbarButton
									onClick={ () => setIsEditing( true ) }
								>
									{ __(
										'Switch product…',
										'woo-gutenberg-products-block'
									) }
								</TextToolbarButton>
							</Toolbar>
						</BlockControls>
						<OriginalComponent { ...props } />
					</>
				) }
			</>
		);
	};
};

export default withProductSelector;
