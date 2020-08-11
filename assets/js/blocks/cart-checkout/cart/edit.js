/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { CartCheckoutFeedbackPrompt } from '@woocommerce/block-components/feedback-prompt';
import { InspectorControls } from '@wordpress/block-editor';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	Notice,
} from '@wordpress/components';
import PropTypes from 'prop-types';
import ViewSwitcher from '@woocommerce/block-components/view-switcher';
import PageSelector from '@woocommerce/block-components/page-selector';
import { SHIPPING_ENABLED, CART_PAGE_ID } from '@woocommerce/block-settings';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import {
	EditorProvider,
	useEditorContext,
	CartProvider,
} from '@woocommerce/base-context';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';
import { useRef } from '@wordpress/element';
import { getAdminLink } from '@woocommerce/settings';
import { previewCart } from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import Block from './block.js';
import EmptyCartEdit from './empty-cart-edit';
import './editor.scss';

const BlockSettings = ( { attributes, setAttributes } ) => {
	const {
		isShippingCalculatorEnabled,
		isShippingCostHidden,
		checkoutPageId,
	} = attributes;
	const { currentPostId } = useEditorContext();
	const { current: savedCheckoutPageId } = useRef( checkoutPageId );
	return (
		<InspectorControls>
			{ currentPostId !== CART_PAGE_ID && (
				<Notice
					className="wc-block-cart__page-notice"
					isDismissible={ false }
					status="warning"
				>
					{ __experimentalCreateInterpolateElement(
						__(
							'If you would like to use this block as your default cart you must update your <a>page settings in WooCommerce</a>.',
							'woo-gutenberg-products-block'
						),
						{
							a: (
								// eslint-disable-next-line jsx-a11y/anchor-has-content
								<a
									href={ getAdminLink(
										'admin.php?page=wc-settings&tab=advanced'
									) }
									target="_blank"
									rel="noopener noreferrer"
								/>
							),
						}
					) }
				</Notice>
			) }
			{ SHIPPING_ENABLED && (
				<PanelBody
					title={ __(
						'Shipping rates',
						'woo-gutenberg-products-block'
					) }
				>
					<ToggleControl
						label={ __(
							'Shipping calculator',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'Allow customers to estimate shipping by entering their address.',
							'woo-gutenberg-products-block'
						) }
						checked={ isShippingCalculatorEnabled }
						onChange={ () =>
							setAttributes( {
								isShippingCalculatorEnabled: ! isShippingCalculatorEnabled,
							} )
						}
					/>
					<ToggleControl
						label={ __(
							'Hide shipping costs until an address is entered',
							'woo-gutenberg-products-block'
						) }
						help={ __(
							'If checked, shipping rates will be hidden until the customer uses the shipping calculator or enters their address during checkout.',
							'woo-gutenberg-products-block'
						) }
						checked={ isShippingCostHidden }
						onChange={ () =>
							setAttributes( {
								isShippingCostHidden: ! isShippingCostHidden,
							} )
						}
					/>
				</PanelBody>
			) }
			{ ! (
				currentPostId === CART_PAGE_ID && savedCheckoutPageId === 0
			) && (
				<PageSelector
					pageId={ checkoutPageId }
					setPageId={ ( id ) =>
						setAttributes( { checkoutPageId: id } )
					}
					labels={ {
						title: __(
							'Proceed to Checkout button',
							'woo-gutenberg-products-block'
						),
						default: __(
							'WooCommerce Checkout Page',
							'woo-gutenberg-products-block'
						),
					} }
				/>
			) }
			<CartCheckoutFeedbackPrompt />
		</InspectorControls>
	);
};

/**
 * Component to handle edit mode of "Cart Block".
 *
 * Note: We need to always render `<InnerBlocks>` in the editor. Otherwise,
 *       if the user saves the page without having triggered the 'Empty Cart'
 *       view, inner blocks would not be saved and they wouldn't be visible
 *       in the frontend.
 */
const CartEditor = ( { className, attributes, setAttributes } ) => {
	return (
		<div
			className={ classnames( className, 'wp-block-woocommerce-cart', {
				'is-editor-preview': attributes.isPreview,
			} ) }
		>
			<ViewSwitcher
				label={ __( 'Edit', 'woo-gutenberg-products-block' ) }
				views={ [
					{
						value: 'full',
						name: __( 'Full Cart', 'woo-gutenberg-products-block' ),
					},
					{
						value: 'empty',
						name: __(
							'Empty Cart',
							'woo-gutenberg-products-block'
						),
					},
				] }
				defaultView={ 'full' }
				render={ ( currentView ) => (
					<BlockErrorBoundary
						header={ __(
							'Cart Block Error',
							'woo-gutenberg-products-block'
						) }
						text={ __(
							'There was an error whilst rendering the cart block. If this problem continues, try re-creating the block.',
							'woo-gutenberg-products-block'
						) }
						showErrorMessage={ true }
						errorMessagePrefix={ __(
							'Error message:',
							'woo-gutenberg-products-block'
						) }
					>
						{ currentView === 'full' && (
							<>
								<EditorProvider previewData={ { previewCart } }>
									<BlockSettings
										attributes={ attributes }
										setAttributes={ setAttributes }
									/>
									<Disabled>
										<CartProvider>
											<Block attributes={ attributes } />
										</CartProvider>
									</Disabled>
								</EditorProvider>
								<EmptyCartEdit hidden={ true } />
							</>
						) }
						{ currentView === 'empty' && <EmptyCartEdit /> }
					</BlockErrorBoundary>
				) }
			/>
		</div>
	);
};

CartEditor.propTypes = {
	className: PropTypes.string,
};

export default CartEditor;
