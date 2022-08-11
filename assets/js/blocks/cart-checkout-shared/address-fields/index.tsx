/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	CheckboxControl,
} from '@wordpress/components';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import { isString } from '@woocommerce/types';

interface Attributes extends Record< string, boolean | number > {
	allowCreateAccount: boolean;
	hasDarkControls: boolean;
	showCompanyField: boolean;
	showApartmentField: boolean;
	showPhoneField: boolean;
	requireCompanyField: boolean;
	requirePhoneField: boolean;
	// Deprecated.
	showOrderNotes: boolean;
	showPolicyLinks: boolean;
	showReturnToCart: boolean;
	showRateAfterTaxName: boolean;
	cartPageId: number;
}

const withAddressFields = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
		const blockName = useSelect( ( select ) => {
			return select( 'core/block-editor' ).getBlockName( clientId );
		} );
		const blocksWithAddressFields = [
			'woocommerce/checkout-shipping-address',
			'woocommerce/checkout-billing-address',
			'woocommerce/checkout-fields-block',
		];

		if (
			isString( blockName ) &&
			! blocksWithAddressFields.includes( blockName )
		) {
			return <BlockEdit { ...props } />;
		}

		const { attributes, setAttributes } = props;
		const {
			showCompanyField,
			requireCompanyField,
			showApartmentField,
			showPhoneField,
			requirePhoneField,
		} = attributes;

		const toggleAttribute = ( key: keyof Attributes ): void => {
			const newAttributes = {} as Partial< Attributes >;
			newAttributes[ key ] = ! ( attributes[ key ] as boolean );
			setAttributes( newAttributes );
		};

		const AddressFields = (): JSX.Element => (
			<InspectorControls>
				<PanelBody
					title={ __(
						'Address Fields',
						'woo-gutenberg-products-block'
					) }
				>
					<p className="wc-block-checkout__controls-text">
						{ __(
							'Show or hide fields in the checkout address forms.',
							'woo-gutenberg-products-block'
						) }
					</p>
					<ToggleControl
						label={ __(
							'Company',
							'woo-gutenberg-products-block'
						) }
						checked={ showCompanyField }
						onChange={ () => toggleAttribute( 'showCompanyField' ) }
					/>
					{ showCompanyField && (
						<CheckboxControl
							label={ __(
								'Require company name?',
								'woo-gutenberg-products-block'
							) }
							checked={ requireCompanyField }
							onChange={ () =>
								toggleAttribute( 'requireCompanyField' )
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
							toggleAttribute( 'showApartmentField' )
						}
					/>
					<ToggleControl
						label={ __( 'Phone', 'woo-gutenberg-products-block' ) }
						checked={ showPhoneField }
						onChange={ () => toggleAttribute( 'showPhoneField' ) }
					/>
					{ showPhoneField && (
						<CheckboxControl
							label={ __(
								'Require phone number?',
								'woo-gutenberg-products-block'
							) }
							checked={ requirePhoneField }
							onChange={ () =>
								toggleAttribute( 'requirePhoneField' )
							}
							className="components-base-control--nested"
						/>
					) }
				</PanelBody>
			</InspectorControls>
		);

		return (
			<>
				<InspectorControls>
					<AddressFields />
				</InspectorControls>

				<BlockEdit { ...props } />
			</>
		);
	},
	'withAddressFields'
);

if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/add/address-fields' ) ) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/address-fields',
		withAddressFields,
		9
	);
}
