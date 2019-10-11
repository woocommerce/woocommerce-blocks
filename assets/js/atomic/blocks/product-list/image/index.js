/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import Gridicon from 'gridicons';
import { Fragment } from '@wordpress/element';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { ProductListImage } from '../../../components/product-list';
import sharedConfig from '../shared-config';
import exampleProduct from '../example-product';

const blockConfig = {
	title: __( 'Product Image', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the main product image',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: <Gridicon icon="image" />,
		foreground: '#96588a',
	},
	attributes: {
		product: {
			type: 'object',
			default: exampleProduct,
		},
		productLink: {
			type: 'boolean',
			default: true,
		},
	},
	edit( props ) {
		const { attributes, setAttributes } = props;
		const { productLink } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Content',
							'woo-gutenberg-products-block'
						) }
					>
						<ToggleControl
							label={ __(
								'Link to Product Page',
								'woo-gutenberg-products-block'
							) }
							checked={ productLink }
							onChange={ () =>
								setAttributes( {
									productLink: ! productLink,
								} )
							}
						/>
					</PanelBody>
				</InspectorControls>
				<Disabled>
					<ProductListImage
						product={ attributes.product }
						productLink={ productLink }
					/>
				</Disabled>
			</Fragment>
		);
	},
};

registerBlockType( 'woocommerce/product-list-image', {
	...sharedConfig,
	...blockConfig,
} );
