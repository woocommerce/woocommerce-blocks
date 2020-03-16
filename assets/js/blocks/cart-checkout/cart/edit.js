/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';
import {
	Disabled,
	PanelBody,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';
import PropTypes from 'prop-types';
import { withFeedbackPrompt } from '@woocommerce/block-hocs';
import ViewSwitcher from '@woocommerce/block-components/view-switcher';
import { SHIPPING_ENABLED, CART_PAGE_ID } from '@woocommerce/block-settings';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { EditorProvider, useEditorContext } from '@woocommerce/base-context';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';

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
		</InspectorControls>
	);
};

/**
 * Component to handle edit mode of "Cart Block".
 */
const CartEditor = ( { className, attributes, setAttributes } ) => {
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
				defaultView={ 'full' }
				render={ ( currentView ) => (
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
											<FullCart
												attributes={ attributes }
											/>
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
				) }
			/>
		</div>
	);
};

CartEditor.propTypes = {
	className: PropTypes.string,
};

export default withFeedbackPrompt(
	__(
		'We are currently working on improving our cart and checkout blocks, providing merchants with the tools and customization options they need.',
		'woo-gutenberg-products-block'
	)
)( CartEditor );
