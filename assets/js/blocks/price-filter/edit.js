/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { Placeholder, Disabled, PanelBody, ToggleControl, Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';
import { IconMoney, IconExternal } from '../../components/icons';
import { adminUrl } from '@woocommerce/settings';

export default function( { attributes, setAttributes } ) {
	const getInspectorControls = () => {
		const { showInputFields } = attributes;

		return (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Block Settings', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Show input fields', 'woo-gutenberg-products-block' ) }
						help={
							showInputFields ?
								__( 'Input fields are visible.', 'woo-gutenberg-products-block' ) :
								__( 'Input fields are hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ showInputFields }
						onChange={ () => setAttributes( { showInputFields: ! showInputFields } ) }
					/>
				</PanelBody>
			</InspectorControls>
		);
	};

	const noProductsPlaceholder = () => (
		<Placeholder
			className="wc-block-price-slider"
			icon={ <IconMoney /> }
			label={ __( 'Filter Products by Price', 'woo-gutenberg-products-block' ) }
			instructions={ __( 'Display a slider to filter products in your store by price.', 'woo-gutenberg-products-block' ) }
		>
			<p>
				{ __( "Products with prices are needed for filtering your products. You haven't created any yet.", 'woo-gutenberg-products-block' ) }
			</p>
			<Button
				className="wc-block-price-slider__add_product_button"
				isDefault
				isLarge
				href={ adminUrl + 'post-new.php?post_type=product' }
			>
				{ __( 'Add new product', 'woo-gutenberg-products-block' ) } <IconExternal />
			</Button>
			<Button
				className="wc-block-price-slider__read_more_button"
				isTertiary
				href="https://docs.woocommerce.com/document/managing-products/"
			>
				{ __( 'Learn more', 'woo-gutenberg-products-block' ) }
			</Button>
		</Placeholder>
	);

	return (
		<Fragment>
			{ noProductsPlaceholder() }
			{ getInspectorControls() }
			<Disabled>
				<Block attributes={ attributes } isPreview />
			</Disabled>
		</Fragment>
	);
}
