/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { CartCheckoutFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	CheckboxControl,
	Notice,
	Disabled,
} from '@wordpress/components';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import {
	PRIVACY_URL,
	TERMS_URL,
	CHECKOUT_PAGE_ID,
} from '@woocommerce/block-settings';
import { getAdminLink } from '@woocommerce/settings';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';
import { useRef } from '@wordpress/element';
import { EditorProvider, useEditorContext } from '@woocommerce/base-context';
import PageSelector from '@woocommerce/editor-components/page-selector';
import {
	previewCart,
	previewSavedPaymentMethods,
} from '@woocommerce/resource-previews';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

const BlockSettings = ( { attributes, setAttributes } ) => {
	const {
		showCompanyField,
		showApartmentField,
		showPhoneField,
		requireCompanyField,
		requirePhoneField,
		showOrderNotes,
		showPolicyLinks,
		showReturnToCart,
		cartPageId,
		hasDarkControls,
	} = attributes;
	const { currentPostId } = useEditorContext();
	const { current: savedCartPageId } = useRef( cartPageId );
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
				title={ __(
					'Address options',
					'woo-gutenberg-products-block'
				) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Include additional address fields in the checkout form.',
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
					checked={ showApartmentField }
					onChange={ () =>
						setAttributes( {
							showApartmentField: ! showApartmentField,
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
				title={ __( 'Order notes', 'woo-gutenberg-products-block' ) }
			>
				<p className="wc-block-checkout__controls-text">
					{ __(
						'Reduce the number of fields to checkout.',
						'woo-gutenberg-products-block'
					) }
				</p>
				<ToggleControl
					label={ __(
						'Allow customers to optionally add order notes',
						'woo-gutenberg-products-block'
					) }
					checked={ showOrderNotes }
					onChange={ () =>
						setAttributes( {
							showOrderNotes: ! showOrderNotes,
						} )
					}
				/>
			</PanelBody>
			<PanelBody
				title={ __(
					'Navigation options',
					'woo-gutenberg-products-block'
				) }
			>
				<ToggleControl
					label={ __(
						'Show links to policies',
						'woo-gutenberg-products-block'
					) }
					help={ __(
						'Shows links to your "terms and conditions" and "privacy policy" pages.',
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
						'Show a "Return to Cart" link',
						'woo-gutenberg-products-block'
					) }
					checked={ showReturnToCart }
					onChange={ () =>
						setAttributes( {
							showReturnToCart: ! showReturnToCart,
						} )
					}
				/>
			</PanelBody>
			{ showReturnToCart &&
				! (
					currentPostId === CHECKOUT_PAGE_ID && savedCartPageId === 0
				) && (
					<PageSelector
						pageId={ cartPageId }
						setPageId={ ( id ) =>
							setAttributes( { cartPageId: id } )
						}
						labels={ {
							title: __(
								'Return to Cart button',
								'woo-gutenberg-products-block'
							),
							default: __(
								'WooCommerce Cart Page',
								'woo-gutenberg-products-block'
							),
						} }
					/>
				) }
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

const CheckoutEditor = ( { attributes, setAttributes } ) => {
	const { className, isPreview } = attributes;
	return (
		<EditorProvider
			previewData={ { previewCart, previewSavedPaymentMethods } }
		>
			<div
				className={ classnames(
					className,
					'wp-block-woocommerce-checkout',
					{
						'is-editor-preview': isPreview,
					}
				) }
			>
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
						<Block attributes={ attributes } />
					</Disabled>
				</BlockErrorBoundary>
			</div>
		</EditorProvider>
	);
};

export default CheckoutEditor;
