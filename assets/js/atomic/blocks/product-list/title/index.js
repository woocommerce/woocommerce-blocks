/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { Fragment } from 'react';
import { Disabled, PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { ProductListTitle } from '../../../components/product-list';
import sharedConfig from '../shared-config';
import HeadingToolbar from './heading-toolbar';
import exampleProduct from '../example-product';

const blockConfig = {
	title: __( 'Product Title', 'woo-gutenberg-products-block' ),
	description: __(
		'Display the name of a product.',
		'woo-gutenberg-products-block'
	),
	icon: {
		src: 'heading',
		foreground: '#96588a',
	},
	attributes: {
		product: {
			type: 'object',
			default: exampleProduct,
		},
		level: {
			type: 'number',
			default: 2,
		},
		productLink: {
			type: 'boolean',
			default: true,
		},
	},
	edit( props ) {
		const { attributes, setAttributes } = props;
		const { level, productLink } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Content',
							'woo-gutenberg-products-block'
						) }
					>
						<p>{ __( 'Level', 'woo-gutenberg-products-block' ) }</p>
						<HeadingToolbar
							isCollapsed={ false }
							minLevel={ 1 }
							maxLevel={ 7 }
							selectedLevel={ level }
							onChange={ ( newLevel ) =>
								setAttributes( { level: newLevel } )
							}
						/>
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
					<ProductListTitle
						headingLevel={ level }
						productLink={ productLink }
						product={ attributes.product }
					/>
				</Disabled>
			</Fragment>
		);
	},
};

registerBlockType( 'woocommerce/product-list-title', {
	...sharedConfig,
	...blockConfig,
} );
