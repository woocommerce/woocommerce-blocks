/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import FeedbackPrompt from '@woocommerce/block-components/feedback-prompt';
import {
	previewCart,
	previewShippingRates,
} from '@woocommerce/resource-previews';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	CheckboxControl,
	SelectControl,
	Notice,
	Disabled,
} from '@wordpress/components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import {
	PRIVACY_URL,
	TERMS_URL,
	SHIPPING_METHODS_EXIST,
	CHECKOUT_PAGE_ID,
} from '@woocommerce/block-settings';
import { useSelect } from '@wordpress/data';
import { getAdminLink } from '@woocommerce/settings';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';
import { EditorProvider, useEditorContext } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

const BlockSettings = ( { attributes, setAttributes } ) => {
	const {
		showCompanyField,
		showAddress2Field,
		showPhoneField,
		requireCompanyField,
		requirePhoneField,
		showPolicyLinks,
		showReturnToCart,
		cartPageId,
	} = attributes;
	const { currentPostId } = useEditorContext();
	const pages =
		useSelect( ( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'page', {
				status: 'publish',
				orderby: 'title',
				order: 'asc',
				per_page: 100,
			} );
		}, [] ) || null;

	return (
		<InspectorControls>
			{ currentPostId !== CHECKOUT_PAGE_ID && (
				<Notice
					className="wc-block-checkout__page-notice"
					isDismissible={ false }
					status="warning"
				>
					{ __experimentalCreateInterpolateElement(
						__(
							'If you would like to use this block as your default checkout you must update your <a>page settings in WooCommerce</a>.',
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
				title={ __( 'Form options', 'woo-gutenberg-products-block' ) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Choose whether your checkout form requires extra information from customers.',
						'woo-gutenberg-products-block'
					) }
				</p>
				<ToggleControl
					label={ __( 'Company', 'woo-gutenberg-products-block' ) }
					checked={ showCompanyField }
					onChange={ () =>
						setAttributes( {
							showCompanyField: ! showCompanyField,
						} )
					}
				/>
				{ showCompanyField && (
					<CheckboxControl
						label={ __(
							'Require company name?',
							'woo-gutenberg-products-block'
						) }
						checked={ requireCompanyField }
						onChange={ () =>
							setAttributes( {
								requireCompanyField: ! requireCompanyField,
							} )
						}
						className="components-base-control--nested"
					/>
				) }
				<ToggleControl
					label={ __(
						'Apartment, suite, etc.',
						'woo-gutenberg-products-block'
					) }
					checked={ showAddress2Field }
					onChange={ () =>
						setAttributes( {
							showAddress2Field: ! showAddress2Field,
						} )
					}
				/>
				<ToggleControl
					label={ __( 'Phone', 'woo-gutenberg-products-block' ) }
					checked={ showPhoneField }
					onChange={ () =>
						setAttributes( {
							showPhoneField: ! showPhoneField,
						} )
					}
				/>
				{ showPhoneField && (
					<CheckboxControl
						label={ __(
							'Require phone number?',
							'woo-gutenberg-products-block'
						) }
						checked={ requirePhoneField }
						onChange={ () =>
							setAttributes( {
								requirePhoneField: ! requirePhoneField,
							} )
						}
						className="components-base-control--nested"
					/>
				) }
			</PanelBody>
			<PanelBody
				title={ __( 'Content', 'woo-gutenberg-products-block' ) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Choose additional content to display.',
						'woo-gutenberg-products-block'
					) }
				</p>
				<ToggleControl
					label={ __(
						'Show links to policies',
						'woo-gutenberg-products-block'
					) }
					help={ __(
						'Shows a list of links to your "terms and conditions" and "privacy policy" pages.',
						'woo-gutenberg-products-block'
					) }
					checked={ showPolicyLinks }
					onChange={ () =>
						setAttributes( {
							showPolicyLinks: ! showPolicyLinks,
						} )
					}
				/>
				{ showPolicyLinks && ( ! PRIVACY_URL || ! TERMS_URL ) && (
					<Notice
						className="wc-block-base-control-notice"
						isDismissible={ false }
					>
						{ __experimentalCreateInterpolateElement(
							__(
								'Pages must be first setup in store settings: <a1>Privacy policy</a1>, <a2>Terms and conditions</a2>.',
								'woo-gutenberg-products-block'
							),
							{
								a1: (
									// eslint-disable-next-line jsx-a11y/anchor-has-content
									<a
										href={ getAdminLink(
											'admin.php?page=wc-settings&tab=account'
										) }
										target="_blank"
										rel="noopener noreferrer"
									/>
								),
								a2: (
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
				<ToggleControl
					label={ __(
						'Show a "return to cart" link',
						'woo-gutenberg-products-block'
					) }
					checked={ showReturnToCart }
					onChange={ () =>
						setAttributes( {
							showReturnToCart: ! showReturnToCart,
						} )
					}
				/>
				{ showReturnToCart &&
					( currentPostId !== CHECKOUT_PAGE_ID || !! cartPageId ) &&
					pages && (
						<SelectControl
							label={ __(
								'Link to',
								'woo-gutenberg-products-block'
							) }
							value={ cartPageId }
							options={ [
								...[
									{
										label: __(
											'WooCommerce Cart Page',
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
									cartPageId: parseInt( value, 10 ),
								} )
							}
						/>
					) }
			</PanelBody>
			<FeedbackPrompt
				text={ __(
					'We are currently working on improving our cart and checkout blocks, providing merchants with the tools and customization options they need.',
					'woo-gutenberg-products-block'
				) }
			/>
		</InspectorControls>
	);
};

const CheckoutEditor = ( { attributes, setAttributes } ) => {
	const { className } = attributes;
	return (
		<EditorProvider>
			<div className={ className }>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
				<BlockErrorBoundary
					header={ __(
						'Checkout Block Error',
						'woo-gutenberg-products-block'
					) }
					text={ __(
						'There was an error whilst rendering the checkout block. If this problem continues, try re-creating the block.',
						'woo-gutenberg-products-block'
					) }
					showErrorMessage={ true }
					errorMessagePrefix={ __(
						'Error message:',
						'woo-gutenberg-products-block'
					) }
				>
					<Disabled>
						<Block
							attributes={ attributes }
							cartItems={ previewCart.items }
							cartTotals={ previewCart.totals }
							isEditor={ true }
							shippingRates={
								SHIPPING_METHODS_EXIST
									? previewShippingRates
									: []
							}
						/>
					</Disabled>
				</BlockErrorBoundary>
			</div>
		</EditorProvider>
	);
};

export default CheckoutEditor;
