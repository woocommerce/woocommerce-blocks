/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CartCheckoutFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

const BlockSettings = ( { attributes, setAttributes } ) => {
	const { hasDarkControls } = attributes;
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Style', 'woo-gutenberg-products-block' ) }>
				<ToggleControl
					label={ __(
						'Dark mode inputs',
						'woo-gutenberg-products-block'
					) }
					help={ __(
						'Inputs styled specifically for use on dark background colors.',
						'woo-gutenberg-products-block'
					) }
					checked={ hasDarkControls }
					onChange={ () =>
						setAttributes( {
							hasDarkControls: ! hasDarkControls,
						} )
					}
				/>
			</PanelBody>
			<CartCheckoutFeedbackPrompt />
		</InspectorControls>
	);
};

const withBlockSettings = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const isCartOrCheckout =
			props.name === 'woocommerce/checkout' ||
			props.name === '@woocommerce/cart';
		return (
			<>
				{ isCartOrCheckout && (
					<InspectorControls>
						<BlockSettings { ...props } />
					</InspectorControls>
				) }

				<BlockEdit { ...props } />
			</>
		);
	},
	'withBlockSettings'
);

if (
	! hasFilter(
		'editor.BlockEdit',
		'woocommerce/add/cart-checkout-block-settings'
	)
) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/cart-checkout-block-settings',
		withBlockSettings,
		10
	);
}
