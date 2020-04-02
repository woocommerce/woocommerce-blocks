/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import FeedbackPrompt from '@woocommerce/block-components/feedback-prompt';
import { InspectorControls } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	SelectControl,
	Notice,
} from '@wordpress/components';
import PropTypes from 'prop-types';
import ViewSwitcher from '@woocommerce/block-components/view-switcher';
import { SHIPPING_ENABLED, CART_PAGE_ID } from '@woocommerce/block-settings';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import {
	EditorProvider,
	useEditorContext,
	CartProvider,
} from '@woocommerce/base-context';
import { useSelect } from '@wordpress/data';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';
import { getAdminLink } from '@woocommerce/settings';
import { recordEditorEvent } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';
import './editor.scss';

const BlockSettings = ( { attributes, setAttributes } ) => {
	const {
		isShippingCalculatorEnabled,
		isShippingCostHidden,
		checkoutPageId,
	} = attributes;
	const pages =
		useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'page', {
				status: 'publish',
				orderby: 'title',
				order: 'asc',
				per_page: 100,
			} );
		}, [] ) || null;
	const { currentPostId } = useEditorContext();

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
			<PanelBody
				title={ __( 'Shipping rates', 'woo-gutenberg-products-block' ) }
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
					onChange={ () => {
						recordEditorEvent(
							'cart_settings_shipping_calculator_toggle',
							{
								enabled: ! isShippingCalculatorEnabled,
							}
						);
						setAttributes( {
							isShippingCalculatorEnabled: ! isShippingCalculatorEnabled,
						} );
					} }
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
			{ ( currentPostId !== CART_PAGE_ID || checkoutPageId ) && pages && (
				<PanelBody
					title={ __(
						'Proceed to Checkout button',
						'woo-gutenberg-products-block'
					) }
				>
					<SelectControl
						label={ __(
							'Link to',
							'woo-gutenberg-products-block'
						) }
						value={ checkoutPageId }
						options={ [
							...[
								{
									label: __(
										'WooCommerce Checkout Page',
										'woo-gutenberg-products-block'
									),
									value: 0,
								},
							],
							...Object.values( pages ).map( ( page ) => {
								return {
									label: page.title.raw,
									value: parseInt( page.id, 10 ),
								};
							} ),
						] }
						onChange={ ( value ) =>
							setAttributes( {
								checkoutPageId: parseInt( value, 10 ),
							} )
						}
					/>
				</PanelBody>
			) }
			<FeedbackPrompt
				text={ __(
					'We are currently working on improving our cart and checkout blocks, providing merchants with the tools and customization options they need.',
					'woo-gutenberg-products-block'
				) }
			/>
		</InspectorControls>
	);
};

/**
 * Component to handle edit mode of "Cart Block".
 */
const CartEditor = ( { className, attributes, setAttributes } ) => {
	const defaultView = 'full';
	const [ previousView, setPreviousView ] = useState( defaultView );

	const viewRenderCallback = ( currentView ) => {
		if ( previousView !== currentView ) {
			recordEditorEvent( 'cart_view_toggle', {
				current_view: currentView,
			} );
			setPreviousView( currentView );
		}
		return (
			<>
				{ currentView === 'full' && (
					<>
						{ SHIPPING_ENABLED && (
							<BlockSettings
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						) }
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
							<Disabled>
								<EditorProvider>
									<CartProvider>
										<FullCart attributes={ attributes } />
									</CartProvider>
								</EditorProvider>
							</Disabled>
						</BlockErrorBoundary>
					</>
				) }
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
					<EmptyCart hidden={ currentView === 'full' } />
				</BlockErrorBoundary>
			</>
		);
	};

	return (
		<div className={ className }>
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
				defaultView={ defaultView }
				render={ viewRenderCallback }
			/>
		</div>
	);
};

CartEditor.propTypes = {
	className: PropTypes.string,
};

export default CartEditor;
