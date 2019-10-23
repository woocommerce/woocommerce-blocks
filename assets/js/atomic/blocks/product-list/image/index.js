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
import ToggleButtonControl from '@woocommerce/block-components/toggle-button-control';
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
		showSaleBadge: {
			type: 'boolean',
			default: true,
		},
		saleBadgeAlign: {
			type: 'string',
			default: 'right',
		},
	},
	edit( props ) {
		const { attributes, setAttributes } = props;
		const { productLink, showSaleBadge, saleBadgeAlign } = attributes;

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
							help={ __(
								'Links the image to the single product listing.',
								'woo-gutenberg-products-block'
							) }
							checked={ productLink }
							onChange={ () =>
								setAttributes( {
									productLink: ! productLink,
								} )
							}
						/>
						<ToggleControl
							label={ __(
								'Show On-Sale Badge',
								'woo-gutenberg-products-block'
							) }
							help={ __(
								'Overlay a "sale" badge if the product is on-sale.',
								'woo-gutenberg-products-block'
							) }
							checked={ showSaleBadge }
							onChange={ () =>
								setAttributes( {
									showSaleBadge: ! showSaleBadge,
								} )
							}
						/>
						{ showSaleBadge && (
							<ToggleButtonControl
								label={ __(
									'Sale Badge Alignment',
									'woo-gutenberg-products-block'
								) }
								value={ saleBadgeAlign }
								options={ [
									{
										label: __(
											'Left',
											'woo-gutenberg-products-block'
										),
										value: 'left',
									},
									{
										label: __(
											'Center',
											'woo-gutenberg-products-block'
										),
										value: 'center',
									},
									{
										label: __(
											'Right',
											'woo-gutenberg-products-block'
										),
										value: 'right',
									},
								] }
								onChange={ ( value ) =>
									setAttributes( { saleBadgeAlign: value } )
								}
							/>
						) }
					</PanelBody>
				</InspectorControls>
				<Disabled>
					<ProductListImage
						product={ attributes.product }
						productLink={ productLink }
						showSaleBadge={ showSaleBadge }
						saleBadgeAlign={ saleBadgeAlign }
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
