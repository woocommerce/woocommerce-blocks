/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { select } from '@wordpress/data';
import { EditorBlock } from '@woocommerce/types';
import { ElementType, useEffect } from 'react';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { registerElementVariation } from './utils';

const BLOCK_TITLE: string = __(
	'Add to Cart Button',
	'woo-gutenberg-products-block'
);
const BLOCK_DESCRIPTION: string = __(
	'Display a call to action button which either adds the product to the cart, or links to the product page.',
	'woo-gutenberg-products-block'
);

export const CORE_NAME = 'core/buttons';
export const VARIATION_NAME = 'woocommerce/product-add-to-cart-button';

registerElementVariation( CORE_NAME, {
	blockDescription: BLOCK_DESCRIPTION,
	blockTitle: BLOCK_TITLE,
	variationName: VARIATION_NAME,
} );

const removeLinkToolbarButton = () => {
	const linkElement: HTMLElement | null = document.querySelector(
		'.edit-post-visual-editor button[name="link"]'
	);
	if ( linkElement ) linkElement.style.display = 'none';
};

/**
 * This helps us in modifying the UI in editor for the button block variation
 */
const withCoreButtonVariation = createHigherOrderComponent(
	< T extends EditorBlock< T > >( BlockListBlock: ElementType ) => {
		return ( props ) => {
			const isCoreButton = props.name === 'core/button';

			// Calculate if `core/button` is variation using it's parent block i.e. `core/buttons`
			let isWoocommerceVariation = false;
			if ( isCoreButton ) {
				const coreEditor = select( 'core/block-editor' );
				const parentBlocks = coreEditor.getBlockParents(
					props.clientId,
					true
				);
				const parentButtonsBlock = coreEditor.getBlock(
					parentBlocks[ 0 ]
				);
				isWoocommerceVariation =
					VARIATION_NAME ===
					parentButtonsBlock?.attributes?.__woocommerceNamespace;
			}

			/**
			 * Hide the link button in the button block toolbar because
			 * the link is provided dynamically during render in PHP file
			 *
			 * We are using hacky workaround here until there is a broader proposal for
			 * toolbar customization, as it would be overkill to have one attribute per enabled/disabled feature.
			 */
			useEffect( () => {
				if ( isWoocommerceVariation && props.isSelected ) {
					removeLinkToolbarButton();
				}
			} );

			// When variation is added to editor, initialize attributes with default values
			if (
				isCoreButton &&
				isWoocommerceVariation &&
				! props.attributes?.text?.length
			) {
				props.setAttributes( {
					...props.attributes,
					text: __( 'Add to cart', 'woo-gutenberg-products-block' ),
					style: {
						spacing: {
							padding: {
								top: 'var:preset|spacing|30',
								right: 'var:preset|spacing|40',
								bottom: 'var:preset|spacing|30',
								left: 'var:preset|spacing|40',
							},
						},
					},
					align: 'center',
					fontSize: 'small',
				} );
			}

			return (
				<BlockListBlock
					{ ...props }
					wrapperProps={ {
						/**
						 * Sometimes editor.BlockListBlock filter is not called
						 * when the toolbar menu re-renders therefore we also
						 * need to hide the link toolbar button onClick event.
						 *
						 * More info: https://github.com/woocommerce/woocommerce-blocks/pull/8267#discussion_r1088883081
						 */
						onClick: () => {
							if ( isWoocommerceVariation ) {
								removeLinkToolbarButton();
							}
						},
					} }
				/>
			);
		};
	},
	'withCoreButtonVariation'
);
addFilter( 'editor.BlockListBlock', VARIATION_NAME, withCoreButtonVariation );
