/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	InnerBlocks,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import { SidebarLayout } from '@woocommerce/base-components/sidebar-layout';
import { CheckoutProvider, EditorProvider } from '@woocommerce/base-context';
import {
	previewCart,
	previewSavedPaymentMethods,
} from '@woocommerce/resource-previews';
import { PanelBody, ToggleControl } from '@wordpress/components';
import type { TemplateArray } from '@wordpress/blocks';
/**
 * Internal dependencies
 */
import './inner-blocks';
import './styles/editor.scss';
import {
	addClassToBody,
	BlockSettings,
	useBlockPropsWithLocking,
} from '../cart-checkout-shared';
import { CheckoutBlockContext, CheckoutBlockControlsContext } from './context';
import type { Attributes } from './types';

// This is adds a class to body to signal if the selected block is locked
addClassToBody();

// Array of allowed block names.
const ALLOWED_BLOCKS: string[] = [
	'woocommerce/checkout-fields-block',
	'woocommerce/checkout-totals-block',
];

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => undefined;
} ): JSX.Element => {
	const {
		allowCreateAccount,
		showCompanyField,
		requireCompanyField,
		showApartmentField,
		showPhoneField,
		requirePhoneField,
		showOrderNotes,
		showPolicyLinks,
		showReturnToCart,
		showRateAfterTaxName,
		cartPageId,
	} = attributes;

	const defaultTemplate = [
		[ 'woocommerce/checkout-fields-block', {}, [] ],
		[ 'woocommerce/checkout-totals-block', {}, [] ],
	] as TemplateArray;

	const accountControls = (): JSX.Element => (
		<InspectorControls>
			<PanelBody
				title={ __(
					'Account options',
					'woo-gutenberg-products-block'
				) }
			>
				<ToggleControl
					label={ __(
						'Allow shoppers to sign up for a user account during checkout',
						'woo-gutenberg-products-block'
					) }
					checked={ allowCreateAccount }
					onChange={ () =>
						setAttributes( {
							allowCreateAccount: ! allowCreateAccount,
						} )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);

	const blockProps = useBlockPropsWithLocking();
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>
			<EditorProvider
				previewData={ { previewCart, previewSavedPaymentMethods } }
			>
				<CheckoutProvider>
					<SidebarLayout
						className={ classnames( 'wc-block-checkout', {
							'has-dark-controls': attributes.hasDarkControls,
						} ) }
					>
						<CheckoutBlockControlsContext.Provider
							value={ {
								accountControls,
							} }
						>
							<CheckoutBlockContext.Provider
								value={ {
									allowCreateAccount,
									showCompanyField,
									requireCompanyField,
									showApartmentField,
									showPhoneField,
									requirePhoneField,
									showOrderNotes,
									showPolicyLinks,
									showReturnToCart,
									cartPageId,
									showRateAfterTaxName,
								} }
							>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ defaultTemplate }
									templateLock="insert"
								/>
							</CheckoutBlockContext.Provider>
						</CheckoutBlockControlsContext.Provider>
					</SidebarLayout>
				</CheckoutProvider>
			</EditorProvider>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'wc-block-checkout is-loading',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};
