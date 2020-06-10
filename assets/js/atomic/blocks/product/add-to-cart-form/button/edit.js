/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import EditProductLink from '@woocommerce/block-components/edit-product-link';
import { useProductDataContext } from '@woocommerce/shared-context';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

export default ( { attributes, setAttributes } ) => {
	const productDataContext = useProductDataContext();
	const product = productDataContext.product || {};
	const { showQuantity = true } = attributes;

	return (
		<>
			<EditProductLink productId={ product.id } />
			<InspectorControls>
				<PanelBody
					title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
				>
					<ToggleControl
						label={ __(
							'Display quantity selector',
							'woo-gutenberg-products-block'
						) }
						checked={ showQuantity }
						onChange={ () =>
							setAttributes( {
								showQuantity: ! showQuantity,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<Disabled>
				<Block { ...attributes } />
			</Disabled>
		</>
	);
};
